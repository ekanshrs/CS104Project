// Game configuration
const fieldersCount = 11;
const fieldersBox = 5;

let gameGrid;
let score;
let fieldersRemaining;
let isGameOver;
let prevRow;
let prevCol;
let rowCopy;
let colCopy;
let counter;
counter = 0;
let counterBox;
counterBox = 0;
// Event listener for the form submission
const startForm = document.getElementById('start-form');
const gameModeSelect = document.getElementById('game-mode');
startForm.addEventListener('submit', startFormSubmit);

function startFormSubmit(event) {
    // alert("start form submit works")
    event.preventDefault();
    const gridSizeInput = document.getElementById('grid-size');
    const gridSize = parseInt(gridSizeInput.value);
    const gameMode = gameModeSelect.value;
    startGame(gridSize, gameMode);
}

// Start the game
function startGame(gridSize, gameMode) {
    const updatedGridSize = parseInt(gridSize);
    const startButton = document.getElementById('start-button');
    startButton.removeEventListener('click', startFormSubmit);
    startButton.disabled = true;
    initializeGame(updatedGridSize, gameMode);
}

// Initialize the game
function initializeGame(gridSize, gameMode) {
    const updatedSize = parseInt(gridSize);
    const updatedGameMode = gameMode;
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
    gameGridElement.style.gridTemplateColumns = `repeat(${gridSize}, 50px)`;

    for (let i = 0; i < updatedSize; i++) {
        gameGrid[i] = [];
        for (let j = 0; j < updatedSize; j++) {
            const block = document.createElement('div');
            block.classList.add('block');
            block.dataset.row = i;
            block.dataset.col = j;
            block.addEventListener('click', blockClickHandler);
            gameGridElement.appendChild(block);
            gameGrid[i][j] = {
                fielder: false,
                revealed: false,
                score: 0,
                noball: false,
                wide: false,
                dot: false
            };
        }
    }
    placeFielders(updatedSize, updatedGameMode);
    setScores(updatedSize, updatedGameMode);
    document.getElementById('start-page').style.display = 'none';
    document.getElementById('game-page').style.display = 'block';
}

// Place fielders randomly on the grid
function placeFielders(updatedSize, updatedGameMode) {
    const gameMode = updatedGameMode;
    if (gameMode === "basic" || gameMode === "extras") {
        let fieldersToPlace = fieldersCount;
        while (fieldersToPlace > 0) {
            const randomRow = Math.floor(Math.random() * updatedSize);
            const randomCol = Math.floor(Math.random() * updatedSize);
            if (!gameGrid[randomRow][randomCol].fielder) {
                gameGrid[randomRow][randomCol].fielder = true;
                // alert(randomRow + " " + randomCol)       
                fieldersToPlace--;
            }
        }
    }
    else if (gameMode === "boxcricket") {
        let fieldersToPlace = fieldersBox;
        while (fieldersToPlace > 0) {
            const randomRow = Math.floor(Math.random() * updatedSize);
            const randomCol = Math.floor(Math.random() * updatedSize);
            if (!gameGrid[randomRow][randomCol].fielder) {
                gameGrid[randomRow][randomCol].fielder = true;
                // alert(randomRow + " " + randomCol)
                fieldersToPlace--;
            }
        }
    }
}

