// Game configuration
const fieldersCount = 11;
const runScore = 1;

let gameGrid;
let score;
let fieldersRemaining;
let isGameOver;

// Initialize the game
function initializeGame(updatedGridSize) {
    const updatedSize = parseInt(updatedGridSize);
    // Check if the entered grid size is valid
    if (isNaN(updatedSize) || updatedSize < 5 || updatedSize > 12) {
        alert('Please enter a number between 6 and 11.');
        return;
    }
    gameGrid = [];
    score = 0;
    fieldersRemaining = fieldersCount;
    isGameOver = false;
    const gameGridElement = document.getElementById('game-grid');
    gameGridElement.innerHTML = '';
    gameGridElement.style.gridTemplateColumns = `repeat(${updatedGridSize}, 50px)`;

    for (let i = 0; i < updatedSize; i++) {
        gameGrid[i] = [];
        for (let j = 0; j < updatedSize; j++) {
            const block = document.createElement('div');
            block.classList.add('block');
            block.dataset.row = i;
            block.dataset.col = j;
            block.addEventListener('click', blockClickHandler);
            gameGridElement.appendChild(block);
            gameGrid[i][j] = { fielder: false, revealed: false };
        }
    }
    placeFielders(updatedSize);
    document.getElementById('start-page').style.display = 'none';
    document.getElementById('game-page').style.display = 'block';
}

// Place fielders randomly on the grid
function placeFielders(updatedSize) {
    let fieldersToPlace = fieldersCount;

    while (fieldersToPlace > 0) {
        const randomRow = Math.floor(Math.random() * updatedSize);
        const randomCol = Math.floor(Math.random() * updatedSize);

        if (!gameGrid[randomRow][randomCol].fielder) {
            gameGrid[randomRow][randomCol].fielder = true;
            fieldersToPlace--;
        }
    }
}

// Click event handler for game blocks
function blockClickHandler(event) {
    if (isGameOver) return;

    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    if (gameGrid[row][col].fielder) {
        endGame();
    }
    else {
        gameGrid[row][col].revealed = true;
        event.target.style.backgroundColor = 'white';
        increaseScore(runScore);
    }
}

// Increase the score and update the score display
function increaseScore(points) {
    score += points;
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${score}`;
}

// End the game and display the final score
function endGame() {
    isGameOver = true;
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Game Over! Final Score: ${score}`;

    const gameGridElement = document.getElementById('game-grid');
    const blocks = gameGridElement.getElementsByClassName('block');
    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        const row = block.dataset.row;
        const col = block.dataset.col;
        if (gameGrid[row][col].fielder) {
            block.dataset.fielder = true;
        }
    }
}

// Start the game
function startGame(gridSize) {
    const updatedGridSize = parseInt(gridSize);
    const startButton = document.getElementById('start-button');
    startButton.removeEventListener('click', startFormSubmit);
    startButton.disabled = true;
    initializeGame(updatedGridSize);
}

function startFormSubmit(event) {
    event.preventDefault();
    const gridSizeInput = document.getElementById('grid-size');
    const gridSize = parseInt(gridSizeInput.value);
    startGame(gridSize);
}

// Event listener for the form submission
const startForm = document.getElementById('start-form');
startForm.addEventListener('submit', startFormSubmit);