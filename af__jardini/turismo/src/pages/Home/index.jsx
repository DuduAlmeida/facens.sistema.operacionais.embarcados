import { Card } from "antd";
import { useHome } from "./hooks";
import { getPackageHTMLDescription } from "./utils";

const Home = () => {
  const { packages, confirmPackage } = useHome();

  return (
    <section style={{ padding: "5vw" }}>
      <h1>Pacotes de Turismo</h1>

      <div>
        {packages.isLoading ? (
          <>CARREGANDO DADOS</>
        ) : packages?.list?.length > 0 ? (
          packages?.list?.map((item, index) => (
            <Card
              key={`card_${index}`}
              title={item.title}
              style={{ marginBottom: "25px", cursor: "pointer" }}
              onClick={() => confirmPackage(item)}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: getPackageHTMLDescription(item),
                }}
              />
            </Card>
          ))
        ) : (
          <>NENHUM PACOTE ENCONTRADO</>
        )}
      </div>
    </section>
  );
};

export default Home;
