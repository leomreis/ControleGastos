import { Link } from "react-router";
import { LayoutDashboard } from 'lucide-react'
import { CircleDollarSign } from 'lucide-react'
import { Cog } from 'lucide-react'
import { NotebookPen } from 'lucide-react'

function Inicio() {
  const itens = [
    {
      to: "/GastosTotais",
      emoji: <CircleDollarSign size={68} className="text-white" />,
      titulo: "Gastos Totais",
      descricao: "Veja todos os seus gastos",
    },
    {
      to: "/Dashboard",
      emoji: <LayoutDashboard size={68} className="text-white" />,
      titulo: "Dashboard",
      descricao: "Gráficos dos seus gastos",
    },
    {
      to: "/Configuracoes",
      emoji: <Cog size={68} className="text-white" />,
      titulo: "Configurações",
      descricao: "Gerencie suas configurações",
    },
    {
      to: "/Cadastros",
      emoji: <NotebookPen size={68} className="text-white" />,
      titulo: "Cadastros",
      descricao: "Adicione novos gastos e categorias",
    }
  ];
  return (
      <section className="grid grid-cols-2 justify-center mx-auto p-5 items-center border border-amber-500 rounded-2xl mt-4 bg-amber-200 gap-4">
        {itens.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex flex-col gap-4 bg-orange-500 rounded-3xl flex-1 py-10"
          >
            <h2 className="font-extrabold text-xl text-center text-white">{item.titulo}</h2>
            <span className="flex justify-center ">{item.emoji}</span>
            <p className="w-full  text-center text-bold text-xl text-white">{item.descricao}</p>
          </Link>
        ))}
      </section>

  );
}
export default Inicio;
