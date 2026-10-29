import { useState, useEffect } from "react";
import { moeda } from "./moeda.js";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

function Dashboard() {
  const [gastos, setGastos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/gastos`)
      .then((r) => r.json())
      .then(setGastos)
      .catch((e) => console.error("Erro ao buscar gastos:", e));
      
    fetch(`${API_URL}/categorias`)
      .then((r) => r.json())
      .then(setCategorias)
      .catch((e) => console.error("Erro ao buscar categorias:", e));
  }, []);

  const total = gastos.reduce((soma, g) => soma + Number(g.valor), 0);

  const porCategoria = categorias
    .map((c) => ({
      nome: c.nome,
      total: gastos
        .filter((g) => g.categoria_id === c.id_categoria)
        .reduce((soma, g) => soma + Number(g.valor), 0),
    }))
    .sort((a, b) => b.total - a.total);

  const maior = porCategoria[0]?.total || 0;

  return (
    <div className="border-2 border-yellow-700 mt-4 rounded-2xl bg-yellow-300 p-4">
      <div className="grid grid-cols-3 gap-4 text-center text-gray-700">
        <div className="rounded-2xl bg-orange-300 p-3">
          <p className="font-semibold">Total gasto</p>
          <p className="text-xl font-bold">{moeda(total)}</p>
        </div>
        <div className="rounded-2xl bg-orange-300 p-3">
          <p className="font-semibold">Nº de gastos</p>
          <p className="text-xl font-bold">{gastos.length}</p>
        </div>
        <div className="rounded-2xl bg-orange-300 p-3">
          <p className="font-semibold">Maior categoria</p>
          <p className="text-xl font-bold">
            {maior > 0 ? porCategoria[0].nome : "-"}
          </p>
        </div>
      </div>

      <h2 className="mt-4 mb-2 font-bold text-gray-700">
        Gastos por categoria
      </h2>
      {porCategoria.map((c) => (
        <div key={c.nome} className="mb-2">
          <div className="flex justify-between text-gray-700">
            <span>{c.nome}</span>
            <span>{moeda(c.total)}</span>
          </div>
          <div className="h-3 rounded-full bg-white/60">
            <div
              className="h-3 rounded-full bg-orange-600"
              style={{ width: `${maior ? (c.total / maior) * 100 : 0}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
export default Dashboard;
