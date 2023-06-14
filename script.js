// Variable declarations for count of fielders in normal and box cricket
const fieldersCount = 11;
const fieldersBox = 5;

// Variable declarations for global variables of the grid
let gameGrid;   // Grid
let score;      // Total score
let fieldersRemaining;      // Used in initializeGame
let isGameOver;     // bool value

// Variable declarations which are used for logic of wide and no ball
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
startForm.addEventListener('submit', startFormSubmit);      // Goes to the startFormSubmit function

// Function that reads the values and calls the initialize function
function startFormSubmit(event) {
    event.preventDefault();
    const gridSizeInput = document.getElementById('grid-size');
    const gridSize = parseInt(gridSizeInput.value);
    const gameMode = gameModeSelect.value;
    initializeGame(gridSize, gameMode);
}

// Function that initializes the game from scratch
function initializeGame(gridSize, gameMode) {
    const updatedSize = parseInt(gridSize);
    const updatedGameMode = gameMode;
    if (isNaN(updatedSize) || updatedSize < 5 || updatedSize > 11) {    // Extra checking for required condition
        return;
    }
    gameGrid = [];
    score = 0;
    fieldersRemaining = fieldersCount;
    isGameOver = false;     // Initialising the required global variables for the grid
    const gameGridElement = document.getElementById('game-grid');
    gameGridElement.innerHTML = '';
    gameGridElement.style.gridTemplateColumns = `repeat(${gridSize}, 50px)`;    // Repeating columns in the grid gridSize number of times

    for (let i = 0; i < updatedSize; i++) {
        gameGrid[i] = [];       // Initialising an array in ith element to form a 2D array
        for (let j = 0; j < updatedSize; j++) {
            const block = document.createElement('div');    // Creating a div element
            block.classList.add('block');
            block.dataset.row = i;      // Setting row to i
            block.dataset.col = j;      // Setting column to j
            block.addEventListener('click', gameLogic);     // Calling the gameLogic() function when the block is clicked
            gameGridElement.appendChild(block);     // Adding the block to the 2D array
            gameGrid[i][j] = {      // Defining properties of the grid block
                fielder: false,     // Whether fielder is there
                revealed: false,    // Whether it has been revealed i.e clicked
                score: 0,           // Score on the block
                noball: false,      // Whether it has a no ball which comes into play only in extras mode
                wide: false,        // Whether it has a wide which comes into play only in extras mode
                dot: false          // Whether it has a dot which comes into play only in box cricket mode
            };
        }
    }
    placeFielders(updatedSize, updatedGameMode);        // Randomly placing fielders on the grid
    setScores(updatedSize, updatedGameMode);            // Randomly setting and placing the scores on the grid
    document.getElementById('start-page').style.display = 'none';       // Removing the start page from display
    document.getElementById('game-page').style.display = 'block';       // Adding the game page to the display
}

// Function to place fielders according to the game mode randomly on the grid
function placeFielders(updatedSize, updatedGameMode) {
    const gameMode = updatedGameMode;
    if (gameMode === "basic" || gameMode === "extras") {        // 11 fielders for basic and extras
        let fieldersToPlace = fieldersCount;            // Setting the fielders to place equal to the total fielders count
        while (fieldersToPlace > 0) {
            const randomRow = Math.floor(Math.random() * updatedSize);      // Finding a random row 
            const randomCol = Math.floor(Math.random() * updatedSize);      // Finding a random column
            if (!gameGrid[randomRow][randomCol].fielder) {
                gameGrid[randomRow][randomCol].fielder = true;          // Setting the fielder property to true from false
                // alert(randomRow + " " + randomCol)  // for debugging
                fieldersToPlace--;
            }
        }
    }
    else if (gameMode === "boxcricket") {       // 5 fielders for box cricket, same logic is repeated from before
        let fieldersToPlace = fieldersBox;
        while (fieldersToPlace > 0) {
            const randomRow = Math.floor(Math.random() * updatedSize);
            const randomCol = Math.floor(Math.random() * updatedSize);
            if (!gameGrid[randomRow][randomCol].fielder) {
                gameGrid[randomRow][randomCol].fielder = true;
                // alert(randomRow + " " + randomCol) // for debugging
                fieldersToPlace--;
            }
        }
    }
}

// Function to set number the scores according to the game mode
function setScores(gridSize, updatedGameMode) {
    const gameMode = updatedGameMode;
    if (gameMode === "basic") {         // setting the number of 0s, 1s, 2s, 3s, 4s, 6s, wides, noballs, dots in basic game mode for the placeScores function according  to the grid size
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
    }
    if (gameMode === "extras") {        // setting the number of 0s, 1s, 2s, 3s, 4s, 6s, wides, noballs, dots in extras game mode for the placeScores function according  to the grid size
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
    }
    if (gameMode === "boxcricket") {        // setting the number of 0s, 1s, 2s, 3s, 4s, 6s, wides, noballs, dots in box cricket game mode for the placeScores function according  to the grid size
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
            placeScores(0, 49, 21, 0, 0, 0, 0, 0, 46, 11);      // Throughout this function I have made sure that the total sum is equal to the square of the grid size
        }
    }
}

