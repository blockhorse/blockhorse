import React, { useState, useEffect } from "react";
import { linkApp } from "./../configuracion/variablesPublicas.jsx";

function SistemasActivos() {
  const [SitemaActivo, setSitemaActivo] = useState(null);

  useEffect(() => {
    // Definir la función fetchData para evitar errores de cancelación de suscripciones
    const fetchData = async () => {
      try {
        const response = await fetch(`${linkApp}/sistemas_activos`);
        const data = await response.json();
        console.log("DATA Sistemas Activos",data);
        const balanceDrops = data.body[0].balance_cofre_e;
        const retirosDrops = 0; //data.body[0].retiros_drops;
        const result = (balanceDrops - retirosDrops).toFixed(2);
        setSitemaActivo(data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    // Llamar a fetchData una vez al cargar la página
    fetchData();

    // No es necesario especificar un retorno de función para useEffect, ya que no hay suscripciones que limpiar
  }, []);

  console.log("SitemaActivo", SitemaActivo);

  // No se está renderizando nada en este componente, por lo que no es necesario devolver ningún elemento JSX
  return null;
}

export default SistemasActivos;
