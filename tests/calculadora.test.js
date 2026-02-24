const calculadora = require("../models/calculadora");

test("somar 2 + 2", () => {
  const resultado = calculadora.somar(2, 2);
  expect(resultado).toBe(4);
});

test("somar 100 + 5", () => {
  const resultado = calculadora.somar(100, 5);
  expect(resultado).toBe(105);
});

test("somar 'banana' + 5", () => {
  const resultado = calculadora.somar("banana", 5);
  expect(resultado).toBe("Erro");
});

test("somar 'banana' + 'banana'", () => {
  const resultado = calculadora.somar("banana", "banana");
  expect(resultado).toBe("Erro");
});
