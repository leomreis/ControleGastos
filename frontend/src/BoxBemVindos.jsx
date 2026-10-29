import { useState } from 'react'

const CHAVE = "bem_vindos_visto"

function BoxBemVindos () {
    const [visivel, setVisivel] = useState(() => 
       localStorage.getItem(CHAVE) !== "sim"
    );
    function fechar() {
        localStorage.setItem(CHAVE, "sim");
        setVisivel(false);
    }
    if (!visivel) return null;

  return (
    <div className="fixed p-4 z-50 inset-0 flex items-center justify-center bg-black/60">
        <div role="dialog" aria-modal="true" aria-labelledby="bem-vindo" className="rounded-2xl max-w-md w-full bg-white p-6">
        <p className="text-center text-yellow-700 font-extrabold text-xl mb-4 bg-yellow-100 rounded-xl" id="bem-vindo">
            Bem-vindo ao Controle de Gastos!
        </p>
        <p className="text-center font-bold text-lg rounded-2xl p-4">
            Este é um aplicativo para ajudar você a controlar seus gastos de forma eficiente. Explore as funcionalidades disponíveis e aproveite ao máximo!
        </p>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold p-1 rounded-xl cursor-pointer" onClick={fechar}>Fechar</button>
        </div>
    </div>
  );
} export default BoxBemVindos;