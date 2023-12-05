import { Card } from "antd";
import { useMine } from "./hooks";
import { getPackageHTMLDescription } from "../Home/utils";

const MineBoughts = () => {
  const { packages, cancelPackage } = useMine();

  return (
    <section style={{ padding: "5vw" }}>
      <h1>Meus Pacotes de Turismo reservados</h1>

      <div>
        {packages.isLoading ? (
          <>CARREGANDO DADOS</>
        ) : packages?.list?.length > 0 ? (
          packages?.list?.map((item, index) => (
            <Card
              key={`card_${index}`}
              title={item.title}
              style={{ marginBottom: "25px", cursor: "pointer" }}
              onClick={() => cancelPackage(item)}
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

export default MineBoughts;
