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
    //const doorValue = document.getElementById(`door${doorNumber}`).dataset.value;
    var label = `Labeldoor${doorNumber}`; //POR ELIMINAR
    document.getElementById(label).innerHTML = "YOU DOOR!"; //POR ELIMINAR
    OpenDoorAnimation(doorNumber, "src/SelectDoor.png");

    //DIALOGO DE ELECCION
    var dialogoMyDoor = document.getElementById("dialogo-presentador");
    dialogoMyDoor.innerHTML = "Has elegido la puerta Numero " + doorNumber;
    addNextButton(doorNumber);
    removeAllDoorClicks(); //Eliminar todos los event listeners de las puertas
}

function changeDoor(doorNumber, MontyDoor) {
    // Función para manejar el evento de clic en la puerta
    var dialogoMyDoor = document.getElementById("dialogo-presentador");
    dialogoMyDoor.innerHTML = "Abri la puerta " + MontyDoor + " No hay regalo. ¿Vas a cambiar de puerta?  ";
    // Crear el botón
        const changButton = document.createElement("button");
        changButton.textContent = "Cambio de Puerta";
        changButton.className = "chan-btn";
        ///-
        const keepButton = document.createElement("button");
        keepButton.textContent = "Mantener de Puerta";
        keepButton.className = "keep-btn";
    // TerminaBoton
        let cambiopuerta;
        let cambiopuertaValue;

        changButton.addEventListener("click", () => {
            //Buscar la puerta restante
            cambiopuerta = getRemainingDoor(doorNumber, MontyDoor); // Obtener la puerta restante
            cambiopuertaValue= document.getElementById(`door${cambiopuerta}`).dataset.value; // Obtener el valor de la puerta restante
            document.getElementById(`Labeldoor${cambiopuerta}`).innerHTML = "CAMBIO DE PUERTA!"; //POR ELIMINAR
            showDoors(doorNumber, MontyDoor, cambiopuerta, cambiopuertaValue); // Mostrar el resultado
            localStorage.setItem("Cambio", "Si");
        });
        //KeepButton
        keepButton.addEventListener("click", () => {
            // El usuario decide mantener su elección
            console.log("El usuario decidió mantener su elección.");
            cambiopuerta = doorNumber;
            cambiopuertaValue= document.getElementById(`door${cambiopuerta}`).dataset.value; // Obtener el valor de la puerta restante
            console.log(`Puerta final: ${cambiopuerta} debe ser igual a ${doorNumber}, Valor: ${cambiopuertaValue}, MontyDoor: ${MontyDoor}`);
            showDoors(doorNumber, MontyDoor, cambiopuerta, cambiopuertaValue); // Mostrar el resultado
            localStorage.setItem("Cambio", "No");
        });
        // Agregar el botón al dialogo
    document.getElementById("dialogo-presentador").appendChild(document.createElement("br")); // Salto de línea
    document.getElementById("dialogo-presentador").appendChild(changButton);
    document.getElementById("dialogo-presentador").appendChild(keepButton);
    // Aquí puedes agregar la lógica para cambiar de puerta
}

function showDoors(doorNumber, MontyDoor, cambiopuerta, cambiopuertaValue){
    // Mostrar el resultado
        if (cambiopuertaValue === "true") {
            YouWinOrLose(true);
            OpenDoorAnimation(cambiopuerta, "src/WinDoor.png");
            localStorageDoors(doorNumber, cambiopuertaValue);
        } else {
            YouWinOrLose(false);
            OpenDoorAnimation(cambiopuerta, "src/OpenDoor.png");
            OpenDoorAnimation(getRemainingDoor(cambiopuerta, MontyDoor), "src/WinDoor.png");
            const winningDoor = getRemainingDoor(cambiopuerta, MontyDoor); //Agregar la puerta ganadora
            document.getElementById(`Labeldoor${winningDoor}`).innerHTML = "PUERTA GANADORA!"; //POR ELIMINAR
            localStorageDoors(doorNumber, cambiopuertaValue);
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
        const label = `Labeldoor${MontyDoor}`; //POR ELIMINAR
        document.getElementById(label).innerHTML = "MONTY DOOR!"; //POR ELIMINAR
        console.log(`MONTY DOOR: Door ${MontyDoor}, Value: ${MontyValue}`);
        OpenDoorAnimation(MontyDoor, "src/OpenDoor.png");
        //DIALOGO DE ELECCION
        montyImgAnimation("src/MontyS.png"); // Cambiar la imagen de Monty
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
        document.getElementById(`Labeldoor${door}`).innerHTML = ""; // Limpiar las etiquetas //POR ELIMINAR
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
        montyImgAnimation("src/MontyL.png"); // Cambiar la imagen de Monty a la de perededor
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
    document.getElementById("dialogo-presentador").appendChild(document.createElement("br")); // Salto de línea
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
    document.getElementById("dialogo-presentador").appendChild(document.createElement("br")); // Salto de línea
    document.getElementById("dialogo-presentador").appendChild(nextButton);
}

function localStorageDoors(myDoor, cambiopuertaValue) {
    //localStorage.setItem("DoorSelect", myDoor);
    if (cambiopuertaValue === "true") {
        var result = "Gano";
        localStorage.setItem("Res", result);
    }else {
        var result = "Perdio";
        localStorage.setItem("Res", result);
    }
}


//TODO: Tabla de resultados de juego, Revisar tema de localStorage y sessionStorage.

//TODO: Preparacion para subir a github la primera aplicacion Publica.
//FIXME: Borrar y liempiar codigo comentado. Eliminar el label de la puerta seleccionada