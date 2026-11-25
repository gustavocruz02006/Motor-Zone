
import { useStore } from "../../../context/StoreContext"; // ajuste o nome do hook se for outro
import "./Dashboard.css";

const toNumber = (v) => {
  if (typeof v === "number") return v;
  const s = String(v ?? "").trim();
  if (!s) return 0;
  const n = s.includes(",")
    ? parseFloat(s.replace(/\./g, "").replace(",", "."))
    : parseFloat(s);
  return Number.isNaN(n) ? 0 : n;
};

const brl = (n) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function Dashboard({ onGoTo }) {
  const { products, categories, storeConfig } = useStore();

  const disponiveis = products.filter((p) => p.disponivel !== false).length;
  const indisponiveis = products.length - disponiveis;

  const porCategoria = categories.map((c) => ({
    nome: c.nome,
    total: products.filter((p) => p.categoria === c.nome).length,
  }));
  const maior = Math.max(1, ...porCategoria.map((c) => c.total));
  const vazias = porCategoria.filter((c) => c.total === 0).length;
  const semCategoria = products.filter(
    (p) => !categories.some((c) => c.nome === p.categoria)
  ).length;

  const precos = products.map((p) => toNumber(p.preco)).filter((n) => n > 0);
  const media = precos.length
    ? precos.reduce((a, b) => a + b, 0) / precos.length
    : 0;
  const maisCaro = products.reduce(
    (top, p) => (toNumber(p.preco) > toNumber(top?.preco) ? p : top),
    null
  );
  const ultimos = [...products].sort((a, b) => b.id - a.id).slice(0, 3);
  const lojaAberta = storeConfig?.lojaAberta !== false;

  return (
    <section className="dash">
      <header className="dash-head">
        <h2>Resumo da loja</h2>
        <span className={`dash-status ${lojaAberta ? "on" : "off"}`}>
          {lojaAberta ? "Loja aberta" : "Loja fechada"}
        </span>
      </header>

      <div className="dash-kpis">
        <article className="dash-kpi">
          <strong>{products.length}</strong>
          <span>Produtos cadastrados</span>
        </article>
        <article className="dash-kpi">
          <strong>{categories.length}</strong>
          <span>Categorias</span>
        </article>
        <article className="dash-kpi">
          <strong>{disponiveis}</strong>
          <span>Disponíveis</span>
        </article>
        <article className="dash-kpi">
          <strong>{indisponiveis}</strong>
          <span>Indisponíveis</span>
        </article>
      </div>

      <div className="dash-grid">
        <article className="dash-box">
          <h3>Produtos por categoria</h3>
          {porCategoria.length === 0 ? (
            <p className="dash-empty">
              Nenhuma categoria ainda.{" "}
              {onGoTo && (
                <button onClick={() => onGoTo("categorias")}>
                  Criar categoria
                </button>
              )}
            </p>
          ) : (
            <ul className="dash-bars">
              {porCategoria.map((c) => (
                <li key={c.nome}>
                  <span className="dash-bar-label">{c.nome}</span>
                  <span className="dash-bar-track">
                    <i style={{ width: `${(c.total / maior) * 100}%` }} />
                  </span>
                  <b>{c.total}</b>
                </li>
              ))}
            </ul>
          )}
        </article>

        <article className="dash-box">
          <h3>Preços</h3>
          <dl className="dash-list">
            <div>
              <dt>Preço médio</dt>
              <dd>{brl(media)}</dd>
            </div>
            <div>
              <dt>Produto mais caro</dt>
              <dd>
                {maisCaro
                  ? `${maisCaro.nome} (${brl(toNumber(maisCaro.preco))})`
                  : "—"}
              </dd>
            </div>
          </dl>
        </article>

        <article className="dash-box">
          <h3>Últimos adicionados</h3>
          {ultimos.length === 0 ? (
            <p className="dash-empty">Nenhum produto cadastrado.</p>
          ) : (
            <ul className="dash-recent">
              {ultimos.map((p) => (
                <li key={p.id}>
                  <span>{p.nome}</span>
                  <small>{p.categoria}</small>
                </li>
              ))}
            </ul>
          )}
        </article>

        <article className="dash-box">
          <h3>Pontos de atenção</h3>
          <ul className="dash-alerts">
            {indisponiveis > 0 && (
              <li>{indisponiveis} produto(s) marcado(s) como indisponível.</li>
            )}
            {vazias > 0 && <li>{vazias} categoria(s) sem nenhum produto.</li>}
            {semCategoria > 0 && (
              <li>{semCategoria} produto(s) sem categoria válida.</li>
            )}
            {indisponiveis === 0 && vazias === 0 && semCategoria === 0 && (
              <li className="ok">Tudo em ordem por aqui.</li>
            )}
          </ul>
        </article>
      </div>
    </section>
  );
}