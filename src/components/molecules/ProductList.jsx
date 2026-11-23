import { useState } from "react";
import { useStore } from "../../context/StoreContext";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const { products, categories } = useStore();
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const filtered =
    selectedCategory === "Todas"
      ? products
      : products.filter((item) => item.categoria === selectedCategory);

  return (
    <section id="produtos" style={{ padding: "2rem 1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          flexWrap: "wrap",
          marginBottom: "1.5rem",
        }}
      >
        {["Todas", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "999px",
              border: "1px solid #3f3f46",
              background: selectedCategory === cat ? "#e11d48" : "#18181b",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filtered.map((item) => (
          <ProductCard
            key={item.id}
            imagem={item.imagem}
            nome={item.nome}
            descricao={item.descricao}
            preco={item.preco}
            categoria={item.categoria}
            disponivel={item.disponivel}
          />
        ))}
      </div>
    </section>
  );
}