// Function to place the scores according to what was mentioned in the setScores function
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
    let num_dotc = parseInt(num_dot);       // Making copies of all the arguments passed, these ones will be the count of the things to be placed on the grid
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
        const randomCol = Math.floor(Math.random() * updatedGridSize);      // generating a random row and column to place a specific score until the number of scores to place is < 0, this is done for every score
        if (!gameGrid[randomRow][randomCol].fielder && parseInt(gameGrid[randomRow][randomCol].score) == 0) {
            gameGrid[randomRow][randomCol].score = 1;       // Set score to 1 if fielder isnt there
            num1c--;
        }
    }
    while (num2c > 0) {
        const randomRow = Math.floor(Math.random() * updatedGridSize);
        const randomCol = Math.floor(Math.random() * updatedGridSize);
        if (!gameGrid[randomRow][randomCol].fielder && gameGrid[randomRow][randomCol].score == 0) {
            gameGrid[randomRow][randomCol].score = 2;       // Set score to 2 if fielder isnt there
            num2c--;
        }
    }
    while (num3c > 0) {
        const randomRow = Math.floor(Math.random() * updatedGridSize);
        const randomCol = Math.floor(Math.random() * updatedGridSize);
        if (!gameGrid[randomRow][randomCol].fielder && gameGrid[randomRow][randomCol].score == 0) {
            gameGrid[randomRow][randomCol].score = 3;       // Set score to 3 if fielder isnt there
            num3c--;
        }
    }
    while (num4c > 0) {
        const randomRow = Math.floor(Math.random() * updatedGridSize);
        const randomCol = Math.floor(Math.random() * updatedGridSize);
        if (!gameGrid[randomRow][randomCol].fielder && gameGrid[randomRow][randomCol].score == 0) {
            gameGrid[randomRow][randomCol].score = 4;       // Set score of 4 if fielder isnt there
            num4c--;
        }
    }
    while (num6c > 0) {
        const randomRow = Math.floor(Math.random() * updatedGridSize);
        const randomCol = Math.floor(Math.random() * updatedGridSize);
        if (!gameGrid[randomRow][randomCol].fielder && gameGrid[randomRow][randomCol].score == 0) {
            gameGrid[randomRow][randomCol].score = 6;       // Set score to 6 if fielder isnt there
            num6c--;
        }
    }
    while (num_widec > 0) {
        const randomRow = Math.floor(Math.random() * updatedGridSize);
        const randomCol = Math.floor(Math.random() * updatedGridSize);
        if (!gameGrid[randomRow][randomCol].fielder && !gameGrid[randomRow][randomCol].noball && !gameGrid[randomRow][randomCol].wide) { // only setting to wide if it isnt a fielder, wide or no ball square, score need not be zero since extras is on top of score
            gameGrid[randomRow][randomCol].wide = true;     // Setting wide to true
            // alert("Wide - " + randomRow + " " + randomCol) // for debugging
            num_widec--;
        }
    }
    while (num_noballc > 0) {
        const randomRow = Math.floor(Math.random() * updatedGridSize);
        const randomCol = Math.floor(Math.random() * updatedGridSize);
        if (!gameGrid[randomRow][randomCol].fielder && !gameGrid[randomRow][randomCol].wide && !gameGrid[randomRow][randomCol].noball) {    // only setting to no ball if it isnt a fielder, wide or no ball square, score need not be zero since extras is on top of scores
            gameGrid[randomRow][randomCol].noball = true;   // Setting no ball to true
            // alert("No Ball - " + randomRow + " " + randomCol)    // for debugging
            num_noballc--;
        }
    }
    while (num_dotc > 0) {
        const randomRow = Math.floor(Math.random() * updatedGridSize);
        const randomCol = Math.floor(Math.random() * updatedGridSize);
        if (!gameGrid[randomRow][randomCol].fielder && gameGrid[randomRow][randomCol].score == 0 && !gameGrid[randomRow][randomCol].dot) {      // only setting to dot if fielder doesnt exist, score is zero and it already isnt a dot ball
            gameGrid[randomRow][randomCol].dot = true;
            // alert("Dot - " + randomRow + " " + randomCol)        // for debugging
            num_dotc--;
        }
    }
}

