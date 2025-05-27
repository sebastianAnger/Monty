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
    //alert(`You clicked on door ${doorNumber}`);
    OpenDoorAnimation(doorNumber, "src/SelectDoor.png");

    //DIALOGO DE ELECCION
    var dialogoMyDoor = document.getElementById("dialogo-presentador");
    dialogoMyDoor.innerHTML = "Has elegido la puerta " + doorNumber + " y el valor es: " + doorValue;
    addNextButton(doorNumber);

    //Eventlistener para la puerta seleccionada - Eliminar todos los event listeners de las puertas
    removeAllDoorClicks();

    //FIXME:Corregir Errores por animacion y logica del programa
    //FIXME:Cambiar puerta de seleccion algo  mejor
    //FIXME: Borrar y liempiar codigo comentado
    // Llamar a la función para seleccionar una puerta no elegida
    //var MontyDoor = addNextButton(doorNumber);
/* #region Antiguio SETTimeout
#region Antiguio SETTimeout
    setTimeout(() => {
        // Mostrar el diálogo de elección
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
        //console.log(`Valor de cambiopuertavalue obtenido: ${cambiopuertaValue}`);
        console.log(`Puerta final: ${cambiopuerta}, Valor: ${cambiopuertaValue}`);

        // Mostrar el resultado
        if (cambiopuertaValue === "true") {
            YouWinOrLose(true);
            OpenDoorAnimation(cambiopuerta, "src/WinDoor.png");
        } else {
            YouWinOrLose(false);
            OpenDoorAnimation(cambiopuerta, "src/OpenDoor.png");
            OpenDoorAnimation(getRemainingDoor(cambiopuerta, MontyDoor), "src/WinDoor.png");
            const winningDoor = getRemainingDoor(cambiopuerta, MontyDoor); //Agregar la puerta ganadora
            document.getElementById(`Labeldoor${winningDoor}`).innerHTML = "PUERTA GANADORA!";
        }
        // Agregar el botón de reinicio
        addResetButton();
    }, 5000); // Espera 2 segundos (2000 ms) antes de ejecutar el código

    console.log(`YOU DOOR: ${doorNumber}, ${document.getElementById(`door${doorNumber}`).dataset.value}`);
#endregion    */
}

function changeDoor(doorNumber, MontyDoor) {
    // Función para manejar el evento de clic en la puerta
    //DIALOGO DE ELECCION
    var dialogoMyDoor = document.getElementById("dialogo-presentador");
    dialogoMyDoor.innerHTML = "Vas a cambiar de puerta?";
//#region Creacion de Botones
    // Crear el botón
        const changButton = document.createElement("button");
        changButton.textContent = "Cambio de Puerta";
        changButton.className = "chan-btn";
        ///-
        const keepButton = document.createElement("button");
        keepButton.textContent = "Mantener de Puerta";
        keepButton.className = "keep-btn";
    // TerminaBoton
//#endregion
        let cambiopuerta;
        let cambiopuertaValue;

        changButton.addEventListener("click", () => {
            //Buscar la puerta restante
            cambiopuerta = getRemainingDoor(doorNumber, MontyDoor); // Obtener la puerta restante
            cambiopuertaValue= document.getElementById(`door${cambiopuerta}`).dataset.value; // Obtener el valor de la puerta restante
            document.getElementById(`Labeldoor${cambiopuerta}`).innerHTML = "CAMBIO DE PUERTA!";
            showDoors(doorNumber, MontyDoor, cambiopuerta, cambiopuertaValue); // Mostrar el resultado
        });
        //KeepButton
        keepButton.addEventListener("click", () => {
            // El usuario decide mantener su elección
            console.log("El usuario decidió mantener su elección.");
            cambiopuerta = doorNumber;
            showDoors(doorNumber, MontyDoor, cambiopuerta, cambiopuertaValue); // Mostrar el resultado
        });
        // Agregar el botón al dialogo
    document.getElementById("dialogo-presentador").appendChild(changButton);
    document.getElementById("dialogo-presentador").appendChild(keepButton);
    // Aquí puedes agregar la lógica para cambiar de puerta
}

