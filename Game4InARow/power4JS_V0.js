// create the initial tab with postion (can be E (like Empty), or R (Red) or Y (Yellow))
let gameGrid = [
    ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E', 'E']
];


// function to check in which cell space is available to store a pawn
function addPawn(color, pawnColumn) {
    let lookedColumn = pawnColumn;
    let indexLatestRowAvailable = null;
    let emptySpaceFound = false;
    for (let row = 0; row < gameGrid.length; row++) {
        for (let column = 0; column < gameGrid[row].length; column++) {
            if (gameGrid[row][column] === "E" && column === lookedColumn) {
                indexLatestRowAvailable = row;
                emptySpaceFound = true;
            }
        }
    }
    // once the latest empty space is found, the pawn is place in it 
    if (emptySpaceFound) {
        gameGrid[indexLatestRowAvailable][lookedColumn] = color;
        //check if 4 pawin a row after placing the pawn
    }
}

// function to check if a row contains 'YYYY' or 'RRRR'
function checkRowsWinner() {
    let winnerFound = false;
    let winnerColor = 'Y';
    for (let row = 0; row < gameGrid.length; row++) {
        rollingPawnFound = 1;
        for (let column = 1; column < gameGrid[row].length; column++) {
            if (gameGrid[row][column] === gameGrid[row][column - 1] && gameGrid[row][column] !== 'E') {
                rollingPawnFound++;
                // once the latest empty space is found, the pawn is place inside 
                if (rollingPawnFound === 4) {
                    winnerFound = true;
                    winnerColor = gameGrid[row][column];
                    return winnerColor;
                }
            }
            else {
                rollingPawnFound = 1;
            }
        }
    }

    return false;
}
//////////////////////////////////////////////////////////////////////////
// function to create to check if a column contains 'YYYY' or 'RRRR'
function checkColumnsWinner() {
    let winnerFound = false;
    let winnerColor = 'Y';
    for (let column = 0; column < gameGrid.length; column++) {
        rollingPawnFound = 1;
        for (let row = 1; row < (gameGrid[0].length - 1); row++) {
            if ((gameGrid[row][column] === gameGrid[row - 1][column]) && (gameGrid[row][column] !== 'E')) {
                rollingPawnFound++;
                // once the latest empty space is found, the pawn is place inside 
                if (rollingPawnFound === 4) {
                    winnerFound = true;
                    winnerColor = gameGrid[row][column];
                    return winnerColor;
                }
            }
            else {
                rollingPawnFound = 1;
            }
        }
    }

    return false;
}
////////////////////////////////////////////////////////////////////////////////////////
// function  1 to create to check if a diagonal contains 'YYYY' or 'RRRR'
function checkDiagLeftRightLowWinner() {
    let winnerFound = false;
    let winnerColor = 'Y';
    // mettre l'algo de parcours ici:
    //parsing from right to left
    let rollingPawnFound = 1;
    let offsetColumnForParsing = (gameGrid[0].length - 1)
    for (let i = 1; i < offsetColumnForParsing; i++) {
        let row = i;
        let column = 1;
        while (column < gameGrid[0].length && row < gameGrid.length) {
            if ((gameGrid[row][column] === gameGrid[row - 1][column - 1]) && (gameGrid[row][column] !== 'E')) {
                rollingPawnFound++;
                // once the latest empty space is found, the pawn is place inside 
                if (rollingPawnFound === 4) {
                    winnerFound = true;
                    winnerColor = gameGrid[row][column];
                    return winnerColor;
                }
            }
            else {
                rollingPawnFound = 1;
            }
            row++;
            column++;
        }
        rollingPawnFound = 1;
    }

    return false;
}
////////////////////////////////////////////////////////////////////////////////////////
// function 2 to create to check if a diagonal contains 'YYYY' or 'RRRR'
function checkDiagLeftRightHighWinner() {
    let winnerFound = false;
    let winnerColor = 'Y';
    // mettre l'algo de parcours ici:
    //parsing from right to left
    let rollingPawnFound = 1;
    let offsetColumnForParsing = (gameGrid[0].length - 1)
    for (let i = 1; i < offsetColumnForParsing; i++) {
        let row = 1;
        let column = i;
        while (column < gameGrid[0].length && row < gameGrid.length) {
            if ((gameGrid[row][column] === gameGrid[row - 1][column - 1]) && (gameGrid[row][column] !== 'E')) {
                rollingPawnFound++;
                // once the latest empty space is found, the pawn is place inside 
                if (rollingPawnFound === 4) {
                    winnerFound = true;
                    winnerColor = gameGrid[row][column];
                    return winnerColor;
                }
            }
            else {
                rollingPawnFound = 1;
            }
            row++;
            column++;
        }
        rollingPawnFound = 1;
    }
    return false;
}

////////////////////////////////////////////////////////////////////////////////////////
// function 3 to create to check if a diagonal contains 'YYYY' or 'RRRR'
function checkDiagRightLeftLowWinner() {
    let winnerFound = false;
    let winnerColor = 'Y';
    // mettre l'algo de parcours ici:
    //parsing from right to left
    let rollingPawnFound = 1;
    let offsetColumnForParsing = (gameGrid[0].length - 2)

    for (let i = 1; i < offsetColumnForParsing; i++) {
        let row = i;
        let column = 5;
        while (column > 0 && row < gameGrid.length) {
            if ((gameGrid[row][column] === gameGrid[row - 1][column + 1]) && (gameGrid[row][column] !== 'E')) {
                rollingPawnFound++;
                // once the latest empty space is found, the pawn is place inside 
                if (rollingPawnFound === 4) {
                    winnerFound = true;
                    winnerColor = gameGrid[row][column];
                    return winnerColor;
                }
            }
            else {
                rollingPawnFound = 1;
            }
            row++;
            column--;
        }
        rollingPawnFound = 1;
    }

    return false;
}

////////////////////////////////////////////////////////////////////////////////////////
// function 4 to create to check if a diagonal contains 'YYYY' or 'RRRR'
function checkDiagRightLeftHighWinner() {
    let winnerFound = false;
    let winnerColor = 'Y';
    // mettre l'algo de parcours ici:
    //parsing from right to left
    let rollingPawnFound = 1;
    let offsetColumnForParsing = (gameGrid[0].length - 1)

    for (let i = 1; i < offsetColumnForParsing; i++) {
        let row = 1;
        let column = i;
        while (column >= 0 && row < gameGrid.length) {
            if ((gameGrid[row][column] === gameGrid[row - 1][column + 1]) && (gameGrid[row][column] !== 'E')) {
                rollingPawnFound++;
                // once the latest empty space is found, the pawn is place inside 
                if (rollingPawnFound === 4) {
                    winnerFound = true;
                    winnerColor = gameGrid[row][column];
                    return winnerColor;
                }
            }
            else {
                rollingPawnFound = 1;
            }
            row++;
            column--;
        }
        rollingPawnFound = 1;
    }

    return false;
}


function checkAllWinner() {
    let win = false;
    if (checkRowsWinner() ||
        checkColumnsWinner() ||
        checkDiagLeftRightLowWinner() ||
        checkDiagLeftRightHighWinner() ||
        checkDiagRightLeftLowWinner() ||
        checkDiagRightLeftHighWinner()
    ) {
        win = true;
    }
    return win;
}