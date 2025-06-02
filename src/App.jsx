import { useState, useEffect } from "react";

const semanas = ["Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 5", "Semana 6"];
const ejerciciosIniciales = [
  "Sentadillas",
  "Estocadas",
  "Subida al Paredón",
  "Cuádriceps Máquina",
  "Bíceps",
  "Dominadas Máquina",
  "Peso Muerto Barra Hexagonal",
  "Hip Thrust",
  "Isquios",
  "Patada Lateral",
  "Press Plano",
  "Tríceps",
];

const LOCAL_STORAGE_KEY = "tabla-ejercicios";

export default function App() {
  const [ejercicios, setEjercicios] = useState([]);

  useEffect(() => {
    const datosGuardados = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (datosGuardados) {
      const parsed = JSON.parse(datosGuardados);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setEjercicios(parsed);
      } else {
        setEjercicios(
          ejerciciosIniciales.map((ej) => ({
            nombre: ej,
            semanas: Array(6).fill(""),
          }))
        );
      }
    } else {
      setEjercicios(
        ejerciciosIniciales.map((ej) => ({
          nombre: ej,
          semanas: Array(6).fill(""),
        }))
      );
    }
  }, []);

  useEffect(() => {
    if (ejercicios.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ejercicios));
    }
  }, [ejercicios]);

  const handleChange = (e, iEjercicio, iSemana) => {
    const nuevosEjercicios = [...ejercicios];
    nuevosEjercicios[iEjercicio].semanas[iSemana] = e.target.value;
    setEjercicios(nuevosEjercicios);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-900 text-white">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-pink-500">
          <thead>
            <tr>
              <th className="border px-2 py-1 bg-pink-700 text-white">Ejercicios</th>
              {semanas.map((semana, i) => (
                <th key={i} className="border px-2 py-1 bg-pink-600 text-white">
                  {semana}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ejercicios.map((ejercicio, iEjercicio) => (
              <tr key={iEjercicio}>
                <td className="border px-2 py-1 bg-gray-800 font-medium">
                  {ejercicio.nombre}
                </td>
                {ejercicio.semanas.map((valor, iSemana) => (
                  <td key={iSemana} className="border px-2 py-1 bg-gray-700">
                    <input
                      type="text"
                      value={valor}
                      onChange={(e) => handleChange(e, iEjercicio, iSemana)}
                      className="w-full p-1 border border-pink-400 bg-gray-900 text-white rounded text-sm"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
