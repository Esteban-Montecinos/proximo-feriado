import { getProximoFeriado } from "./client";
import Pala from "./pala";

async function getFeriados() {
  const feriados = await fetch(
    "https://apis.digital.gob.cl/fl/feriados/2024", { next: { revalidate: 3600 } }
  ).then((res) => res.json());
  return feriados;
}

export default async function Home() {
  const feriados = await getFeriados();
const rtf = new Intl.RelativeTimeFormat("es-CL", { numeric: "auto" });
const { proximoFeriado, fechaProximoFeriado} = getProximoFeriado(feriados)
  return (
    <main className="flex flex-col items-center justify-between max-w-6xl min-h-screen p-4 m-auto">
      <section className="flex flex-col items-center justify-center w-full font-extrabold">
        <span className="mb-4 bg-clip-text sm:text-xl text-sm text-transparent bg-gradient-to-r from-sky-500 to-emerald-500 to-90%">
          Cuenta atrás para soltar la pala,
        </span>
        <span className="text-4xl text-center sm:text-7xl text-salte-950">
          {proximoFeriado.nombre}.
        </span>
        <span className="text-lg text-center sm:text-4xl text-salte-950">
          {fechaProximoFeriado.toLocaleDateString('es-cl', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }.
        </span>
        <span className="text-base sm:text-2xl text-salte-950">
          Tipo de feriado: {proximoFeriado.tipo}{proximoFeriado.irrenunciable == 1? ', irrenunciable.':'.'}
        </span>
      </section>
      <Pala />
      <span className="text-xs">Hecho con ❤ por <a href="https://www.instagram.com/estebannmontecinos/?theme=dark" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline ">Esteban Montecinos</a></span>
    </main>
  );
}
