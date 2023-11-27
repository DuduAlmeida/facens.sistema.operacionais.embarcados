import { Card } from "antd";
import { useHome } from "./hooks";

const Home = () => {
  const { packages } = useHome();

  return (
    <section style={{ padding: "5vw" }}>
      <h1>Pacotes de Turismo</h1>

      <div>
        {packages.isLoading ? (
          <>CARREGANDO DADOS</>
        ) : packages?.list?.length > 0 ? (
          packages?.list?.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              style={{ marginBottom: "25px" }}
            >
              <p>{item.description}</p>
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
