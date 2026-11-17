import React from "react";
import { products } from "../../data/products";
import ProductCard from "./ProductCard";

export default function ProductList() {
  return (
    <section className="products-grid">
      {products.map((item) => (
        <ProductCard
          key={item.id}
          imagem={item.imagem}
          nome={item.nome}
          preco={item.preco}
          categoria={item.categoria}
        />
      ))}
    </section>
  );
}