function setScores(gridSize, updatedGameMode) {
    const gameMode = updatedGameMode;
    if (gameMode === "basic") {
        const updatedGridSize = parseInt(gridSize);
        if (updatedGridSize == 5) {
            placeScores(0, 5, 4, 2, 2, 1, 0, 0, 0, 5);
        }
        if (updatedGridSize == 6) {
            placeScores(0, 10, 5, 4, 4, 2, 0, 0, 0, 6);
        }
        if (updatedGridSize == 7) {
            placeScores(0, 15, 9, 6, 5, 3, 0, 0, 0, 7);
        }
        if (updatedGridSize == 8) {
            placeScores(0, 23, 12, 8, 6, 4, 0, 0, 0, 8);
        }
        if (updatedGridSize == 9) {
            placeScores(0, 30, 15, 11, 8, 6, 0, 0, 0, 9);
        }
        if (updatedGridSize == 10) {
            placeScores(0, 38, 19, 12, 11, 9, 0, 0, 0, 10);
        }
        if (updatedGridSize == 11) {
            placeScores(0, 49, 21, 15, 14, 11, 0, 0, 0, 11);
        }
        if (updatedGridSize == 12) {
            placeScores(0, 60, 24, 18, 17, 14, 0, 0, 0, 12);
        }
    }
    if (gameMode === "extras") {
        const updatedGridSize = parseInt(gridSize);
        if (updatedGridSize == 5) {
            placeScores(0, 5, 4, 2, 2, 1, 2, 1, 0, 5);
        }
        if (updatedGridSize == 6) {
            placeScores(0, 10, 5, 4, 4, 2, 3, 2, 0, 6);
        }
        if (updatedGridSize == 7) {
            placeScores(0, 15, 9, 6, 5, 3, 4, 3, 0, 7);
        }
        if (updatedGridSize == 8) {
            placeScores(0, 23, 12, 8, 6, 4, 5, 4, 0, 8);
        }
        if (updatedGridSize == 9) {
            placeScores(0, 30, 15, 11, 8, 6, 7, 4, 0, 9);
        }
        if (updatedGridSize == 10) {
            placeScores(0, 38, 19, 12, 11, 9, 8, 5, 0, 10);
        }
        if (updatedGridSize == 11) {
            placeScores(0, 49, 21, 15, 14, 11, 10, 5, 0, 11);
        }
        if (updatedGridSize == 12) {
            placeScores(0, 60, 24, 18, 17, 14, 11, 5, 0, 12);
        }
    }
    if (gameMode === "boxcricket") {
        const updatedGridSize = parseInt(gridSize);
        if (updatedGridSize == 5) {
            placeScores(0, 6, 5, 0, 0, 0, 0, 0, 9, 5);
        }
        if (updatedGridSize == 6) {
            placeScores(0, 12, 6, 0, 0, 0, 0, 0, 13, 6);
        }
        if (updatedGridSize == 7) {
            placeScores(0, 18, 9, 0, 0, 0, 0, 0, 17, 7);
        }
        if (updatedGridSize == 8) {
            placeScores(0, 23, 12, 0, 0, 0, 0, 0, 24, 8);
        }
        if (updatedGridSize == 9) {
            placeScores(0, 30, 15, 0, 0, 0, 0, 0, 31, 9);
        }
        if (updatedGridSize == 10) {
            placeScores(0, 38, 19, 0, 0, 0, 0, 0, 38, 10);
        }
        if (updatedGridSize == 11) {
            placeScores(0, 49, 21, 0, 0, 0, 0, 0, 46, 11);
        }
        if (updatedGridSize == 12) {
            placeScores(0, 60, 24, 0, 0, 0, 0, 0, 55, 12);
        }
    }
}

