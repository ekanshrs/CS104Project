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
            gameGrid[i][j] = { fielder: false, revealed: false, score: 0 };
        }
    }
    placeFielders(updatedSize);
    setScores(updatedSize);
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

function setScores(gridSize) {
    const updatedGridSize = parseInt(gridSize);
    if (updatedGridSize == 5) {
        placeScores(5, 4, 2, 2, 1, 5);
    }
    if (updatedGridSize == 6) {
        placeScores(10, 5, 4, 4, 2, 6);
    }
    if (updatedGridSize == 7) {
        placeScores(15, 9, 6, 5, 3, 7);
    }
    if (updatedGridSize == 8) {
        placeScores(23, 12, 8, 6, 4, 8);
    }
    if (updatedGridSize == 9) {
        placeScores(30, 15, 11, 8, 6, 9);
    }
    if (updatedGridSize == 10) {
        placeScores(38, 19, 12, 11, 9, 10);
    }
    if (updatedGridSize == 11) {
        placeScores(49, 21, 15, 14, 11, 11);
    }
    if (updatedGridSize == 12) {
        placeScores(60, 24, 18, 17, 14, 12);
    }
}
function placeScores(num1, num2, num3, num4, num6, gridSize) {
    const updatedGridSize = parseInt(gridSize);
    let num1c = parseInt(num1);
    let num2c = parseInt(num2);
    let num3c = parseInt(num3);
    let num4c = parseInt(num4);
    let num6c = parseInt(num6);
    while (num1c > 0) {
        const randomRow = Math.floor(Math.random() * updatedGridSize);
        const randomCol = Math.floor(Math.random() * updatedGridSize);
        // alert(randomRow + " " + randomCol + " " + gameGrid[randomRow][randomCol].fielder + " " + gameGrid[randomRow][randomCol].score)
        if (!gameGrid[randomRow][randomCol].fielder && parseInt(gameGrid[randomRow][randomCol].score) == 0) {
            // alert("this is reached")
            gameGrid[randomRow][randomCol].score = 1;
            num1c--;
            // alert(num1c)
        }
    }
    while (num2c > 0) {
        const randomRow = Math.floor(Math.random() * updatedGridSize);
        const randomCol = Math.floor(Math.random() * updatedGridSize);
        if (!gameGrid[randomRow][randomCol].fielder && gameGrid[randomRow][randomCol].score == 0) {
            gameGrid[randomRow][randomCol].score = 2;
            num2c--;
        }
    }
    while (num3c > 0) {
        const randomRow = Math.floor(Math.random() * updatedGridSize);
        const randomCol = Math.floor(Math.random() * updatedGridSize);
        if (!gameGrid[randomRow][randomCol].fielder && gameGrid[randomRow][randomCol].score == 0) {
            gameGrid[randomRow][randomCol].score = 3;
            num3c--;
        }
    }
    while (num4c > 0) {
        const randomRow = Math.floor(Math.random() * updatedGridSize);
        const randomCol = Math.floor(Math.random() * updatedGridSize);
        if (!gameGrid[randomRow][randomCol].fielder && gameGrid[randomRow][randomCol].score == 0) {
            gameGrid[randomRow][randomCol].score = 4;
            num4c--;
        }
    }
    while (num6c > 0) {
        const randomRow = Math.floor(Math.random() * updatedGridSize);
        const randomCol = Math.floor(Math.random() * updatedGridSize);
        if (!gameGrid[randomRow][randomCol].fielder && gameGrid[randomRow][randomCol].score == 0) {
            gameGrid[randomRow][randomCol].score = 6;
            num6c--;
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
        if (gameGrid[row][col].score == 1) {
            event.target.classList.add('text-background');
            event.target.textContent = '1';
        }
        if (gameGrid[row][col].score == 2) {
            event.target.classList.add('text-background');
            event.target.textContent = '2';
        }
        if (gameGrid[row][col].score == 3) {
            event.target.classList.add('text-background');
            event.target.textContent = '3';
        }
        if (gameGrid[row][col].score == 4) {
            event.target.classList.add('text-background');
            event.target.textContent = '4';
        }
        if (gameGrid[row][col].score == 6) {
            event.target.classList.add('text-background');
            event.target.textContent = '6';
        }
        increaseScore(gameGrid[row][col].score);
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
        if (gameGrid[row][col].score == 1) {
            block.classList.add('text-background');
            block.textContent = '1';  
        }
        if (gameGrid[row][col].score == 2) {
            block.classList.add('text-background');
            block.textContent = '2';
        }
        if (gameGrid[row][col].score == 3) {
            block.classList.add('text-background');
            block.textContent = '3';
        }
        if (gameGrid[row][col].score == 4) {
            block.classList.add('text-background');
            block.textContent = '4';
        }
        if (gameGrid[row][col].score == 6) {
            block.classList.add('text-background');
            block.textContent = '6';
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