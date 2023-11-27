import { Card } from "antd";

const MineBoughts = () => {
  const packageList = [
    { id: 1, title: "Card 1", description: "Description for card 1" },
    { id: 2, title: "Card 2", description: "Description for card 2" },
    { id: 3, title: "Card 3", description: "Description for card 3" },
  ];

  console.log("HOME LOADED");

  return (
    <section style={{ padding: "5vw" }}>
      <h1>Pacotes de Turismo</h1>

      <div>
        {packageList.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            style={{ marginBottom: "25px" }}
          >
            <p>{item.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default MineBoughts;
