import { createContext, useContext, useEffect, useState, useMemo } from "react";
import defaultLogo from "../assets/logo.png";
import { defaultCategories, initialProducts } from "../data/products";


const StoreContext = createContext(null);

const PRODUCTS_KEY = "motorzone_products_v1";
const CONFIG_KEY = "motorzone_config_v1";
const CATEGORIES_KEY = "motorzone_categories";

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

const buildDefaultCategories = (products) =>
  [...new Set(products.map((p) => p.categoria).filter(Boolean))].map(
    (nome, i) => ({ id: `cat_${i + 1}`, nome, ordem: i })
  );

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_KEY);
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

const [categories, setCategories] = useState(() => {
  try {
    const saved = localStorage.getItem(CATEGORIES_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return buildDefaultCategories(products);
});

useEffect(() => {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
}, [categories]);

const sortedCategories = useMemo(
  () => [...categories].sort((a, b) => a.ordem - b.ordem),
  [categories]
);

const normalize = (s) => s.trim().toLowerCase();

const validateName = (nome, ignoreId = null) => {
  const clean = nome.trim();
  if (!clean) return "Digite um nome para a categoria.";
  const exists = categories.some(
    (c) => c.id !== ignoreId && normalize(c.nome) === normalize(clean)
  );
  if (exists) return "Já existe uma categoria com esse nome.";
  return null;
};

const addCategory = (nome) => {
  const error = validateName(nome);
  if (error) return { ok: false, error };
  const ordem = categories.length
    ? Math.max(...categories.map((c) => c.ordem)) + 1
    : 0;
  setCategories((prev) => [
    ...prev,
    { id: `cat_${Date.now()}`, nome: nome.trim(), ordem },
  ]);
  return { ok: true };
};

const updateCategory = (id, nome) => {
  const error = validateName(nome, id);
  if (error) return { ok: false, error };
  const old = categories.find((c) => c.id === id);
  const novo = nome.trim();
  setCategories((prev) =>
    prev.map((c) => (c.id === id ? { ...c, nome: novo } : c))
  );
  
  if (old && old.nome !== novo) {
    setProducts((prev) =>
      prev.map((p) => (p.categoria === old.nome ? { ...p, categoria: novo } : p))
    );
  }
  return { ok: true };
};

const removeCategory = (id) => {
  const cat = categories.find((c) => c.id === id);
  if (!cat) return { ok: false, error: "Categoria não encontrada." };
  const emUso = products.filter((p) => p.categoria === cat.nome).length;
  if (emUso > 0) {
    return {
      ok: false,
      error: `Há ${emUso} produto(s) nesta categoria. Mova ou exclua esses produtos antes.`,
    };
  }
  setCategories((prev) => prev.filter((c) => c.id !== id));
  return { ok: true };
};

const moveCategory = (id, direction) => {
  const list = [...sortedCategories];
  const i = list.findIndex((c) => c.id === id);
  const j = i + direction;
  if (i < 0 || j < 0 || j >= list.length) return;
  [list[i], list[j]] = [list[j], list[i]];
  setCategories(list.map((c, idx) => ({ ...c, ordem: idx })));
};

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

    categories: 
    sortedCategories,
    addCategory,
    updateCategory,
    removeCategory,
    moveCategory,
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