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
  const [registro, setRegistro] = useState({
    fecha: new Date().toISOString().slice(0, 10),
    nombre: "",
    ruta: opcionesRuta[0],
    cuenta: "",
    odo: "",
    kmRecorridos: "",
    numeroUnidad: "",
    gasolina: "",
    precioGasolina: "",
    gastos: "",
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

  const handleNumeroUnidadChange = (e) => {
    setRegistro((prevState) => ({
      ...prevState,
      numeroUnidad: e.target.value,
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

  const handleGastosChange = (e) => {
    setRegistro((prevState) => ({
      ...prevState,
      gastos: e.target.value,
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
  };

  return (
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
        <select name="ruta" value={registro.ruta} onChange={handleRutaChange}>
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
          placeholder="CUENTA"
          value={registro.cuenta}
          onChange={handleCuentaChange}
          step="0.01"
        />
      </label>
      <label>
        <input
          type="number"
          name="odo"
          placeholder="ODOMETRO"
          value={registro.odo}
          onChange={handleOdoChange}
        />
      </label>
      <label>
        <input
          type="number"
          name="kmRecorridos"
          placeholder="KM. RECORRIDOS"
          value={registro.kmRecorridos}
          onChange={handleKmRecorridosChange}
        />
      </label>
      <label>
        <input
          type="number"
          name="numeroUnidad"
          placeholder="NUMERO DE UNIDAD"
          value={registro.numeroUnidad}
          onChange={handleNumeroUnidadChange}
        />
      </label>
      <label>
        <input
          type="number"
          name="gasolina"
          placeholder="$ GASOLINA"
          value={registro.gasolina}
          onChange={handleGasolinaChange}
          step="0.01"
        />
      </label>
      <label>
        <input
          type="number"
          name="precioGasolina"
          placeholder="PRECIO LITRO GASOLINA"
          value={registro.precioGasolina}
          onChange={handlePrecioGasolinaChange}
          step="0.01"
        />
      </label>
      <label>
        <textarea
          placeholder="Descripción"
          name="Gastos"
          value={registro.gastos}
          onChange={handleGastosChange}
          rows={4} // Puedes ajustar el número de filas según tus necesidades
        />
      </label>
      <button className="boton-guardar" type="submit">
        Agregar Registro
      </button>
    </form>
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

  return (
    <>
      <table ref={tablaRef}>
        <thead>
          <tr>
            <th colSpan={2} className="encabezado">
              {currentRecord ? formatDate(currentRecord.fecha) : ""}
            </th>{" "}
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
                <td className="titulo">KM. Recorridos</td>
                <td className="valor">
                  {registros[currentRecordIndex].kmRecorridos}
                </td>
              </tr>
              <tr>
                <td className="titulo">Numero de Unidad</td>
                <td className="valor">
                  {registros[currentRecordIndex].numeroUnidad}
                </td>
              </tr>
              <tr>
                <td className="titulo">Gasolina $</td>
                <td className="valor">
                  $ {registros[currentRecordIndex].gasolina}.00
                </td>
              </tr>
              <tr>
                <td className="titulo">Precio litro</td>
                <td className="valor">
                  $ {registros[currentRecordIndex].precioGasolina}
                </td>
              </tr>
              <tr>
                <td className="titulo">Gastos</td>
                <td className="valor">
                  {registros[currentRecordIndex].gastos}
                </td>
              </tr>
              <tr>
                <td className="titulo">gasolina x km.</td>
                <td className="valor">
                  {((registros[currentRecordIndex].gasolina)/(registros[currentRecordIndex].kmRecorridos)).toFixed(2)}
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
      <div>
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
        <button
          className="boton-eliminar"
          onClick={handleDelete}
          disabled={registros.length === 0}
        >
          Eliminar
        </button>
      </div>
      <div>
        <button className="boton-capturar" onClick={capturarTabla}>
          Capturar
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
              <td>{registro.cuenta}.00</td>
              <td>{registro.kmRecorridos}</td>
              <td>{registro.gasolina}.00</td>
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
    </div>
  );
};

export default Cuentas;
