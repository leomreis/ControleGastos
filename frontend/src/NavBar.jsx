import { NavLink } from "react-router";

function NavBar() {
  const itens = [
    { to: "/", label: "Início" },
    { to: "/Cadastros", label: "Cadastros" },
    { to: "/GastosTotais", label: "Gastos Totais" },
    { to: "/Dashboard", label: "Dashboard" },
    { to: "/Configuracoes", label: "Configurações" },
  ];
  return (
    <nav className="flex justify-center items-center p-4 border border-amber-500 rounded-2xl mt-4 bg-amber-200 gap-2">
      {itens.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `rounded-xl px-4 bg-amber-50 transition-colors ${isActive ? "bg-black text-white font-bold" : "text-gray-200 bg-orange-600"}`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
export default NavBar;
