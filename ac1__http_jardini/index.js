const http = require("http");
const fs = require("fs");
const path = require("path");

const DEFAULT_PORT = 1234;
const DEFAULT_TIMEOUT = 20000;

const getArchiveUsedType = (filePath) => {
  const extname = path.extname(filePath);
  switch (extname) {
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "application/javascript";
    case ".png":
      return "image/png";
    case ".json":
      return "application/json";
    case ".txt":
      return "text/plain";
    case ".jpeg":
    case ".jpg":
      return "image/jpeg";
    default:
      return "application/octet-stream";
  }
};

const getResponseLogInfo = ({
  statusCode,
  mimeType,
  contentLength = 0,
  method = "GET",
  url = "",
  ip,
}) => {
  let statusText;

  switch (statusCode) {
    case 200:
      statusText = "OK";
      break;
    case 404:
      statusText = "Not Found";
      break;
    case 502:
      statusText = "Bad Gateway";
      break;
    default:
      statusText = "Unknown Status";
      break;
  }

  return (
    `HTTP/1.1 ${statusCode} ${statusText}\r\n` +
    `Content-Type: ${mimeType}\r\n` +
    `Content-Length: ${contentLength}\r\n` +
    `Method: ${method}\r\n` +
    `Url: ${url}\r\n` +
    `Ip: ${ip}\r\n` +
    `Timpestamp: ${Date.now().toString()}\r\n` +
    "\r\n"
  );
};

const handleRequest = (req, res, baseDirectory) => {
  const method = req.method;
  const url = req.url;

  console.log(`Received request: ${method} ${url}`);

  if (method !== "GET" && method !== "HEAD") {
    res.writeHead(502, { "Content-Type": "text/plain" });
    res.end("Invalid method");
    return;
  }

  const filePath = path.join(baseDirectory, url);
  const logsFilePath = path.join(baseDirectory, "log_basico.txt");
  const mimeType = getArchiveUsedType(filePath);

  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((dataIp) => {
      const ip = dataIp.ip;
      if (!ip) {
        throw new Error("ip not found");
      }

      fs.readFile(filePath, (err, content) => {
        let logInfo;
        if (err) {
          if (err.code === "ENOENT") {
            res.writeHead(404, { "Content-Type": "text/plain" });
            logInfo = getResponseLogInfo({
              statusCode: 404,
              mimeType,
              method,
              url,
              ip,
            });
            res.end("File not found");
          } else {
            res.writeHead(500, { "Content-Type": "text/plain" });
            logInfo = getResponseLogInfo({
              statusCode: 500,
              mimeType,
              method,
              url,
              ip,
            });
            res.end("Server error");
          }
        } else {
          logInfo = getResponseLogInfo({
            contentLength: content.length,
            statusCode: 200,
            mimeType,
            method,
            url,
            ip,
          });
          res.writeHead(200, { "Content-Type": mimeType });
          res.end(method === "HEAD" ? null : content);
        }

        fs.appendFile(logsFilePath, String(logInfo), (err) => {
          if (err) {
            console.error("Failed to save response:", err);
          }
        });
      });
    })
    .catch((err) => {
      res.writeHead(500, { "Content-Type": "text/plain" });
      const logInfo = getResponseLogInfo({
        statusCode: 500,
        method,
        url,
      });

      fs.appendFile(logsFilePath, String(logInfo), (err) => {
        if (err) {
          console.error("Failed to save response:", err);
        }
      });
    });
};

const startServer = (
  baseDirectory,
  port = DEFAULT_PORT,
  timeout = DEFAULT_TIMEOUT
) => {
  const server = http.createServer((req, res) => {
    console.log("ip");
    handleRequest(req, res, baseDirectory);
  });

  server.setTimeout(timeout);

  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
};

// Recebe o diretório base dos arquivos como argumento
const baseDirectory = process.argv[2] || "./api";
startServer(baseDirectory);
