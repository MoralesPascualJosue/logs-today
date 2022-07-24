export function getWeekLimits(fecha: Date) {
  return {
    inicio: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() - fecha.getDay()),
    fin: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() + 6 - fecha.getDay()),
  };
}

export function getDateMilliseconds(fecha: Date) {
  return Math.round(fecha.getTime() / 1000);
}
