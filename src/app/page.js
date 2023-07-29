import Pala from "./pala";

async function getFeriados() {
  const feriados = await fetch(
    "https://apis.digital.gob.cl/fl/feriados/2023"
  ).then((res) => res.json());
  return feriados;
}
function diferenciaEnDias(fechaInicio, fechaFin) {
  const unDia = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((fechaInicio - fechaFin) / unDia));
}
const feriados = await getFeriados();
const hoy = new Date();
const proximoFeriado = feriados.find(
  (feriado) => new Date(feriado.fecha) > hoy
) || {
  ...feriados[0],
  fecha: new Date(
    new Date(feriados[0].fecha).getFullYear + 1,
    new Date(feriados[0].fecha).getMonth,
    new Date(feriados[0].fecha).getDate + 1
  ),
};
const proxFechaSplit = proximoFeriado.fecha.split('-')
const fechaProximoFeriado = new Date(proxFechaSplit[0],(proxFechaSplit[1] - 1),proxFechaSplit[2])
const diferencia = diferenciaEnDias(hoy, fechaProximoFeriado);
const rtf = new Intl.RelativeTimeFormat("es-CL", { numeric: "auto" });
export default function Home() {
  return (
    <main className="flex min-h-screen max-w-6xl m-auto flex-col gap-4 items-center justify-center p-4">
      <section class="font-extrabold flex flex-col justify-center items-center w-full">
        <span class="mb-4 bg-clip-text sm:text-xl text-sm text-transparent bg-gradient-to-r from-sky-500 to-emerald-500 to-90%">
          Cuenta atrás para soltar la pala,
        </span>
        <span class="sm:text-7xl text-4xl text-center text-salte-950">
          {proximoFeriado.nombre + " " + rtf.format(diferencia, "day")}.
        </span>
        <span class="sm:text-xl text-sm text-center text-salte-950">
          {fechaProximoFeriado.toLocaleDateString('es-cl', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }.
        </span>
        <span class="text-xl text-salte-950">
          Tipo de feriado: {proximoFeriado.tipo}{proximoFeriado.irrenunciable == 1? ', irrenunciable.':'.'}
        </span>
      </section>
      <Pala />
      <span className="text-xs">Hecho con ❤ por <a href="https://www.instagram.com/estebannmontecinos/?theme=dark" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline ">Esteban Montecinos</a></span>
    </main>
  );
}
