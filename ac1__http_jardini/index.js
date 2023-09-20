const http = require("http");
const fs = require("fs");
const path = require("path");

const DEFAULT_PORT = 8080;
const DEFAULT_TIMEOUT = 20000;

const getMimeType = (filePath) => {
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
    case ".jpeg":
    case ".jpg":
      return "image/jpeg";
    default:
      return "application/octet-stream";
  }
};

const getResponseHeader = (statusCode, mimeType, contentLength) => {
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
  const mimeType = getMimeType(filePath);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("File not found");
      } else {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Server error");
      }
    } else {
      const responseHeader = getResponseHeader(200, mimeType, content.length);
      res.writeHead(200, { "Content-Type": mimeType });
      res.end(method === "HEAD" ? null : content);
    }
  });
};

const startServer = (
  baseDirectory,
  port = DEFAULT_PORT,
  timeout = DEFAULT_TIMEOUT
) => {
  const server = http.createServer((req, res) => {
    handleRequest(req, res, baseDirectory);
  });

  server.setTimeout(timeout);

  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
};

startServer("/path/to/baseDirectory");
