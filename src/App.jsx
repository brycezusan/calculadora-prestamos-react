import { useEffect, useState } from "react";
import Header from "./components/Header";
import Button from "./components/Button";
import { calcularTotalPagar, formatearMoneda } from "./helpers";

function App() {
  const [cantidad, setCantidad] = useState(0);
  const [plazo, setPlazo] = useState(0);
  const [totalPagar, setTotalPagar] = useState(0);
  const [cuotas, setCuotas] = useState(0);

  const step = 100;
  const max = 2000;
  const min = 0;

  useEffect(() => {
    setTotalPagar(calcularTotalPagar(cantidad, plazo));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plazo, cantidad]);
  
  useEffect(() => {
    setCuotas(totalPagar / plazo)
  }, [totalPagar ,plazo])
  

  const handleClickadd = () => {
    const valor = cantidad + step;

    if (valor > max) {
      alert("maxima cantidad");
      return;
    }

    setCantidad(valor);
  };

  const handleClickDeduct = () => {
    const valor = cantidad - step;

    if (valor < min) {
      alert("minima cantidad");
      return;
    }

    setCantidad(valor);
  };


  const handleChangePlazos = (e) => {
    setPlazo(+e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="max-w-2xl mx-auto w-11/12 xl:w-full bg-white p-6 mt-10">
      <Header />

      <section className="my-10  mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-3">
            <Button fn={handleClickDeduct} tipo="deduct" />
            <Button fn={handleClickadd} />
          </div>
          <input
            type="range"
            className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600"
            value={cantidad}
            max={max}
            min={min}
            step={step}
            onChange={(e) => setCantidad(+e.target.value)}
          />
          <div className="flex justify-between mt-2 font-bold text-slate-500">
            <span>0</span>
            <span className="text-3xl text-blue-700 font-bold">
              {formatearMoneda(cantidad)}
            </span>
            <span>2000</span>
          </div>

          <div className="my-10 text-center">
            <h2 className="text-3xl  text-blue-800 font-black mb-4">
              Eligen un <span className="text-slate-600">Plan de Pagos</span>{" "}
            </h2>

            <select
              className="w-1/3 text-center border border-gray-200 py-1 rounded font-semibold text-slate-800"
              value={plazo}
              onChange={handleChangePlazos}
            >
              <option value={0}> --- Seleccione ---</option>
              <option value={3}> 3 MESES </option>
              <option value={6}> 6 MESES </option>
              <option value={12}> 1 AÑO </option>
            </select>
          </div>
        </form>

        {plazo !== 0 &&  cantidad > 0 ? (
          <section className="border border-gray-300 rounded-md bg-gray-50 text-center shadow my-10 p-4 space-y-2">
            <h2 className="text-center text-4xl font-bold text-slate-900">
              Resumen de <span className="font-black text-red-400">Pagos</span>
            </h2>

            <p className="text-xl text-gray-500 text-center font-semibold">
              {plazo} meses
            </p>
            <p className="text-xl text-gray-500 text-center font-semibold">
              Cantidad: {formatearMoneda(cantidad)}{" "}
            </p>
            <p className="text-xl text-gray-500 text-center font-semibold">
              Total a Pagar: {formatearMoneda(totalPagar)}{" "}
            </p>
            <p className="text-xl text-gray-500 text-center font-semibold">
              Cuotas Mensuales de: {formatearMoneda(cuotas)}{" "}
            </p>
          </section>
        ):(<>
          <h2 className="text-center text-xl font-bold text-blue-600">
              Seleccione sus metodos de Pagos
          </h2>
        </>)}
      </section>
    </main>
  );
}

export default App;
