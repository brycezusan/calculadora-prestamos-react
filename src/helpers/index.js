export const formatearMoneda = (valor) => {
  return valor.toLocaleString("es-PE", {
    style: "currency",
    currency: "PEN",
  });
};

export const calcularTotalPagar = (cantidad , plazo) => {
  let total = cantidad;
  if (plazo === 12) {
    total *= 1.35;
  } else if (plazo === 6) {
    total *= 1.25;
  } else {
    total *= 1.1;
  }

  return total
};
