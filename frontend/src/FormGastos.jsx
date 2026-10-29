import { useEffect, useState } from "react";

// Porta do backend (uvicorn), não a do Vite (5173)
const API = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

function FormGastos({ aoCadastrar }) {
  // Um estado por campo do formulário (os mesmos campos do GastoIn no backend)
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const style_inputs = "cursor-pointer border rounded-xl px-1 py-1 bg-white text-center";

  // Lista de categorias vinda do banco, para preencher o <select>
  const [categorias, setCategorias] = useState([]);

  // Roda uma vez quando a tela abre: GET /categorias
  useEffect(() => {
    fetch(`${API}/categorias`)
      .then((r) => r.json())
      .then(setCategorias);
  }, []);

  async function salvarGasto(e) {
    e.preventDefault(); // impede o navegador de recarregar a página

    const resposta = await fetch(`${API}/gastos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Os nomes aqui precisam ser iguais aos do GastoIn
      body: JSON.stringify({
        descricao,
        valor: Number(valor), // input devolve texto, o backend quer número
        data, // "2026-10-27" o backend aceita
        categoria_id: Number(categoriaId),
      }),
    });

    if (!resposta.ok) {
      // 422 = algum campo inválido; o detalhe aparece em Network > Response
      console.error("Erro ao cadastrar:", await resposta.json());
      return;
    }

    setDescricao("");
    setValor("");
    setData("");
    setCategoriaId("");
    if (aoCadastrar) aoCadastrar(); // só chama se o pai passou a função
  }


  return (
      <div>
        <form onSubmit={salvarGasto} className="flex flex-col gap-3">
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição"
            required
            rows={4}
            className="w-full resize-none px-3 py-2 border rounded-xl font-black bg-white"
          />
          <div className="flex justify-center gap-4">
          <input
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="Valor"
            type="number"
            step="0.01"
            min="0.01"
            required
            className={style_inputs}
          />
          <input
            value={data}
            onChange={(e) => setData(e.target.value)}
            type="date"
            required
            className={style_inputs}
          />
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            required
            className={style_inputs}
          >
            <option value="">Escolha a categoria</option>
            {categorias.map((c) => (
              <option key={c.id_categoria} value={c.id_categoria}>
                {c.nome}
              </option>
            ))}
          </select>
          </div>
          <button
            type="submit"
            className="border bg-orange-600 border-orange-600 text-white font-bold py-2 px-4 rounded hover:bg-orange-100 hover:text-orange-800 transition-colors cursor-pointer"
          >
            Cadastrar Gasto
          </button>
        </form>
        </div>
  );
}

export default FormGastos;
