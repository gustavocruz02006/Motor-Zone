import { createContext, useContext, useEffect, useState } from "react";
import defaultLogo from "../assets/logo.png";
import { defaultCategories, initialProducts } from "../data/products";


const StoreContext = createContext(null);

const PRODUCTS_KEY = "motorzone_products_v1";
const CONFIG_KEY = "motorzone_config_v1";

const defaultConfig = {
  nomeEstabelecimento: "Motor Zone",
  whatsapp: "85987654321",
  logo: defaultLogo,
  descricao: "Acessórios, capacetes e equipamentos para motociclistas.",
  endereco: "Av. Principal, 1000 - Centro",
  horarioFuncionamento: "Seg a Sex: 08h às 18h | Sáb: 08h às 13h",
  instagram: "@motorzone",
  email: "contato@motorzone.com.br",
  lojaAberta: true,
  mensagemWhatsapp: "Olá! Tenho interesse no produto:",
  avisoTopo: "Frete grátis em compras acima de R$ 299,99!",
};

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_KEY);
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [storeConfig, setStoreConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(CONFIG_KEY);
      return saved ? { ...defaultConfig, ...JSON.parse(saved) } : defaultConfig;
    } catch {
      return defaultConfig;
    }
  });

  useEffect(() => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(storeConfig));
    document.title = storeConfig.nomeEstabelecimento || "Motor Zone";
  }, [storeConfig]);

  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now(),
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id, updatedData) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleProductAvailability = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, disponivel: !item.disponivel } : item
      )
    );
  };

  const updateStoreConfig = (newConfig) => {
    setStoreConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const resetStoreConfig = () => {
    setStoreConfig(defaultConfig);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories: defaultCategories,
        storeConfig,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductAvailability,
        updateStoreConfig,
        resetStoreConfig,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore deve ser usado dentro de um StoreProvider");
  }
  return context;
}