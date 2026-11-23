import { useStore } from "../../../context/StoreContext";
import "./Header.css";

const Header = ({ currentView, onNavigate }) => {
  const { storeConfig } = useStore();

  const itens = [
    { id: 1, href: "#inicio", item: "Início" },
    { id: 2, href: "#produtos", item: "Produtos" },
    { id: 3, href: "#sobre", item: "Sobre nós" },
  ];

  return (
    <>
      {storeConfig.avisoTopo && (
        <div
          style={{
            background: "#e11d48",
            color: "#fff",
            textAlign: "center",
            padding: "6px 12px",
            fontSize: "0.85rem",
            fontWeight: 600,
          }}
        >
          {storeConfig.avisoTopo}{" "}
          {!storeConfig.lojaAberta && " • (Loja temporariamente fechada)"}
        </div>
      )}

      <header>
        <div
          className="logo"
          style={{ cursor: "pointer" }}
          onClick={() => onNavigate("store")}
        >
          <img
            src={storeConfig.logo}
            alt={`Logo ${storeConfig.nomeEstabelecimento}`}
          />
        </div>

        <nav>
          {currentView === "store" &&
            itens.map((item) => (
              <a key={item.id} href={item.href}>
                {item.item}
              </a>
            ))}

          <button
            type="button"
            onClick={() =>
              onNavigate(currentView === "admin" ? "store" : "admin")
            }
            style={{
              marginLeft: "12px",
              padding: "8px 14px",
              borderRadius: "8px",
              border: "none",
              background: "#e11d48",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {currentView === "admin" ? "Ver Loja" : "Painel Admin"}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;