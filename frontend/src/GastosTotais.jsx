import { useState, useEffect } from "react";
import { moeda } from "./moeda.js";

const API_URL = import.meta.env.VITE_API_URL ?? import.meta.env.VITE_API_URL ?? "http://localhost:8000";

/* .then faz o fetch dos gastos e atualiza o estado e fetch significa buscar dados */

function GastosTotais() {
  const [gastos, setGastos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  const categoriaVisivel = categorias.filter(
    (categoria) =>
      categoriaSelecionada === "" ||
      String(categoria.id_categoria) === categoriaSelecionada,
  );

  const calcularTotalGastos = (gastos) => {
    return gastos.reduce((soma, gasto) => soma + Number(gasto.valor), 0);
  };

  const calcularTotalGastosPorCategoria = (categoriaId) => {
    const gastosCategoria = gastos.filter(
      (gasto) => gasto.categoria_id === categoriaId,
    );
    return calcularTotalGastos(gastosCategoria);
  };

  useEffect(() => {
    fetch(`${API_URL}/gastos`)
      .then((response) => response.json())
      .then((data) => setGastos(data))
      .catch((error) => console.error("Erro ao buscar gastos:", error));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/categorias`)
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error("Erro ao buscar categorias:", error));
  }, []);

  return (
    <div>
      <div className="border-2 border-yellow-700 mt-4 rounded-2xl bg-yellow-300 p-4">
        <p className="text-center text-lg font-bold text-gray-700">
          Bem-vindo aos Gastos Totais!
        </p>
        <p className="text-center font-semibold text-gray-600">
          Aqui você pode visualizar, cadastrar e gerenciar todos os seus gastos.
        </p>
        <div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">
              Total de Gastos: {moeda(calcularTotalGastos(gastos))}
            </span>
            <select
              value={categoriaSelecionada}
              onChange={(e) => setCategoriaSelecionada(e.target.value)}
              className="font-bold text-gray-700 rounded-xl cursor-pointer field-sizing-content"
            >
              <option value="">Todas as Categorias</option>
              {categorias.map((categoria) => (
                <option
                  key={categoria.id_categoria}
                  value={categoria.id_categoria}
                >
                  {categoria.nome} - Total:{" "}
                  {moeda(calcularTotalGastosPorCategoria(categoria.id_categoria))}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-4 py-4">
            {categoriaVisivel.map((categoria) => (
              <div
                key={categoria.id_categoria}
                className="flex flex-col-2 justify-between border border-orange-700 rounded-2xl py-2 px-4"
              >
                <span className="flex justify-items-center font-semibold border rounded-2xl px-3 py-4 bg-orange-300 text-gray-700">
                  {categoria.nome}
                </span>
                {gastos
                  .filter(
                    (gasto) => gasto.categoria_id === categoria.id_categoria,
                  )
                  .map((gasto) => (
                    <div
                      key={gasto.id}
                      className="text-gray-500 border rounded-2xl p-2 gap-2"
                    >
                      <div className="flex justify-end">{gasto.valor}$</div>
                      <div>{gasto.descricao}</div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default GastosTotais;
