import Dexie from "dexie";

const db = new Dexie("cuentas");
db.version(1).stores({
  registros: "++id, fecha, ruta, cuenta, odo, kmRecorridos, numeroUnidad, gasolina, precioGasolina, gastos",
});

export default db;