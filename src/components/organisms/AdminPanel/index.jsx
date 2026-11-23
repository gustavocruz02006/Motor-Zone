import { useState } from "react";
import { useStore } from "../../../context/StoreContext";
import "./AdminPanel.css";

const emptyForm = {
  nome: "",
  descricao: "",
  preco: "",
  categoria: "Capacetes",
  imagem: "",
  disponivel: true,
};

export default function AdminPanel({ onBackToStore }) {
  const {
    products,
    categories,
    storeConfig,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductAvailability,
    updateStoreConfig,
    resetStoreConfig,
  } = useStore();

  const [activeTab, setActiveTab] = useState("produtos");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [filterCategory, setFilterCategory] = useState("Todas");

  const [configForm, setConfigForm] = useState(storeConfig);
  const [feedback, setFeedback] = useState("");

  const showFeedback = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(""), 3000);
  };

  const handleImageUpload = (file, onLoadCallback) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => onLoadCallback(reader.result);
    reader.readAsDataURL(file);
  };

  // --- AÇÕES DE PRODUTO ---
  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.preco.trim()) return;

    const payload = {
      ...form,
      imagem:
        form.imagem.trim() ||
        "https://via.placeholder.com/300x300?text=Sem+Imagem",
    };

    if (editingId) {
      updateProduct(editingId, payload);
      showFeedback("Produto atualizado com sucesso!");
    } else {
      addProduct(payload);
      showFeedback("Produto criado com sucesso!");
    }

    setForm(emptyForm);
    setEditingId(null);
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setForm({
      nome: product.nome || "",
      descricao: product.descricao || "",
      preco: product.preco || "",
      categoria: product.categoria || categories[0],
      imagem: product.imagem || "",
      disponivel: product.disponivel ?? true,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteClick = (id, nome) => {
    if (window.confirm(`Deseja realmente excluir o produto "${nome}"?`)) {
      deleteProduct(id);
      if (editingId === id) {
        setEditingId(null);
        setForm(emptyForm);
      }
      showFeedback("Produto excluído.");
    }
  };

  // --- AÇÕES DE CONFIGURAÇÃO ---
  const handleConfigSubmit = (e) => {
    e.preventDefault();
    updateStoreConfig(configForm);
    showFeedback("Configurações salvas com sucesso!");
  };

  const filteredProducts =
    filterCategory === "Todas"
      ? products
      : products.filter((p) => p.categoria === filterCategory);

  return (
    <main className="admin-container">
      <div className="admin-header">
        <div>
          <h1>Painel Administrativo</h1>
          <p>Gerencie o catálogo de produtos e as informações da loja.</p>
        </div>
        <button className="btn-secondary" onClick={onBackToStore}>
          ← Voltar para a Loja
        </button>
      </div>

      <div className="admin-tabs">
        <button
          className={activeTab === "produtos" ? "tab active" : "tab"}
          onClick={() => setActiveTab("produtos")}
        >
          Gerenciar Produtos ({products.length})
        </button>
        <button
          className={activeTab === "configuracoes" ? "tab active" : "tab"}
          onClick={() => {
            setConfigForm(storeConfig);
            setActiveTab("configuracoes");
          }}
        >
          Configurações da Loja
        </button>
      </div>

      {feedback && <div className="admin-feedback">{feedback}</div>}

      {activeTab === "produtos" && (
        <div className="admin-grid">
          {/* FORMULÁRIO DE PRODUTO */}
          <section className="admin-card">
            <h2>{editingId ? "Editar Produto" : "Novo Produto"}</h2>
            <form onSubmit={handleProductSubmit} className="admin-form">
              <label>
                Nome do Produto *
                <input
                  type="text"
                  required
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  placeholder="Ex: Capacete Esportivo"
                />
              </label>

              <div className="form-row">
                <label>
                  Preço (R$) *
                  <input
                    type="text"
                    required
                    value={form.preco}
                    onChange={(e) =>
                      setForm({ ...form, preco: e.target.value })
                    }
                    placeholder="Ex: 299,90"
                  />
                </label>

                <label>
                  Categoria *
                  <select
                    value={form.categoria}
                    onChange={(e) =>
                      setForm({ ...form, categoria: e.target.value })
                    }
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label>
                Descrição
                <textarea
                  rows="3"
                  value={form.descricao}
                  onChange={(e) =>
                    setForm({ ...form, descricao: e.target.value })
                  }
                  placeholder="Detalhes do produto..."
                />
              </label>

              <label>
                URL da Imagem
                <input
                  type="text"
                  value={form.imagem}
                  onChange={(e) => setForm({ ...form, imagem: e.target.value })}
                  placeholder="https://..."
                />
              </label>

              <label>
                Ou enviar imagem do computador
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(e.target.files?.[0], (base64) =>
                      setForm((prev) => ({ ...prev, imagem: base64 }))
                    )
                  }
                />
              </label>

              {form.imagem && (
                <img
                  src={form.imagem}
                  alt="Pré-visualização"
                  className="image-preview"
                />
              )}

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={form.disponivel}
                  onChange={(e) =>
                    setForm({ ...form, disponivel: e.target.checked })
                  }
                />
                Produto disponível para venda
              </label>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingId ? "Salvar Alterações" : "Cadastrar Produto"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => {
                      setEditingId(null);
                      setForm(emptyForm);
                    }}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* LISTA DE PRODUTOS */}
          <section className="admin-card">
            <div className="list-header">
              <h2>Produtos Cadastrados</h2>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="Todas">Todas as categorias</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {filteredProducts.length === 0 ? (
              <p className="empty-state">Nenhum produto encontrado.</p>
            ) : (
              <div className="admin-product-list">
                {filteredProducts.map((item) => (
                  <div key={item.id} className="admin-product-item">
                    <img src={item.imagem} alt={item.nome} />
                    <div className="item-info">
                      <div className="item-top">
                        <strong>{item.nome}</strong>
                        <span
                          className={
                            item.disponivel
                              ? "badge available"
                              : "badge unavailable"
                          }
                        >
                          {item.disponivel ? "Disponível" : "Indisponível"}
                        </span>
                      </div>
                      <span className="item-meta">
                        {item.categoria} • R$ {item.preco}
                      </span>
                      {item.descricao && (
                        <p className="item-desc">{item.descricao}</p>
                      )}
                      <div className="item-actions">
                        <button onClick={() => handleEditClick(item)}>
                          Editar
                        </button>
                        <button
                          onClick={() => toggleProductAvailability(item.id)}
                        >
                          {item.disponivel ? "Pausar" : "Ativar"}
                        </button>
                        <button
                          className="btn-danger"
                          onClick={() => handleDeleteClick(item.id, item.nome)}
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      {activeTab === "configuracoes" && (
        <section className="admin-card config-card">
          <h2>Configurações do Estabelecimento</h2>
          <form onSubmit={handleConfigSubmit} className="admin-form">
            <div className="form-row">
              <label>
                Nome do Estabelecimento
                <input
                  type="text"
                  value={configForm.nomeEstabelecimento}
                  onChange={(e) =>
                    setConfigForm({
                      ...configForm,
                      nomeEstabelecimento: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                WhatsApp (apenas números com DDI + DDD)
                <input
                  type="text"
                  value={configForm.whatsapp}
                  onChange={(e) =>
                    setConfigForm({
                      ...configForm,
                      whatsapp: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  placeholder="5527999999999"
                />
              </label>
            </div>

            <label>
              Logo da Loja (URL ou upload)
              <input
                type="text"
                value={configForm.logo}
                onChange={(e) =>
                  setConfigForm({ ...configForm, logo: e.target.value })
                }
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageUpload(e.target.files?.[0], (base64) =>
                    setConfigForm((prev) => ({ ...prev, logo: base64 }))
                  )
                }
              />
            </label>

            {configForm.logo && (
              <img
                src={configForm.logo}
                alt="Logo atual"
                className="logo-preview"
              />
            )}

            <label>
              Descrição / Sobre o Estabelecimento
              <textarea
                rows="3"
                value={configForm.descricao}
                onChange={(e) =>
                  setConfigForm({ ...configForm, descricao: e.target.value })
                }
              />
            </label>

            <div className="form-row">
              <label>
                Endereço
                <input
                  type="text"
                  value={configForm.endereco}
                  onChange={(e) =>
                    setConfigForm({ ...configForm, endereco: e.target.value })
                  }
                />
              </label>

              <label>
                Horário de Funcionamento
                <input
                  type="text"
                  value={configForm.horarioFuncionamento}
                  onChange={(e) =>
                    setConfigForm({
                      ...configForm,
                      horarioFuncionamento: e.target.value,
                    })
                  }
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Instagram
                <input
                  type="text"
                  value={configForm.instagram}
                  onChange={(e) =>
                    setConfigForm({ ...configForm, instagram: e.target.value })
                  }
                />
              </label>

              <label>
                E-mail de Contato
                <input
                  type="email"
                  value={configForm.email}
                  onChange={(e) =>
                    setConfigForm({ ...configForm, email: e.target.value })
                  }
                />
              </label>
            </div>

            <label>
              Aviso no Topo da Loja (opcional)
              <input
                type="text"
                value={configForm.avisoTopo}
                onChange={(e) =>
                  setConfigForm({ ...configForm, avisoTopo: e.target.value })
                }
              />
            </label>

            <label>
              Mensagem padrão ao clicar em comprar no WhatsApp
              <input
                type="text"
                value={configForm.mensagemWhatsapp}
                onChange={(e) =>
                  setConfigForm({
                    ...configForm,
                    mensagemWhatsapp: e.target.value,
                  })
                }
              />
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={configForm.lojaAberta}
                onChange={(e) =>
                  setConfigForm({ ...configForm, lojaAberta: e.target.checked })
                }
              />
              Loja aberta para pedidos
            </label>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Salvar Configurações
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  resetStoreConfig();
                  showFeedback("Configurações restauradas para o padrão.");
                }}
              >
                Restaurar Padrão
              </button>
            </div>
          </form>
        </section>
      )}
    </main>
  );
}