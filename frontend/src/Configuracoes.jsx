import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? import.meta.env.VITE_API_URL ?? "http://localhost:8000";

function Configuracoes() {
  const [categorias, setCategorias] = useState([]);
  const [editando, setEditando] = useState(null); // categoria em edição
  const [erro, setErro] = useState("");

  const carregar = () =>
    fetch(`${API_URL}/categorias`)
      .then((r) => r.json())
      .then(setCategorias)
      .catch((e) => console.error("Erro ao buscar categorias:", e));

  useEffect(() => {
    carregar();
  }, []);

  async function salvar() {
    const { id_categoria, nome, descricao } = editando;
    const r = await fetch(`${API_URL}/categorias/${id_categoria}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, descricao }),
    });
    if (!r.ok) return setErro("Erro ao salvar a categoria.");
    setErro("");
    setEditando(null);
    carregar();
  }

  async function excluir(id) {
    if (!confirm("Excluir esta categoria?")) return;
    const r = await fetch(`${API_URL}/categorias/${id}`, { method: "DELETE" });
    if (r.status === 409) return setErro("Categoria com gastos não pode ser excluída.");
    if (!r.ok) return setErro("Erro ao excluir a categoria.");
    setErro("");
    carregar();
  }

  async function exportarCsv() {
    const r = await fetch(`${API_URL}/gastos`);
    if (!r.ok) return setErro("Erro ao exportar os gastos.");
    const gastos = await r.json();
    const nomes = Object.fromEntries(categorias.map((c) => [c.id_categoria, c.nome]));
    const aspas = (t) => `"${String(t ?? "").replaceAll('"', '""')}"`;
    const linhas = gastos.map((g) =>
      [g.id, aspas(g.descricao), g.valor, g.data, aspas(nomes[g.categoria_id])].join(";"),
    );
    const csv = ["id;descricao;valor;data;categoria", ...linhas].join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv" }));
    link.download = "gastos.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  async function limparDados() {
    if (!confirm("Apagar TODAS as categorias e gastos? Isso não pode ser desfeito.")) return;
    const r = await fetch(`${API_URL}/dados`, { method: "DELETE" });
    if (!r.ok) return setErro("Erro ao limpar os dados.");
    setErro("");
    carregar();
  }

  const btn = "border rounded-xl px-3 py-1 font-bold cursor-pointer";

  return (
    <div className="border-2 border-yellow-700 mt-4 rounded-2xl bg-yellow-300 p-4">
      <h2 className="mb-2 font-bold text-gray-700">Preferências</h2>
      <div className="flex flex-wrap items-center gap-4 mb-4 text-gray-700">
        <button onClick={exportarCsv} className={`${btn} bg-white`}>
          Exportar gastos (CSV)
        </button>
        <button onClick={limparDados} className={`${btn} bg-red-600 text-white`}>
          Limpar todos os dados
        </button>
      </div>

      <h2 className="mb-2 font-bold text-gray-700">Gerenciar categorias</h2>
      {erro && <p className="mb-2 font-semibold text-red-700">{erro}</p>}
      {categorias.map((c) => (
        <div key={c.id_categoria} className="flex items-center gap-2 mb-2">
          {editando?.id_categoria === c.id_categoria ? (
            <>
              <input
                value={editando.nome}
                onChange={(e) => setEditando({ ...editando, nome: e.target.value })}
                className="border rounded-xl px-2 bg-white"
              />
              <input
                value={editando.descricao ?? ""}
                onChange={(e) => setEditando({ ...editando, descricao: e.target.value })}
                className="flex-1 border rounded-xl px-2 bg-white"
              />
              <button onClick={salvar} className={`${btn} bg-orange-600 text-white`}>Salvar</button>
              <button onClick={() => setEditando(null)} className={`${btn} bg-white`}>Cancelar</button>
            </>
          ) : (
            <>
              <span className="font-semibold text-gray-700">{c.nome}</span>
              <span className="flex-1 text-gray-600">{c.descricao}</span>
              <button onClick={() => setEditando(c)} className={`${btn} bg-white`}>Editar</button>
              <button onClick={() => excluir(c.id_categoria)} className={`${btn} bg-red-600 text-white`}>Excluir</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
export default Configuracoes;
