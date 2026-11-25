import { useState } from "react";
import { useStore } from "../../../context/StoreContext";
import "./CategoryManager.css"; 

const CategoryManager = () => {
  const { categories, products, addCategory, updateCategory, removeCategory, moveCategory } =
    useStore();

  const [nome, setNome] = useState("");
  const [editId, setEditId] = useState(null);
  const [editNome, setEditNome] = useState("");
  const [feedback, setFeedback] = useState(null); // { type: 'ok' | 'error', text }

  const show = (type, text) => {
    setFeedback({ type, text });
    setTimeout(() => setFeedback(null), 3500);
  };

  const countFor = (cat) => products.filter((p) => p.categoria === cat.nome).length;

  const handleAdd = (e) => {
    e.preventDefault();
    const r = addCategory(nome);
    if (!r.ok) return show("error", r.error);
    setNome("");
    show("ok", "Categoria criada.");
  };

  const startEdit = (cat) => {
    setEditId(cat.id);
    setEditNome(cat.nome);
  };

  const saveEdit = (id) => {
    const r = updateCategory(id, editNome);
    if (!r.ok) return show("error", r.error);
    setEditId(null);
    show("ok", "Categoria atualizada.");
  };

  const handleDelete = (cat) => {
    if (!window.confirm(`Excluir a categoria "${cat.nome}"?`)) return;
    const r = removeCategory(cat.id);
    show(r.ok ? "ok" : "error", r.ok ? "Categoria excluída." : r.error);
  };

  return (
    <section className="cats">
      <h2>Categorias</h2>

      {feedback && (
        <div className={`cats-feedback ${feedback.type}`} role="status">
          {feedback.text}
        </div>
      )}

      <form className="cats-form" onSubmit={handleAdd}>
        <label htmlFor="new-cat">Nova categoria</label>
        <div>
          <input
            id="new-cat"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex.: Capacetes"
          />
          <button type="submit" className="btn-primary">
            Criar categoria
          </button>
        </div>
      </form>

      {categories.length === 0 ? (
        <p className="cats-empty">
          Nenhuma categoria cadastrada. Crie a primeira acima para organizar seus produtos.
        </p>
      ) : (
        <ul className="cats-list">
          {categories.map((cat, i) => (
            <li key={cat.id}>
              <div className="cats-order">
                <button
                  onClick={() => moveCategory(cat.id, -1)}
                  disabled={i === 0}
                  aria-label={`Subir ${cat.nome}`}
                >
                  ▲
                </button>
                <button
                  onClick={() => moveCategory(cat.id, 1)}
                  disabled={i === categories.length - 1}
                  aria-label={`Descer ${cat.nome}`}
                >
                  ▼
                </button>
              </div>

              {editId === cat.id ? (
                <input
                  className="cats-edit"
                  value={editNome}
                  autoFocus
                  onChange={(e) => setEditNome(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit(cat.id);
                    if (e.key === "Escape") setEditId(null);
                  }}
                />
              ) : (
                <div className="cats-info">
                  <strong>{cat.nome}</strong>
                  <small>{countFor(cat)} produto(s)</small>
                </div>
              )}

              <div className="cats-actions">
                {editId === cat.id ? (
                  <>
                    <button onClick={() => saveEdit(cat.id)}>Salvar</button>
                    <button onClick={() => setEditId(null)}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(cat)}>Editar</button>
                    <button className="danger" onClick={() => handleDelete(cat)}>
                      Excluir
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default CategoryManager;