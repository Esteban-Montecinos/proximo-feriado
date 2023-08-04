function diferenciaEnDias(fechaInicio, fechaFin) {
  const unDia = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((fechaInicio - fechaFin) / unDia));
}

export const getProximoFeriado = (feriados) => {
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
  const proxFechaSplit = proximoFeriado.fecha.split("-");
  const fechaProximoFeriado = new Date(
    Number(proxFechaSplit[0]) ,
    Number(proxFechaSplit[1]) - 1,
    Number(proxFechaSplit[2]) 
  );
  const diferencia = diferenciaEnDias(hoy, fechaProximoFeriado);
  return { diferencia, proximoFeriado, fechaProximoFeriado };
};
