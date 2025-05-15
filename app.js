// app.js
function door1Handler() { handleDoorClick(1); }
function door2Handler() { handleDoorClick(2); }
function door3Handler() { handleDoorClick(3); }

document.addEventListener("DOMContentLoaded", () => {
    const door1 = document.getElementById("door1");
    const door2 = document.getElementById("door2");
    const door3 = document.getElementById("door3");

    // Asignar valores aleatorios a las puertas
    const doors = [door1, door2, door3];
    const values = [true, false, false].sort(() => Math.random() - 0.5); // Mezclar los valores para que estén en orden aleatorio

    // Asignar el valor a cada puerta
    doors.forEach((door, index) => {
        door.dataset.value = values[index]; // Usar dataset para almacenar el valor
    });
    console.log(values);

    // Agregar eventos usando funciones nombradas
    door1.addEventListener("click", door1Handler);
    door2.addEventListener("click", door2Handler);
    door3.addEventListener("click", door3Handler);

});

function removeAllDoorClicks() {
    const door1 = document.getElementById("door1");
    const door2 = document.getElementById("door2");
    const door3 = document.getElementById("door3");
    door1.removeEventListener("click", door1Handler);
    door2.removeEventListener("click", door2Handler);
    door3.removeEventListener("click", door3Handler);
}

function handleDoorClick(doorNumber) {
    const doorValue = document.getElementById(`door${doorNumber}`).dataset.value;
    var label = `Labeldoor${doorNumber}`;
    document.getElementById(label).innerHTML = "YOU DOOR!";
    alert(`You clicked on door ${doorNumber}`);
    OpenDoorAnimation(doorNumber, "src/SelectDoor.png");

    //Eventlistener para la puerta seleccionada
    removeAllDoorClicks(); // Eliminar todos los event listeners de las puertas

    // Llamar a la función para seleccionar una puerta no elegida
    var MontyDoor = montyDoorSelect(doorNumber); 
    
    setTimeout(() => {
        const MyChoice = confirm(`MONTY quiere saber si quieres cambiar de puerta o mantener tu eleccion en la puerta ${doorNumber}. Preciona 'Aceptar' para cambiar de puerta o 'Cancelar' para mantener tu eleccion`); // Cambiar el nombre de la variable a algo más descriptivo
        let cambiopuerta; 
        let cambiopuertaValue;

        if (MyChoice) {
            //Buscar la puerta restante
            cambiopuerta = getRemainingDoor(doorNumber, MontyDoor); // Obtener la puerta restante
            cambiopuertaValue= document.getElementById(`door${cambiopuerta}`).dataset.value; // Obtener el valor de la puerta restante
            document.getElementById(`Labeldoor${cambiopuerta}`).innerHTML = "CAMBIO DE PUERTA!";
        }else {
            // El usuario decide mantener su elección
            console.log("El usuario decidió mantener su elección.");
            cambiopuerta = doorNumber;
        }
        // Obtener el valor de la puerta final
        cambiopuertaValue = document.getElementById(`door${cambiopuerta}`).dataset.value;
        console.log(`Puerta final: ${cambiopuerta}, Valor: ${cambiopuertaValue}`);

        // Mostrar el resultado
        if (cambiopuertaValue === "true") {
            YouWinOrLose(true);
            OpenDoorAnimation(cambiopuerta, "src/WinDoor.png");
        } else {
            YouWinOrLose(false);
            OpenDoorAnimation(cambiopuerta, "src/OpenDoor.png");
            OpenDoorAnimation(getRemainingDoor(doorNumber, MontyDoor), "src/WinDoor.png");
            document.getElementById(`Labeldoor${getRemainingDoor(doorNumber, MontyDoor)}`).innerHTML = "PUERTA GANADORA!";
        }
       // document.body.appendChild(resultElement); // Agregar el elemento al final del <body>

        // Agregar el botón de reinicio
        addResetButton();

    }, 1000); // Espera 2 segundos (2000 ms) antes de ejecutar el código

    console.log(`YOU DOOR: ${doorNumber}, ${document.getElementById(`door${doorNumber}`).dataset.value}`);
}

