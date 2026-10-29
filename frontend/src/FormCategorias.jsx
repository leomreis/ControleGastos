import { useEffect, useState } from "react";

// Porta do backend (uvicorn), não a do Vite (5173)
const API = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

function FormCategorias({ aoCadastrar }) {
  // Um estado por campo do formulário (os mesmos campos do GastoIn no backend)
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const style_inputs = "cursor-pointer border rounded-xl px-1 py-1 bg-white";

  // Lista de categorias vinda do banco, para preencher o <select>

  // Roda uma vez quando a tela abre: GET /categorias
  useEffect(() => {
    fetch(`${API}/categorias`)
      .then((r) => r.json())
  }, []);

  async function salvarCategoria(e) {
    e.preventDefault(); // impede o navegador de recarregar a página

    const resposta = await fetch(`${API}/categorias`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Os nomes aqui precisam ser iguais aos do GastoIn
      body: JSON.stringify({
        nome,
        descricao,
      }),
    });

    if (!resposta.ok) {
      // 422 = algum campo inválido; o detalhe aparece em Network > Response
      console.error("Erro ao cadastrar:", await resposta.json());
      return;
    }

    setNome("");
    setDescricao("");
    if (aoCadastrar) aoCadastrar(); // só chama se o pai passou a função
  }


  return (
      <div>
        <form onSubmit={salvarCategoria} className="flex flex-col gap-3">
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome da Categoria"
            required
            className="w-full resize-none px-3 py-2 border rounded-xl font-black bg-white text-center"
          />
          
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição"
            type="text"
            rows={2}
            required
            className={style_inputs}
          />
          <button
            type="submit"
            className="border bg-orange-600 border-orange-600 text-white font-bold py-2 px-4 rounded hover:bg-orange-100 hover:text-orange-600 transition-colors cursor-pointer"
          >
            Cadastrar Categoria
          </button>
        </form>
        </div>
  );
}

export default FormCategorias;
