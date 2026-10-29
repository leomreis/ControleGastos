import FormCategorias from "./FormCategorias";
import FormGastos from "./FormGastos";

function Cadastros() {
  return (
    <div className="justify-center items-center p-10 border border-amber-500 rounded-2xl bg-amber-200 mt-2">
      <div className="flex justify-center text-orange-800 text-2xl text-center font-extrabold border border-orange-600 rounded-2xl p-4 bg-orange-100">
        Cadastros
      </div>

      <div className="flex flex-col gap-6 mt-4 text-black">
        <FormGastos />
        <hr className="border-orange-300" />
        <FormCategorias />
      </div>
    </div>
  );
}

export default Cadastros;