function montyDoorSelect(doorNumber) {
    const doors = [1, 2, 3];
    const unchosenDoors = doors.filter(door => door !== doorNumber); // Filtrar las puertas no seleccionadas

    let MontyDoor;
    let MontyValue;

    // Buscar una puerta no seleccionada cuyo valor no sea "true"
    for (let i = 0; i < unchosenDoors.length; i++) {
        const currentDoor = unchosenDoors[i];
        const currentValue = document.getElementById(`door${currentDoor}`).dataset.value;

        if (currentValue !== "true") {
            MontyDoor = currentDoor;
            MontyValue = currentValue;
            break;
        }
    }

    if (MontyDoor) {
        const label = `Labeldoor${MontyDoor}`;
        document.getElementById(label).innerHTML = "MONTY DOOR!";
        console.log(`MONTY DOOR: Door ${MontyDoor}, Value: ${MontyValue}`);
        OpenDoorAnimation(MontyDoor, "src/OpenDoor.png");
        alert(`Monty abrio la puerta numero ${MontyDoor} donde no hay premio`);
        return MontyDoor; // Retornar la puerta de Monty
    }
}

function getRemainingDoor(doorNumber, MontyDoor) {
    const doors = [1, 2, 3]; // Todas las puertas disponibles
    const remainingDoor = doors.find(door => door !== doorNumber && door !== MontyDoor); // Filtrar la puerta restante
    return remainingDoor;
}

function resetgame() {
    // Reiniciar el juego
    const doors = [1, 2, 3];
    const values = ["true", "false", "false"].sort(() => Math.random() - 0.5);
    console.log(values);
    doors.forEach((door, index) => {
        const doorElement = document.getElementById(`door${door}`);
        doorElement.dataset.value = values[index]; // Asignar el valor mezclado
        document.getElementById(`Labeldoor${door}`).innerHTML = ""; // Limpiar las etiquetas
        OpenDoorAnimation(door, "src/Closedoor.png");
    });
    const resultElement = document.getElementById("WinOrLose");
    if (resultElement) {
        resultElement.remove();
    }
}

function YouWinOrLose(WinOrLose) {
    // Mostrar el resultado
    const resultElement = document.createElement("h2"); // Crear un nuevo elemento <h2>
    resultElement.id = "WinOrLose"; // Asignar un ID al elemento
    if (WinOrLose) {
        resultElement.textContent = "YOU WIN!"; // Establecer el texto
        resultElement.style.color = "green"; // Opcional: Estilo para el texto
        document.body.appendChild(resultElement); // Agregar el elemento al final del <body>
    } else {
        resultElement.textContent = "YOU LOSE!"; // Establecer el texto
        resultElement.style.color = "red"; // Opcional: Estilo para el texto
        document.body.appendChild(resultElement); // Agregar el elemento al final del <body>
    }   
}

function addResetButton() {
    // Crear el botón
    const resetButton = document.createElement("button");
    resetButton.textContent = "Reiniciar Juego"; // Texto del botón
    resetButton.style.marginTop = "20px"; // Opcional: Estilo para el botón
    resetButton.style.padding = "10px 20px";
    resetButton.style.fontSize = "16px";
    // Agregar el evento click al botón
    resetButton.addEventListener("click", () => {
        resetgame(); // Llamar a la función resetgame
        resetButton.remove(); // Eliminar el botón después de ejecutarse
        //-
        door1.addEventListener("click", door1Handler);
        door2.addEventListener("click", door2Handler);
        door3.addEventListener("click", door3Handler);

    });

    // Agregar el botón al final del <body>
    document.body.appendChild(resetButton);
}

function OpenDoorAnimation(doorNumber, newImageSrc) {
    const doorImg = document.getElementById(`door${doorNumber}`);
    if (doorImg) {
        doorImg.src = newImageSrc;
    }
    // Para abrir la puerta 2 y mostrar la imagen "OpenDoor.png"
    //OpenDoorAnimation(2, "src/OpenDoor.png");
}


//TODO: Tabla de resultados de juego

//TODO: Borrar comentarios innecesarios

//TODO: Diseño de pagina web

//TODO: Preparacion para subir a github la primera aplicacion Publica.