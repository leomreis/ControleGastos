import { useState, useEffect } from "react";
import FormCategorias from "./FormCategorias";
import FormGastos from "./FormGastos";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

function Cadastros() {
  // A lista fica aqui para os dois formulários compartilharem: cadastrar uma
  // categoria atualiza o <select> do formulário de gastos sem recarregar a página
  const [categorias, setCategorias] = useState([]);

  const carregarCategorias = () =>
    fetch(`${API}/categorias`)
      .then((r) => r.json())
      .then(setCategorias)
      .catch((e) => console.error("Erro ao buscar categorias:", e));

  useEffect(() => {
    carregarCategorias();
  }, []);

  return (
    <div className="justify-center items-center p-10 border border-amber-500 rounded-2xl bg-amber-200 mt-2">
      <div className="flex justify-center text-orange-800 text-2xl text-center font-extrabold border border-orange-600 rounded-2xl p-4 bg-orange-100">
        Cadastros
      </div>

      <div className="flex flex-col gap-6 mt-4 text-black">
        <FormGastos categorias={categorias} />
        <hr className="border-orange-300" />
        <FormCategorias aoCadastrar={carregarCategorias} />
      </div>
    </div>
  );
}

export default Cadastros;
