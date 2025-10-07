function door1Handler() { handleDoorClick(1); }
function door2Handler() { handleDoorClick(2); }
function door3Handler() { handleDoorClick(3); }
localStorage.clear();

document.addEventListener("DOMContentLoaded", () => {
    const door1 = document.getElementById("door1");
    const door2 = document.getElementById("door2");
    const door3 = document.getElementById("door3");

    // Asignar valores aleatorios a las puertas / mezclador
    const doors = [door1, door2, door3];
    const values = [true, false, false].sort(() => Math.random() - 0.5);

    // Asignar el valor a cada puerta
    doors.forEach((door, index) => {
        door.dataset.value = values[index];
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
        showDoors(doorNumber, MontyDoor, cambiopuerta, cambiopuertaValue); // Mostrar el resultado
    });
    //KeepButton
    keepButton.addEventListener("click", () => {
        // El usuario decide mantener su elección
        cambiopuerta = doorNumber;
        cambiopuertaValue= document.getElementById(`door${cambiopuerta}`).dataset.value; // Obtener el valor de la puerta restante
        showDoors(doorNumber, MontyDoor, cambiopuerta, cambiopuertaValue); // Mostrar el resultado
    });

    // Agregar el botón al dialogo
    document.getElementById("dialogo-presentador").appendChild(document.createElement("br")); // Salto de línea
    document.getElementById("dialogo-presentador").appendChild(changButton);
    document.getElementById("dialogo-presentador").appendChild(keepButton);
}

function showDoors(doorNumber, MontyDoor, cambiopuerta, cambiopuertaValue){
    // Mostrar el resultado
    if (cambiopuertaValue === "true") {
        YouWinOrLose(true);
        OpenDoorAnimation(cambiopuerta, "src/WinDoor.png");
        localStorageDoors(doorNumber, cambiopuerta, cambiopuertaValue);
        mostrarlista(); // Mostrar la lista de resultados
    } else {
        YouWinOrLose(false);
        OpenDoorAnimation(cambiopuerta, "src/OpenDoor.png");
        OpenDoorAnimation(getRemainingDoor(cambiopuerta, MontyDoor), "src/WinDoor.png");
        const winningDoor = getRemainingDoor(cambiopuerta, MontyDoor); //Agregar la puerta ganadora
        localStorageDoors(doorNumber, cambiopuerta, cambiopuertaValue);
        mostrarlista(); // Mostrar la lista de resultados
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
    document.getElementById("dialogo-presentador").appendChild(document.createElement("br"));
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
        });
        // Agregar el botón al dialogo
    document.getElementById("dialogo-presentador").appendChild(document.createElement("br")); // Salto de línea
    document.getElementById("dialogo-presentador").appendChild(nextButton);
}

function mostrarlista(){
    const localdatos = traerDatos(); // Traer los datos del localStorage
    const tbody = document.querySelector("#listaResultados tbody");
    tbody.innerHTML = "";
    localdatos.forEach((datos, idx) => {
        crealista({ ...datos, index: idx + 1 }, tbody);
    });
}

function crealista(datos, tbody) {
    const fila = document.createElement("tr");
    fila.innerHTML = `<td>${datos.index}</td><td>${datos.puertaElegida}</td><td>${datos.cambiopuerta}</td><td class="${datos.valorPuertaElegida}">${datos.valorPuertaElegida}</td>`;
    tbody.appendChild(fila);
}

function localStorageDoors(myDoor, cambiopuerta, cambiopuertaValue) {
    if(myDoor === cambiopuerta){
        cambiopuerta = "No";
    }else{cambiopuerta = "Si";}

    if(cambiopuertaValue === "true"){
        cambiopuertaValue = "Gano";
    }else{cambiopuertaValue = "Perdio";}
    const localdatos = traerDatos(); // Traer los datos del localStorage
    localdatos.push({
        puertaElegida: myDoor,
        cambiopuerta: cambiopuerta,
        valorPuertaElegida: cambiopuertaValue
    }); // Agregar la puerta elegida y su valor al array
    localStorage.setItem("Resultados", JSON.stringify(localdatos)); // Guardar la puerta elegida por el usuario
}

function traerDatos() {
    let resultados;
    try {
        const data = localStorage.getItem('Resultados');
        resultados = data ? JSON.parse(data) : [];
        if (!Array.isArray(resultados)) {
            resultados = [];
        }
    } catch (e) {
        resultados = [];
    }
    return resultados;
}