import NavBar from './NavBar.jsx'
import { Routes, Route } from "react-router";
import GastosTotais from './GastosTotais.jsx'
import Dashboard from './Dashboard.jsx'
import Configuracoes from './Configuracoes.jsx'
import Inicio from './Inicio.jsx'
import BoxBemVindos from "./BoxBemVindos.jsx";
import Cadastros from "./Cadastros.jsx";

function App() {

  return (
    <div className="bg-black/5">
    <div className="min-h-screen max-w-5xl mx-auto">
    <BoxBemVindos />
      <header className="flex justify-center items-center p-10 border border-amber-500 translate-y-2 rounded-2xl  bg-amber-200 ">
          <div className="bg-orange-600 rounded-2xl p-2">
            <h1 className="font-extrabold font-sans text-3xl text-white">Controle de Gastos</h1>
          </div>
      </header>
    <NavBar />

      <main className="pb-6">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/GastosTotais" element={<GastosTotais />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Cadastros" element={<Cadastros />} />
          <Route path="/Configuracoes" element={<Configuracoes />} />
        </Routes>
      </main>
    </div>
    </div>
  )
}
export default App