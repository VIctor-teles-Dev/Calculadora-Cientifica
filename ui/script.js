// Estado da calculadora para controlar quando limpar o display
let calculatorState = {
  shouldClearDisplay: false,
  lastResult: false,
};

// Função para verificar se o display deve ser limpo antes de adicionar novo input
function shouldClearDisplay(currentValue) {
  return (
    currentValue === "0" ||
    currentValue === "Error" ||
    currentValue === "NaN" ||
    currentValue.toLowerCase() === "nan" ||
    calculatorState.shouldClearDisplay
  );
}

// Função personalizada para adicionar números
function addToDisplay(value) {
  const display = document.calculator.display;
  const currentValue = display.value;

  // Se deve limpar o display, substitui o valor atual
  if (shouldClearDisplay(currentValue)) {
    display.value = value;
    calculatorState.shouldClearDisplay = false;
    calculatorState.lastResult = false;
  } else {
    // Caso contrário, adiciona ao valor atual
    display.value += value;
  }
}

// Função para interceptar quando operadores são adicionados
function onOperatorClick(operator) {
  const display = document.calculator.display;
  const currentValue = display.value;

  // Se há erro ou NaN, limpa primeiro
  if (
    currentValue === "Error" ||
    currentValue === "NaN" ||
    currentValue.toLowerCase() === "nan"
  ) {
    display.value = "0";
    return;
  }

  // Se acabou de calcular um resultado, permite continuar a operação
  if (calculatorState.lastResult) {
    calculatorState.lastResult = false;
    calculatorState.shouldClearDisplay = false;
  }

  // Adiciona o operador normalmente
  display.value += operator;
}

// Função All Clear - limpa completamente o display
function allClear() {
  document.calculator.display.value = "0";
  calculatorState.shouldClearDisplay = false;
  calculatorState.lastResult = false;
}

// Função para alternar sinal (+/-)
function toggleSign() {
  const display = document.calculator.display;
  let currentValue = display.value;

  // Não funciona com erro ou NaN
  if (
    currentValue === "Error" ||
    currentValue === "NaN" ||
    currentValue.toLowerCase() === "nan"
  ) {
    return;
  }

  // Se é "0", não faz nada
  if (currentValue === "0") {
    return;
  }

  // Alterna o sinal
  if (currentValue.charAt(0) === "-") {
    display.value = currentValue.slice(1);
  } else {
    display.value = "-" + currentValue;
  }
}

// Função para lidar com porcentagem
function handlePercent() {
  const display = document.calculator.display;
  let currentValue = display.value;

  // Não funciona com erro ou NaN
  if (
    currentValue === "Error" ||
    currentValue === "NaN" ||
    currentValue.toLowerCase() === "nan"
  ) {
    return;
  }

  try {
    // Converte para número e divide por 100
    const result = parseFloat(currentValue) / 100;
    display.value = result.toString();
    calculatorState.shouldClearDisplay = true;
    calculatorState.lastResult = true;
  } catch (e) {
    display.value = "Error";
    calculatorState.shouldClearDisplay = true;
    calculatorState.lastResult = false;
  }
}

// Função backspace - remove último caractere
function backspace() {
  const display = document.calculator.display;
  let currentValue = display.value;

  // Se há erro, NaN, ou é resultado de cálculo, limpa para "0"
  if (
    currentValue === "Error" ||
    currentValue === "NaN" ||
    currentValue.toLowerCase() === "nan" ||
    calculatorState.lastResult
  ) {
    display.value = "0";
    calculatorState.shouldClearDisplay = false;
    calculatorState.lastResult = false;
    return;
  }

  // Remove último caractere
  if (currentValue.length > 1) {
    display.value = currentValue.slice(0, -1);
  } else {
    // Se só tem um caractere, volta para "0"
    display.value = "0";
  }
}

// Função para ser chamada após eval calculation para definir o estado
function afterCalculation() {
  const display = document.calculator.display;
  const result = display.value;

  // Se o resultado é Error ou NaN, prepara para limpar na próxima entrada
  if (
    result === "Error" ||
    result === "NaN" ||
    result.toLowerCase() === "nan"
  ) {
    calculatorState.shouldClearDisplay = true;
    calculatorState.lastResult = false;
  } else {
    // Resultado válido - prepara para limpar na próxima entrada de número ou continuar a operação
    calculatorState.shouldClearDisplay = true;
    calculatorState.lastResult = true;
  }
}

