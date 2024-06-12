import db from "../db";
import "./Cuentas.css";
import { format } from "date-fns";
import { es } from "date-fns/locale"; // Importa el idioma español
import html2canvas from "html2canvas";

// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";

const opcionesRuta = [
  "San Isidro",
  "Calicapan",
  "Sosa Escuela",
  "Tezotepec",
  "Coahuixco",
  "Tacopan",
  "San Miguel",
];

const RegistroForm = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  const [registro, setRegistro] = useState({
    fecha: new Date().toISOString().slice(0, 10),
    nombre: "",
    ruta: opcionesRuta[0],
    cuenta: "",
    odo: "",
    kmRecorridos: "",
    gasolina: "",
    precioGasolina: "",
    numeroUnidad: "36",
    notas: "",
    gastos: [
      { descripcion: "", cantidad: "" },
      { descripcion: "", cantidad: "" },
      { descripcion: "", cantidad: "" },
      { descripcion: "", cantidad: "" },
    ],
  });

  const handleFechaChange = (e) => {
    setRegistro((prevState) => ({
      ...prevState,
      fecha: e.target.value,
    }));
  };

  const handleRutaChange = (e) => {
    setRegistro((prevState) => ({
      ...prevState,
      ruta: e.target.value,
    }));
  };

  const handleCuentaChange = (e) => {
    setRegistro((prevState) => ({
      ...prevState,
      cuenta: e.target.value,
    }));
  };

  const handleOdoChange = (e) => {
    setRegistro((prevState) => ({
      ...prevState,
      odo: e.target.value,
    }));
  };

  const handleKmRecorridosChange = (e) => {
    setRegistro((prevState) => ({
      ...prevState,
      kmRecorridos: e.target.value,
    }));
  };

  const handleGasolinaChange = (e) => {
    setRegistro((prevState) => ({
      ...prevState,
      gasolina: e.target.value,
    }));
  };

  const handlePrecioGasolinaChange = (e) => {
    setRegistro((prevState) => ({
      ...prevState,
      precioGasolina: e.target.value,
    }));
  };

  const handleNumeroUnidadChange = (e) => {
    setRegistro((prevState) => ({
      ...prevState,
      numeroUnidad: e.target.value,
    }));
  };

  const handleNotasChange = (e) => {
    setRegistro((prevState) => ({
      ...prevState,
      notas: e.target.value,
    }));
  };

  const handleDescripcionChange = (index) => (e) => {
    const { value } = e.target;
    setRegistro((prevState) => ({
      ...prevState,
      gastos: prevState.gastos.map((item, i) =>
        i === index ? { ...item, descripcion: value } : item
      ),
    }));
  };

  const handleCantidadChange = (index) => (e) => {
    const { value } = e.target;
    setRegistro((prevState) => ({
      ...prevState,
      gastos: prevState.gastos.map((item, i) =>
        i === index ? { ...item, cantidad: value } : item
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    db.registros
      .add(registro)
      .then(() => {
        console.log("Registro agregado correctamente");
        // Puedes agregar aquí alguna lógica adicional después de agregar el registro
      })
      .catch((error) => {
        console.error("Error al agregar el registro: ", error);
      });
    setFormVisible(false);
    // Recarga la página después de enviar el formulario
    window.location.reload();
  };

  const llamarFormulario = () => {
    setFormVisible(true);
  };

  const handleButtonClick = () => {
    setFormVisible(false);
  };

  return (
    <>
      <button className="boton-add" onClick={llamarFormulario}>+</button>
      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <label>
            <br></br>
            <input
              type="date"
              name="fecha"
              value={registro.fecha}
              onChange={handleFechaChange}
            />
          </label>
          <label>
            Ruta:
            <select
              name="ruta"
              value={registro.ruta}
              onChange={handleRutaChange}
            >
              {opcionesRuta.map((opcion, index) => (
                <option key={index} value={opcion}>
                  {opcion}
                </option>
              ))}
            </select>
          </label>
          <label>
            <input
              type="number"
              name="cuenta"
              placeholder="Cuenta"
              value={registro.cuenta}
              onChange={handleCuentaChange}
              step="0.01"
            />
          </label>
          <label>
            <input
              type="number"
              name="odo"
              placeholder="Odometro"
              value={registro.odo}
              onChange={handleOdoChange}
            />
          </label>
          <label>
            <input
              type="number"
              name="kmRecorridos"
              placeholder="Km. Recorridos"
              value={registro.kmRecorridos}
              onChange={handleKmRecorridosChange}
            />
          </label>
          <label>
            <input
              type="number"
              name="gasolina"
              placeholder="$ Gasolina"
              value={registro.gasolina}
              onChange={handleGasolinaChange}
              step="0.01"
            />
          </label>
          <label>
            <input
              type="number"
              name="precioGasolina"
              placeholder="Precio litro de gasolina"
              value={registro.precioGasolina}
              onChange={handlePrecioGasolinaChange}
              step="0.01"
            />
          </label>
          <label>
            <input
              type="number"
              name="numeroUnidad"
              placeholder="Numero de unidad"
              value={registro.numeroUnidad}
              onChange={handleNumeroUnidadChange}
            />
          </label>
          <label>
            <textarea
              rows={4}
              placeholder="Notas"
              value={registro.notas}
              onChange={handleNotasChange}
            />
          </label>
          {registro.gastos.map((gasto, index) => (
            <div key={index}>
              <label>
                <input
                  placeholder={`Descripción ${index + 1}`}
                  type="text"
                  value={gasto.descripcion}
                  onChange={handleDescripcionChange(index)}
                />
              </label>
              <label>
                <input
                  placeholder={`Cantidad ${index + 1}`}
                  type="number"
                  value={gasto.cantidad}
                  onChange={handleCantidadChange(index)}
                  step="0.01"
                />
              </label>
            </div>
          ))}
          <button className="boton-guardar" type="submit">
            Agregar Registro
          </button>
          <button className="boton-eliminar" onClick={handleButtonClick}>
            Cancelar
          </button>
        </form>
      )}
    </>
  );
};

const RegistroTable = () => {
  const [registros, setRegistros] = useState([]);
  const [currentRecordIndex, setCurrentRecordIndex] = useState(0);

  const tablaRef = useRef(null);
  const tablaGeneralRef = useRef(null);

  useEffect(() => {
    db.registros
      .toArray()
      .then((res) => {
        setRegistros(res);
      })
      .catch((error) => {
        console.error("Error al obtener registros: ", error);
      });
  }, []);

  useEffect(() => {
    db.registros
      .toArray()
      .then((res) => {
        setRegistros(res);
        setCurrentRecordIndex(res.length - 1); // Establecer el índice del último registro
      })
      .catch((error) => {
        console.error("Error al obtener registros: ", error);
      });
  }, []);

  const handleNext = () => {
    setCurrentRecordIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex < registros.length ? nextIndex : prevIndex;
    });
  };

  const handlePrevious = () => {
    setCurrentRecordIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex >= 0 ? nextIndex : prevIndex;
    });
  };

  const handleDelete = () => {
    db.registros
      .delete(registros[currentRecordIndex].id)
      .then(() => {
        console.log("Registro eliminado correctamente");
        setRegistros((prevRegistros) =>
          prevRegistros.filter((_, index) => index !== currentRecordIndex)
        );
        if (
          currentRecordIndex === registros.length - 1 &&
          currentRecordIndex > 0
        ) {
          setCurrentRecordIndex((prevIndex) => prevIndex - 1);
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el registro: ", error);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "EEEE dd 'de' MMMM 'de' yyyy", { locale: es });
  };

  const currentRecord = registros[currentRecordIndex]; // Guarda el registro actual en una variable

  function capturarTabla() {
    const tabla = tablaRef.current;
    html2canvas(tabla).then(function (canvas) {
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `cuenta abraham.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  }

  function capturarTablaGeneral() {
    const tabla = tablaGeneralRef.current;
    html2canvas(tabla).then(function (canvas) {
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `Tabla general de cuentas.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  }

  // Calcula el total de los gastos
  const calcularTotalGastos = () => {
    let total = 0;
    currentRecord.gastos.forEach((gasto) => {
      if (gasto.cantidad.trim() !== "") {
        // Verifica que la cantidad no sea una cadena vacía
        total += parseFloat(gasto.cantidad);
      }
    });
    return total.toFixed(2); // Redondea el total a 2 decimales
  };

  const calcularCuentaTotal = () => {
    const cuentaActual = parseFloat(registros[currentRecordIndex].cuenta);
    const totalGastos = parseFloat(calcularTotalGastos());
    return (cuentaActual + totalGastos).toFixed(2);
  };

  // Verifica si hay algún gasto con una cantidad válida
  const hayGastos =
    currentRecord &&
    currentRecord.gastos.some((gasto) => gasto.cantidad.trim() !== "");

  return (
    <>
      <table ref={tablaRef}>
        <thead>
          <tr>
            <th colSpan={2} className="encabezado">
              {currentRecord ? formatDate(currentRecord.fecha) : ""}
            </th>
            {/* Verifica si hay un registro antes de acceder a sus propiedades */}
          </tr>
          <tr>
            <th colSpan={2} className="encabezado">
              Abraham Cabrera Benito
            </th>
          </tr>
        </thead>
        <tbody>
          {registros.length > 0 && (
            <>
              <tr>
                <td className="titulo">Ruta</td>
                <td className="valor">{registros[currentRecordIndex].ruta}</td>
              </tr>
              <tr>
                <td className="titulo">Cuenta</td>
                <td className="cuenta">
                  $ {registros[currentRecordIndex].cuenta}.00
                </td>
              </tr>
              <tr>
                <td className="titulo">ODO</td>
                <td className="valor">{registros[currentRecordIndex].odo}</td>
              </tr>
              <tr>
                <td className="titulo">Recorrido</td>
                <td className="valor">
                  {registros[currentRecordIndex].kmRecorridos}
                </td>
              </tr>

              <tr>
                <td className="titulo">Gasolina $</td>
                <td className="valor">
                  $ {registros[currentRecordIndex].gasolina}
                </td>
              </tr>
              <tr>
                <td className="titulo">Precio litro</td>
                <td className="valor">
                  $ {registros[currentRecordIndex].precioGasolina}
                </td>
              </tr>
              <tr>
                <td className="titulo">gasolina x km.</td>
                <td className="valor">
                  ${" "}
                  {(
                    registros[currentRecordIndex].gasolina /
                    registros[currentRecordIndex].kmRecorridos
                  ).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="titulo">litros.</td>
                <td className="valor">
                  {(
                    registros[currentRecordIndex].gasolina /
                    registros[currentRecordIndex].precioGasolina
                  ).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="titulo">km. x litro</td>
                <td className="valor">
                  {(
                    registros[currentRecordIndex].kmRecorridos /
                    (registros[currentRecordIndex].gasolina /
                      registros[currentRecordIndex].precioGasolina)
                  ).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="titulo">Unidad</td>
                <td className="valor">
                  {registros[currentRecordIndex].numeroUnidad}
                </td>
              </tr>
              {registros[currentRecordIndex].notas && (
                <tr>
                  <td className="titulo">Notas</td>
                  <td className="notas">
                    {registros[currentRecordIndex].notas}
                  </td>
                </tr>
              )}
              {hayGastos && (
                <tr>
                  <td className="encabezado" colSpan={2}>
                    Gastos
                  </td>
                </tr>
              )}
              {currentRecord.gastos.map((gasto, index) => {
                if (gasto.descripcion !== "" || gasto.cantidad !== "") {
                  return (
                    <tr key={index}>
                      <td className="gasto-descripcion">{gasto.descripcion}</td>
                      <td className="gasto-cantidad">$ {gasto.cantidad}.00</td>
                    </tr>
                  );
                }
                return null;
              })}
              {currentRecord &&
                currentRecord.gastos.some(
                  (gasto) => gasto.cantidad.trim() !== ""
                ) && (
                  <>
                    <tr>
                      <td className="total-gastos">Total Gastos</td>
                      <td className="total-gastos-cantidad">
                        $ {calcularTotalGastos()}
                      </td>
                    </tr>
                    <tr>
                      <td className="mas-efectivo">+ Efectivo</td>
                      <td className="mas-efectivo-cantidad">
                        $ {registros[currentRecordIndex].cuenta}.00
                      </td>
                    </tr>
                    <tr>
                      <td className="titulo">Cuenta total</td>
                      <td className="cuenta">$ {calcularCuentaTotal()}</td>
                    </tr>
                  </>
                )}
            </>
          )}
        </tbody>
      </table>
      <div className="boton-flotante">
        <button
          className="boton-navegar"
          onClick={handlePrevious}
          disabled={currentRecordIndex === 0}
        >
          Anterior
        </button>
        <button
          className="boton-navegar"
          onClick={handleNext}
          disabled={currentRecordIndex === registros.length - 1}
        >
          Siguiente
        </button>
        
      </div>
      <div>
        <button className="boton-capturar" onClick={capturarTabla}>
          Capturar
        </button>
        <button
          className="boton-eliminar"
          onClick={handleDelete}
          disabled={registros.length === 0}
        >
          Eliminar
        </button>
      </div>
      <hr></hr>
      <table className="tabla-general" ref={tablaGeneralRef}>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Ruta</th>
            <th>Cuenta</th>
            <th>Km.</th>
            <th>Gasolina</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro) => (
            <tr key={registro.id}>
              <td>{formatDate(registro.fecha)}</td>
              <td>{registro.ruta}</td>
              <td>{registro.cuenta}</td>
              <td>{registro.kmRecorridos}</td>
              <td>{registro.gasolina}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button className="boton-capturar" onClick={capturarTablaGeneral}>
          Capturar
        </button>
      </div>
    </>
  );
};

const Cuentas = () => {
  return (
    <div className="contenedor">
      <RegistroForm />
      <hr></hr>
      <RegistroTable />
      <hr></hr>
      <hr></hr>
      <hr></hr>
    </div>
  );
};

export default Cuentas;