function placeScores(num0, num1, num2, num3, num4, num6, num_wide, num_noball, num_dot, gridSize) {
    const updatedGridSize = parseInt(gridSize);
    let num0c = parseInt(num0);
    let num1c = parseInt(num1);
    let num2c = parseInt(num2);
    let num3c = parseInt(num3);
    let num4c = parseInt(num4);
    let num6c = parseInt(num6);
    let num_widec = parseInt(num_wide);
    let num_noballc = parseInt(num_noball);
    let num_dotc = parseInt(num_dot);
    while (num0c > 0) {
        const randomRow = Math.floor(Math.random() * updatedGridSize);
        const randomCol = Math.floor(Math.random() * updatedGridSize);
        if (!gameGrid[randomRow][randomCol].fielder && parseInt(gameGrid[randomRow][randomCol].score) == 0) {
            gameGrid[randomRow][randomCol].score = 0;
            num0c--;
        }
    }
    while (num1c > 0) {
        const randomRow = Math.floor(Math.random() * updatedGridSize);
        const randomCol = Math.floor(Math.random() * updatedGridSize);
        if (!gameGrid[randomRow][randomCol].fielder && parseInt(gameGrid[randomRow][randomCol].score) == 0) {
            gameGrid[randomRow][randomCol].score = 1;
            num1c--;
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
    while (num_widec > 0) {
        const randomRow = Math.floor(Math.random() * updatedGridSize);
        const randomCol = Math.floor(Math.random() * updatedGridSize);
        if (!gameGrid[randomRow][randomCol].fielder && !gameGrid[randomRow][randomCol].noball && !gameGrid[randomRow][randomCol].wide) {
            gameGrid[randomRow][randomCol].wide = true;
            // alert("Wide - " + randomRow + " " + randomCol)
            num_widec--;
        }
    }
    while (num_noballc > 0) {
        const randomRow = Math.floor(Math.random() * updatedGridSize);
        const randomCol = Math.floor(Math.random() * updatedGridSize);
        if (!gameGrid[randomRow][randomCol].fielder && !gameGrid[randomRow][randomCol].wide && !gameGrid[randomRow][randomCol].noball) {
            gameGrid[randomRow][randomCol].noball = true;
            // alert("No Ball - " + randomRow + " " + randomCol)
            num_noballc--;
        }
    }
    while (num_dotc > 0) {
        const randomRow = Math.floor(Math.random() * updatedGridSize);
        const randomCol = Math.floor(Math.random() * updatedGridSize);
        if (!gameGrid[randomRow][randomCol].fielder && gameGrid[randomRow][randomCol].score == 0 && !gameGrid[randomRow][randomCol].dot) {
            gameGrid[randomRow][randomCol].dot = true;
            alert("Dot - " + randomRow + " " + randomCol)
            num_dotc--;
        }
    }
}

// Click event handler for game blocks
function blockClickHandler(event) {
    if (isGameOver) return;

    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    if (!gameGrid[row][col].revealed) {
        // alert("The value of counter is " + counter)
        if (counter == 0) {
            rowCopy = row;
            colCopy = col;
            // alert("The copy is being made " + rowCopy + " " + colCopy + " " + row  + " " + col)
        }
        else if (counter > 0) {
            prevRow = rowCopy;
            prevCol = colCopy;
            rowCopy = row;
            colCopy = col;
            // alert("the prev row is " + prevRow + " the prev col is " + prevCol)
        }
        counter++;
        if (gameGrid[row][col].fielder && !gameGrid[prevRow][prevCol].noball) {
            // alert("fielder - " + gameGrid[row][col].fielder + " Prev noball - " + gameGrid[prevRow][prevCol].noball)
            // alert("prev ball didnt have no ball and this ball had fielder")
            endGame();
        }
        else if (gameGrid[row][col].fielder && gameGrid[prevRow][prevCol].noball) {
            // alert("prev ball did have no ball and this ball had fielder")
            // alert("fielder - " + gameGrid[row][col].fielder + " Prev noball - " + gameGrid[prevRow][prevCol].noball)
            gameGrid[row][col].revealed = true;
            event.target.classList.add('safe-background');
            event.target.textContent = 'Saved';
        }
        if (gameGrid[row][col].dot) {
            gameGrid[row][col].revealed = true;
            event.target.classList.add('safe-background');
            event.target.textContent = 'Dot';
            counterBox++;
            increaseScore(0);
            if (counterBox == 5) {
                event.target.classList.add('out-background');
                event.target.textContent = "Out!";
                endGame();
            }
        }
        // if(gameGrid[row][col].fielder){
        //     endGame();
        // }
        else if (!gameGrid[row][col].fielder && !gameGrid[prevRow][prevCol].wide && !gameGrid[row][col].dot) {
            // alert("this ball didnt have fielder")
            gameGrid[row][col].revealed = true;
            if (gameGrid[row][col].wide == true) {
                event.target.classList.add('wide-background');
                event.target.textContent = gameGrid[row][col].score + ' Wide';
            }
            else if (gameGrid[row][col].noball == true) {
                event.target.classList.add('noball-background');
                event.target.textContent = gameGrid[row][col].score + '\n No Ball';
            }
            else if (gameGrid[row][col].dot == true) {
                event.target.classList.add('safe-background');
                event.target.textContent = 'Dot';
            }
            else if (gameGrid[row][col].score == 1) {
                event.target.classList.add('text-background');
                event.target.textContent = '1';
            }
            else if (gameGrid[row][col].score == 2) {
                event.target.classList.add('text-background');
                event.target.textContent = '2';
            }
            else if (gameGrid[row][col].score == 3) {
                event.target.classList.add('text-background');
                event.target.textContent = '3';
            }
            else if (gameGrid[row][col].score == 4) {
                event.target.classList.add('text-background');
                event.target.textContent = '4';
            }
            else if (gameGrid[row][col].score == 6) {
                event.target.classList.add('text-background');
                event.target.textContent = '6';
            }
            if (gameGrid[row][col].wide == true || gameGrid[row][col].noball == true) {
                increaseScore(gameGrid[row][col].score + 1);
            }
            else {
                increaseScore(gameGrid[row][col].score);
            }
        }


        else if (!gameGrid[row][col].fielder && gameGrid[prevRow][prevCol].wide) {
            alert("This ball didnt have a fielder and last ball had a wide")
            gameGrid[row][col].revealed = true;
            if (gameGrid[row][col].wide == true) {
                event.target.classList.add('wide-background');
                event.target.textContent = gameGrid[row][col].score + ' Wide x 2';
            }
            else if (gameGrid[row][col].noball == true) {
                event.target.classList.add('noball-background');
                event.target.textContent = gameGrid[row][col].score + '\n No Ball x 2';
            }
            else if (gameGrid[row][col].score == 1) {
                event.target.classList.add('text-background');
                event.target.textContent = '1 x 2';
            }
            else if (gameGrid[row][col].score == 2) {
                event.target.classList.add('text-background');
                event.target.textContent = '2 x 2';
            }
            else if (gameGrid[row][col].score == 3) {
                event.target.classList.add('text-background');
                event.target.textContent = '3 x 2';
            }
            else if (gameGrid[row][col].score == 4) {
                event.target.classList.add('text-background');
                event.target.textContent = '4 x 2';
            }
            else if (gameGrid[row][col].score == 6) {
                event.target.classList.add('text-background');
                event.target.textContent = '6 x 2';
            }
            if (gameGrid[row][col].wide == true || gameGrid[row][col].noball == true) {
                increaseScore(2 * gameGrid[row][col].score + 2);
            }
            else {
                increaseScore(2 * gameGrid[row][col].score);
            }
        }
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
        if (gameGrid[row][col].wide == true) {
            block.classList.add('wide-background');
            block.textContent = gameGrid[row][col].score + ' Wide';
        }
        else if (gameGrid[row][col].dot == true) {
            block.classList.add('safe-background');
            block.textContent = "Dot";
        }
        else if (gameGrid[row][col].noball == true) {
            block.classList.add('noball-background');
            block.textContent = gameGrid[row][col].score + '\n No Ball';
        }
        else if (gameGrid[row][col].score == 1) {
            block.classList.add('text-background');
            block.textContent = '1';
        }
        else if (gameGrid[row][col].score == 2) {
            block.classList.add('text-background');
            block.textContent = '2';
        }
        else if (gameGrid[row][col].score == 3) {
            block.classList.add('text-background');
            block.textContent = '3';
        }
        else if (gameGrid[row][col].score == 4) {
            block.classList.add('text-background');
            block.textContent = '4';
        }
        else if (gameGrid[row][col].score == 6) {
            block.classList.add('text-background');
            block.textContent = '6';
        }
    }
}