function showDoors(doorNumber, MontyDoor, cambiopuerta, cambiopuertaValue){
    // Mostrar el resultado
        if (cambiopuertaValue === "true") {
            YouWinOrLose(true);
            OpenDoorAnimation(cambiopuerta, "src/WinDoor.png");
        } else {
            YouWinOrLose(false);
            OpenDoorAnimation(cambiopuerta, "src/OpenDoor.png");
            OpenDoorAnimation(getRemainingDoor(cambiopuerta, MontyDoor), "src/WinDoor.png");
            const winningDoor = getRemainingDoor(cambiopuerta, MontyDoor); //Agregar la puerta ganadora
            document.getElementById(`Labeldoor${winningDoor}`).innerHTML = "PUERTA GANADORA!";
        }
        // Agregar el botón de reinicio
        addResetButton();
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
        //alert(`Monty abrio la puerta numero ${MontyDoor} donde no hay premio`);
        //DIALOGO DE ELECCION
        montyImgAnimation("src/MontyS.png"); // Cambiar la imagen de Monty
        var dialogoMyDoor = document.getElementById("dialogo-presentador");
        dialogoMyDoor.innerHTML = "Abri la puerta " + MontyDoor + " y el valor es: " + MontyValue + " No hay regalo, pero puedes cambiar tu eleccion";
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
        montyImgAnimation("src/MontyH.png"); // Cambiar la imagen de Monty a la de inicio
        document.getElementById("dialogo-presentador").innerHTML = "“¡Hola! Escoge una puerta y mira si ganas el auto. ¡Pero cuidado! Tal vez quieras cambiar tu elección...”"; // Limpiar el mensaje del presentador  
    });
}

function YouWinOrLose(WinOrLose) {
    // Mostrar el resultado
    const resultElement = document.getElementById("dialogo-presentador");
    if (WinOrLose) {
        resultElement.textContent = "FELICIDADES GANASTE!          Puedes reiniciar el juego";
        montyImgAnimation("src/MontyW.png"); // Cambiar la imagen de Monty a la de ganador
    } else {
        resultElement.textContent = "LOSIENTO PERDISTE!          Puedes reiniciar el juego     ";
    }
}

function addResetButton() {
    // Crear el botón
    const resetButton = document.createElement("button");
    resetButton.textContent = "Reiniciar Juego";
    resetButton.className = "reset-btn";

    resetButton.addEventListener("click", () => {
        resetgame(); // Llamar a la función resetgame
        resetButton.remove(); // Eliminar el botón después de ejecutarse
        //Habilitar nuevamente los event listeners de las puertas
        door1.addEventListener("click", door1Handler);
        door2.addEventListener("click", door2Handler);
        door3.addEventListener("click", door3Handler);

    });
    // Agregar el botón al dialogo
    document.getElementById("dialogo-presentador").appendChild(resetButton);
}

function OpenDoorAnimation(doorNumber, newImageSrc) {
    const doorImg = document.getElementById(`door${doorNumber}`);
    if (doorImg) {
        doorImg.src = newImageSrc;
    }
}

function montyImgAnimation(newImageSrc) {
    const MontyImg = document.getElementById("MontyImg");
    if (MontyImg) {
        MontyImg.src = newImageSrc;
    }
}

function addNextButton(doorNumber){
    // Crear el botón
        const nextButton = document.createElement("button");
        nextButton.textContent = "Siguiente";
        nextButton.className = "next-btn";

        nextButton.addEventListener("click", () => {
            const MontyDoor = montyDoorSelect(doorNumber); // Obtener la puerta de Monty
            console.log(`MontyDoorBOTON: ${MontyDoor}`);
            changeDoor(doorNumber, MontyDoor); // Llamar a la función para cambiar de puerta
            //return m1; // Retornar la puerta de Monty
        });
        // Agregar el botón al dialogo
    document.getElementById("dialogo-presentador").appendChild(nextButton);
}


//TODO: Tabla de resultados de juego

//TODO: Preparacion para subir a github la primera aplicacion Publica.