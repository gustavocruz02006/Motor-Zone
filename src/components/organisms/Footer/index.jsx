import { useStore } from "../../../context/StoreContext";

const Footer = () => {
  const { storeConfig } = useStore();

  return (
    <footer
      id="sobre"
      style={{
        background: "#111",
        color: "#d4d4d8",
        padding: "2.5rem 1.5rem",
        marginTop: "3rem",
        borderTop: "1px solid #27272a",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.5rem",
        }}
      >
        <div>
          <h3 style={{ color: "#fff", marginBottom: "0.5rem" }}>
            {storeConfig.nomeEstabelecimento}
          </h3>
          <p style={{ fontSize: "0.9rem" }}>{storeConfig.descricao}</p>
        </div>

        <div>
          <h4 style={{ color: "#fff", marginBottom: "0.5rem" }}>Atendimento</h4>
          <p style={{ fontSize: "0.9rem" }}>{storeConfig.endereco}</p>
          <p style={{ fontSize: "0.9rem" }}>{storeConfig.horarioFuncionamento}</p>
        </div>

        <div>
          <h4 style={{ color: "#fff", marginBottom: "0.5rem" }}>Contato</h4>
          <p style={{ fontSize: "0.9rem" }}>WhatsApp: {storeConfig.whatsapp}</p>
          <p style={{ fontSize: "0.9rem" }}>Instagram: {storeConfig.instagram}</p>
          <p style={{ fontSize: "0.9rem" }}>E-mail: {storeConfig.email}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;