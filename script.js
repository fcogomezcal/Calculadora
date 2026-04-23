let runningTotal = 0; // Variable para almacenar el total acumulado
let buffer = "0"; // Variable para almacenar el número actual que se está ingresando
let previousOperator; // Variable para almacenar el operador anterior

const screen = document.querySelector(".screen"); // Selecciona el elemento de la pantalla

function buttonClick(value) { 
    if (isNaN(value)) {
        handleSymbol(value); // Si el valor no es un número, maneja el símbolo
    } else {
        handleNumber(value); // Si el valor es un número, maneja el número
    }
    screen.innerText = buffer; // Actualiza la pantalla con el valor del buffer
 } // Función para manejar los clics en los botones

function handleSymbol(symbol) {
    switch (symbol) { 
        case "C":
            buffer = "0"; // Reinicia el buffer a "0"
            runningTotal = 0; // Reinicia el total acumulado a 0
            break;
        case "=":
            if (previousOperator === null) {
                return; // Si no hay un operador anterior, no hace nada
            }
            flushOperation(parseInt(buffer)); // Realiza la operación pendiente con el valor actual del buffer
            previousOperator = null; // Reinicia el operador anterior
            buffer = runningTotal; // Actualiza el buffer con el resultado del total acumulado
            runningTotal = 0; // Reinicia el total acumulado a 0
            break;
        case "←":
            if (buffer.length === 1) {
                buffer = "0"; // Si el buffer tiene un solo dígito, reinícialo a "0"
            } else {
                buffer = buffer.substring(0, buffer.length - 1); // Elimina el último dígito del buffer
            }
            break;
        case "+":
        case "−":
        case "×":
        case "÷":
            handleMath(symbol); // Maneja la operación matemática
            break;
    }
}

function handleMath(symbol) { 
    if (buffer === "0") { 
        return; // Si el buffer es "0", no hace nada
    }

    const intBuffer = parseInt(buffer); // Convierte el buffer a un número flotante

    if (runningTotal === 0) {
        runningTotal = intBuffer; // Si el total acumulado es 0, asigna el valor del buffer al total acumulado
    } else {
        flushOperation(intBuffer); // Realiza la operación pendiente con el valor actual del buffer
    }
    previousOperator = symbol; // Actualiza el operador anterior con el símbolo actual
    buffer = "0"; // Reinicia el buffer a "0" para ingresar el siguiente número
}

function flushOperation(intBuffer) { 
    if (previousOperator === "+") {
        runningTotal += intBuffer; // Suma el valor del buffer al total acumulado
    } else if (previousOperator === "−") {
        runningTotal -= intBuffer; // Resta el valor del buffer al total acumulado
    } else if (previousOperator === "×") {
        runningTotal *= intBuffer; // Multiplica el total acumulado por el valor del buffer
    } else if (previousOperator === "÷") {
        runningTotal /= intBuffer; // Divide el total acumulado por el valor del buffer
    }
}

function handleNumber(numberString) { 
    if (buffer === "0") {
        buffer = numberString; // Si el buffer es "0", reemplázalo con el número ingresado
    } else {
        buffer += numberString; // Si el buffer no es "0", concatena el número ingresado al buffer
    }
}

function init() {
    document.querySelector(".calc-buttons").addEventListener("click", function(event) {
        buttonClick(event.target.innerText); // Agrega un evento de clic a los botones de la calculadora
    });
}

init(); // Inicializa la calculadora al cargar la página