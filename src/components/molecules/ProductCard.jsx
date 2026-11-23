import { useStore } from "../../context/StoreContext";
import "./ProductCard.css";

const ProductCard = ({ imagem, nome, descricao, preco, categoria, disponivel }) => {
  const { storeConfig } = useStore();

  const handleOrderClick = () => {
    const phone = storeConfig.whatsapp || "";
    const text = `${storeConfig.mensagemWhatsapp} ${nome} (R$ ${preco})`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const canBuy = disponivel && storeConfig.lojaAberta;

  return (
    <div className="product-card" style={{ opacity: disponivel ? 1 : 0.65 }}>
      <img src={imagem} alt={nome} className="product-image" />
      <span className="product-category">{categoria}</span>
      <h3 className="product-title">{nome}</h3>
      {descricao && (
        <p style={{ fontSize: "0.85rem", color: "#aaa", margin: "4px 0 8px" }}>
          {descricao}
        </p>
      )}
      <p className="product-price">R$ {preco}</p>
      <button
        className="product-btn"
        disabled={!canBuy}
        onClick={handleOrderClick}
        style={!canBuy ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
      >
        {!disponivel
          ? "Indisponível"
          : !storeConfig.lojaAberta
          ? "Loja Fechada"
          : "Pedir no WhatsApp"}
      </button>
    </div>
  );
};

export default ProductCard;