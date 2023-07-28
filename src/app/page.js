import Pala from "./pala";

async function getFeriados() {
  const feriados = await fetch(
    "https://apis.digital.gob.cl/fl/feriados/2023"
  ).then((res) => res.json());
  return feriados;
}
function diferenciaEnDias(fechaInicio, fecha2) {
  const fechaFin = new Date(fecha2);
  const msDiff = Math.abs(fechaFin - fechaInicio);

  const unDiaEnMilisegundos = 24 * 60 * 60 * 1000;
  const diferenciaDias = Math.floor(msDiff / unDiaEnMilisegundos);

  return diferenciaDias;
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
const diferencia = diferenciaEnDias(hoy, proximoFeriado.fecha);
const rtf = new Intl.RelativeTimeFormat("es-CL", { numeric: "auto" });
export default function Home() {
  return (
    <main className="flex min-h-screen max-w-7xl m-auto flex-col gap-4 items-center p-24">
      <div class="text-4xl font-extrabold flex flex-col justify-center items-center">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-emerald-500 to-90%">
          Cuenta atrás para soltar la pala,
        </span>
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-emerald-500 to-90%">
          {proximoFeriado.nombre + " " + rtf.format(diferencia, "day")}.
        </span>
        <span class="bg-clip-text text-3xl text-transparent bg-gradient-to-r from-sky-500 to-emerald-500 to-90%">
          Tipo de feriado: {proximoFeriado.tipo}.
        </span>
      </div>
      <Pala />
    </main>
  );
}
