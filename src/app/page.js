import { getProximoFeriado } from "./client";
import Pala from "./pala";

async function getFeriados() {
  const feriados = await fetch(
    "https://apis.digital.gob.cl/fl/feriados/2023", { cache: 'force-cache' }
  ).then((res) => res.json());
  return feriados;
}

const feriados = await getFeriados();
const rtf = new Intl.RelativeTimeFormat("es-CL", { numeric: "auto" });
const { proximoFeriado, fechaProximoFeriado} = getProximoFeriado(feriados)



export default function Home() {
  return (
    <main className="flex min-h-screen max-w-6xl m-auto flex-col items-center justify-between p-4">
      <section className="font-extrabold flex flex-col justify-center items-center w-full">
        <span className="mb-4 bg-clip-text sm:text-xl text-sm text-transparent bg-gradient-to-r from-sky-500 to-emerald-500 to-90%">
          Cuenta atrás para soltar la pala,
        </span>
        <span className="sm:text-7xl text-4xl text-center text-salte-950">
          {proximoFeriado.nombre}.
        </span>
        <span className="sm:text-4xl text-lg text-center text-salte-950">
          {fechaProximoFeriado.toLocaleDateString('es-cl', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }.
        </span>
        <span className="sm:text-2xl text-base text-salte-950">
          Tipo de feriado: {proximoFeriado.tipo}{proximoFeriado.irrenunciable == 1? ', irrenunciable.':'.'}
        </span>
      </section>
      <Pala />
      <span className="text-xs">Hecho con ❤ por <a href="https://www.instagram.com/estebannmontecinos/?theme=dark" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline ">Esteban Montecinos</a></span>
    </main>
  );
}