// Função para adicionar ponto decimal
function addDecimal() {
  const display = document.calculator.display;
  const currentValue = display.value;

  // Se deve limpar display primeiro
  if (shouldClearDisplay(currentValue)) {
    display.value = "0.";
    calculatorState.shouldClearDisplay = false;
    calculatorState.lastResult = false;
    return;
  }

  // Verifica se já tem ponto decimal no número atual
  const parts = currentValue.split(/[+\-×*/]/);
  const lastPart = parts[parts.length - 1];

  if (!lastPart.includes(".")) {
    display.value += ".";
  }
}

// Event listeners para capturar teclado (opcional)
document.addEventListener("keydown", function (event) {
  const key = event.key;

  // Números
  if (key >= "0" && key <= "9") {
    addToDisplay(key);
    event.preventDefault();
  }
  // Operadores
  else if (key === "+") {
    addOperator("+");
    event.preventDefault();
  } else if (key === "-") {
    addOperator("-");
    event.preventDefault();
  } else if (key === "*") {
    addOperator("×");
    event.preventDefault();
  } else if (key === "/") {
    addOperator("/");
    event.preventDefault();
  }
  // Enter ou = para calcular
  else if (key === "Enter" || key === "=") {
    calculateResult();
    event.preventDefault();
  }
  // Escape para AC
  else if (key === "Escape") {
    allClear();
    event.preventDefault();
  }
  // Backspace
  else if (key === "Backspace") {
    backspace();
    event.preventDefault();
  }
  // Ponto decimal
  else if (key === "." || key === ",") {
    addDecimal();
    event.preventDefault();
  }
});

// Função para verificar se o display deve ser limpo antes de adicionar novo input
function shouldClearDisplay(currentValue) {
  return (
    currentValue === "0" ||
    currentValue === "Error" ||
    currentValue === "NaN" ||
    currentValue.toLowerCase() === "nan" ||
    calculatorState.shouldClearDisplay
  );
}

// Caracteres permitidos: números (0-9), operadores matemáticos (+, -, *, /),
// ponto decimal (.), parênteses (()), e funções matemáticas
function isValidKey(event) {
  const char = event.key;

  // Permite teclas de navegação e controle
  const controlKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Tab",
    "Home",
    "End",
  ];
  if (controlKeys.includes(char)) {
    return true;
  }

  // Bloqueia combinações de teclas Ctrl/Cmd (exceto Ctrl+A para selecionar tudo)
  if ((event.ctrlKey || event.metaKey) && char !== "a" && char !== "A") {
    return false;
  }

  // Permite Enter para calcular
  if (char === "Enter") {
    event.preventDefault();
    document.querySelector(".btn-equals").click();
    return false;
  }

  // Permite apenas números e operadores matemáticos básicos
  const validChars = /^[0-9+\-*/.() ]$/;
  return validChars.test(char);
}

function validateInput(input) {
  const value = input.value;
  const cursorPosition = input.selectionStart;

  // Remove caracteres inválidos, mantendo apenas números, operadores básicos e funções Math
  let cleanValue = value.replace(/[^0-9+\-*/.()MathsqrtlogE ]/g, "");

  // Mantém funções Math completas
  cleanValue = cleanValue.replace(/Math\.sqrt\(/g, "Math.sqrt(");
  cleanValue = cleanValue.replace(/Math\.log10\(/g, "Math.log10(");
  cleanValue = cleanValue.replace(/Math\.log\(/g, "Math.log(");

  // Remove operadores duplicados consecutivos
  cleanValue = cleanValue.replace(/([+\-*/])\1+/g, "$1");

  if (cleanValue !== value) {
    input.value = cleanValue;
    // Tenta manter a posição do cursor
    const newCursorPos = Math.min(cursorPosition, cleanValue.length);
    input.setSelectionRange(newCursorPos, newCursorPos);
  }
}

function handlePaste(event) {
  event.preventDefault();
  const paste = (event.clipboardData || window.clipboardData).getData("text");

  // Filtra apenas caracteres matemáticos válidos do texto colado
  const validPaste = paste.replace(/[^0-9+\-*/.()]/g, "");

  if (validPaste) {
    const input = event.target;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const currentValue = input.value;

    // Insere o texto filtrado na posição atual do cursor
    input.value =
      currentValue.substring(0, start) +
      validPaste +
      currentValue.substring(end);

    // Move o cursor para após o texto inserido
    input.setSelectionRange(
      start + validPaste.length,
      start + validPaste.length
    );

    // Valida o input após colar
    validateInput(input);
  }

  return false;
}