// Main function that handles all the game logic and how the game proceeds according to which block is clicked
function gameLogic(event) {
    if (isGameOver) return;     // if game is already over then do nothing

    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);     // finding the row and column of the event and setting the row and col vectors

    if (!gameGrid[row][col].revealed) {     // if the block isnt already revealed, then only run the logic of the code
        // alert("The value of counter is " + counter)  // for debugging
        if (counter == 0) {         // copying only the initial row when the counter is zero
            rowCopy = row;
            colCopy = col;
            // alert("The copy is being made " + rowCopy + " " + colCopy + " " + row  + " " + col) // for debugging
        }
        else if (counter > 0) {     // copying previous and current row when the counter is greater than zero, this is for maintaining the previous and current row for the wide and no ball logic
            prevRow = rowCopy;
            prevCol = colCopy;
            rowCopy = row;
            colCopy = col;
            // alert("the prev row is " + prevRow + " the prev col is " + prevCol)      // for debugging
        }
        counter++;      // increase counter every time a block is clicked
        if (gameGrid[row][col].fielder && !gameGrid[prevRow][prevCol].noball) {     
            // alert("fielder - " + gameGrid[row][col].fielder + " Prev noball - " + gameGrid[prevRow][prevCol].noball) // debugging
            // alert("prev ball didnt have no ball and this ball had fielder")  // debugging
            endGame();      // end game if last ball didnt have a no ball and current ball has a fielder
        }
        else if (gameGrid[row][col].fielder && gameGrid[prevRow][prevCol].noball) {
            // alert("prev ball did have no ball and this ball had fielder")    // debugging
            // alert("fielder - " + gameGrid[row][col].fielder + " Prev noball - " + gameGrid[prevRow][prevCol].noball)     // debugging
            gameGrid[row][col].revealed = true;     // when clicked, make revealed true
            event.target.classList.add('safe-background');
            event.target.textContent = 'Saved';     // you are saved when last ball had a no ball and this ball had a fielder
        }
        if (gameGrid[row][col].dot) {
            gameGrid[row][col].revealed = true;
            event.target.classList.add('safe-background');
            event.target.textContent = 'Dot';
            counterBox++;       // increase a counter if dot is cicked
            increaseScore(0);
            if (counterBox == 5) {
                event.target.classList.add('out-background');
                event.target.textContent = "Out!";
                endGame();      // end the game if it is equal to 5, it is out
            }
        }
        else if (!gameGrid[row][col].fielder && !gameGrid[prevRow][prevCol].wide && !gameGrid[row][col].dot) {      // if previous ball didnt have wide and current didnt have dot or fielder, then go with the normal logic
            // alert("this ball didnt have fielder")
            gameGrid[row][col].revealed = true;
            if (gameGrid[row][col].wide == true) {
                event.target.classList.add('wide-background');
                event.target.textContent = gameGrid[row][col].score + ' Wide';      // text in the block
            }
            else if (gameGrid[row][col].noball == true) {
                event.target.classList.add('noball-background');
                event.target.textContent = gameGrid[row][col].score + '\n No Ball';     // text in the block
            }
            else if (gameGrid[row][col].dot == true) {
                event.target.classList.add('safe-background');
                event.target.textContent = 'Dot';       // text in the block
            }
            else if (gameGrid[row][col].score == 1) {
                event.target.classList.add('text-background');
                event.target.textContent = '1';     // text in the block
            }
            else if (gameGrid[row][col].score == 2) {
                event.target.classList.add('text-background');
                event.target.textContent = '2';     // text in the block
            }
            else if (gameGrid[row][col].score == 3) {
                event.target.classList.add('text-background');
                event.target.textContent = '3';     // text in the block
            }
            else if (gameGrid[row][col].score == 4) {
                event.target.classList.add('text-background');
                event.target.textContent = '4';     // text in the block
            }
            else if (gameGrid[row][col].score == 6) {
                event.target.classList.add('text-background');
                event.target.textContent = '6';     // text in the block
            }
            if (gameGrid[row][col].wide == true || gameGrid[row][col].noball == true) {
                increaseScore(gameGrid[row][col].score + 1);        // adding one extra run to the score if there is a wide or no ball
            }
            else {
                increaseScore(gameGrid[row][col].score);    // else, just adding the score
            }
        }


        else if (!gameGrid[row][col].fielder && gameGrid[prevRow][prevCol].wide) {      // logic if last ball had a wide, it is all the same, just that the final score to be added is twice the normal one
            // alert("This ball didnt have a fielder and last ball had a wide")     // for debugging
            gameGrid[row][col].revealed = true;
            if (gameGrid[row][col].wide == true) {
                event.target.classList.add('wide-background');
                event.target.textContent = gameGrid[row][col].score + ' Wide';
            }
            else if (gameGrid[row][col].noball == true) {
                event.target.classList.add('noball-background');
                event.target.textContent = gameGrid[row][col].score + '\n No Ball';
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
                increaseScore(2 * gameGrid[row][col].score + 2);        // twice the normal score
            }
            else {
                increaseScore(2 * gameGrid[row][col].score);        // twice the normal score
            }
        }
    }
}

// Function to increase the score and update it
function increaseScore(points) {
    score += points;        // increase the score by points amount
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${score}`;       // updating the text content
}

// Function to end the game and display the final score
function endGame() {
    isGameOver = true;      // setting isGameOver to true
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Game Over!!\n Final Score: ${score}`;       // Showing the final score

    const gameGridElement = document.getElementById('game-grid');
    const blocks = gameGridElement.getElementsByClassName('block');     // Creating an array of all the blocks in the grid
    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];        // Copying ith element of array to block, rest of the function is just to show the text at the end of the game using textContent function like before
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

