function somar(num1, num2) {
  notANumber = typeof num1 !== "number" || typeof num2 !== "number";

  if (notANumber) return "Erro";
  return num1 + num2;
}

exports.somar = somar;
