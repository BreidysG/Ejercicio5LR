const startButton = document.getElementById('startButton');
const gameContainer = document.getElementById('gameContainer');
const timerElement = document.getElementById('timer');
const barraContainer = document.getElementById('barraContainer');
let interval;
let currentBar = 1;
const timeLimit = 120; // 2 minutes in seconds
let timeRemaining = timeLimit;

startButton.addEventListener('click', startGame);

function startGame() {
    const speed = parseInt(document.getElementById('speedInput').value);
    document.getElementById('container').style.display = 'none';
    gameContainer.style.display = 'block';
    startTimer();
    displayBars(currentBar);
    interval = setInterval(() => {
        currentBar++;
        if (currentBar > 5) currentBar = 1;
        displayBars(currentBar);
    }, speed);
}

function startTimer() {
    document.getElementById('timer').classList.remove('hidden');
    let timerInterval = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerElement.innerText = `Tiempo restante: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        timeRemaining--;
        if (timeRemaining < 0) {
            clearInterval(timerInterval);
            alert('Tiempo agotado');
            clearInterval(interval);
            resetGame();
        }
    }, 1000);
}

function displayBars(barNumber) {
    barraContainer.innerHTML = ''; // Limpiar contenedor

    const separations = [100, 200, 300, 400, 500]; // Distancia horizontal entre las barras
    const height = [100, 150, 200, 250, 300]; // Altura de las barras
    
    // Crear barra izquierda
    const leftBar = document.createElement('div');
    leftBar.classList.add('barra');
    leftBar.style.height = height[barNumber - 1] + 'px';
    leftBar.style.transform = `translateX(-${separations[barNumber - 1] / 2}px)`;

    // Crear número para la barra izquierda (parte superior e inferior)
    const topNumberLeft = document.createElement('div');
    topNumberLeft.classList.add('number');
    topNumberLeft.style.top = '-30px';
    topNumberLeft.innerText = barNumber;
    
    const bottomNumberLeft = document.createElement('div');
    bottomNumberLeft.classList.add('number');
    bottomNumberLeft.style.bottom = '-30px';
    bottomNumberLeft.innerText = barNumber;

    leftBar.appendChild(topNumberLeft);
    leftBar.appendChild(bottomNumberLeft);

    // Crear barra derecha
    const rightBar = document.createElement('div');
    rightBar.classList.add('barra');
    rightBar.style.height = height[barNumber - 1] + 'px';
    rightBar.style.transform = `translateX(${separations[barNumber - 1] / 2}px)`;

    // Crear número para la barra derecha (parte superior e inferior)
    const topNumberRight = document.createElement('div');
    topNumberRight.classList.add('number');
    topNumberRight.style.top = '-30px';
    topNumberRight.innerText = barNumber;

    const bottomNumberRight = document.createElement('div');
    bottomNumberRight.classList.add('number');
    bottomNumberRight.style.bottom = '-30px';
    bottomNumberRight.innerText = barNumber;

    rightBar.appendChild(topNumberRight);
    rightBar.appendChild(bottomNumberRight);

    // Añadir las barras al contenedor
    barraContainer.appendChild(leftBar);
    barraContainer.appendChild(rightBar);
}

function resetGame() {
    document.getElementById('container').style.display = 'block';
    gameContainer.style.display = 'none';
    timeRemaining = timeLimit;
    timerElement.innerText = 'Tiempo restante: 02:00';
    clearInterval(interval);
    currentBar = 1;
}


