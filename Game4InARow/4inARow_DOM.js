

// parsing of the DOM 
let colorInGame = 'Y';
const gameStageInit = document.querySelectorAll(".gameStage :first-child");

const gameStage = [
    Array.from(gameStageInit).slice(0, 7),
    Array.from(gameStageInit).slice(7, 14),
    Array.from(gameStageInit).slice(14, 21),
    Array.from(gameStageInit).slice(21, 28),
    Array.from(gameStageInit).slice(28, 35),
    Array.from(gameStageInit).slice(35, 42)
];

const lineAboveStageInit = document.querySelectorAll(".enterGame :first-child");

const lineAboveStage = [
    Array.from(lineAboveStageInit).slice(0, 7)
];

// function to check if a column can receive a pawn and to color 
//in green when we over or red if not available
function greenRedFlagColumn(gridInput, lineAboveDomOutput, colorInGame) {
    for (let column = 0; column < 7; column++) {
        lineAboveDomOutput[0][column].classList.remove("circleOKYellow")
        lineAboveDomOutput[0][column].classList.remove("circleOKRed")
        lineAboveDomOutput[0][column].style.display = "initial";
        if (gridInput[0][column] === 'Y' || gridInput[0][column] === 'R') {
        }
        if (gridInput[0][column] === "E") {
            lineAboveDomOutput[0][column].classList.add("okToPlay");
            lineAboveDomOutput[0][column].textContent = '=>';
            if (colorInGame === 'R') {
                lineAboveDomOutput[0][column].classList.add("circleOKRed");
            } else {
                lineAboveDomOutput[0][column].classList.add("circleOKYellow");
            }
        } else {
            lineAboveDomOutput[0][column].style.display = "none";
        }
    }
}


// function to feed the DOM according to the gameGrid array
function feedTheGrid(gridInput, gridDomOutput) {
    for (let row = 0; row < 6; row++) {
        for (let column = 0; column < 7; column++) {
            gridDomOutput[row][column].classList.remove("circleYellow");
            gridDomOutput[row][column].classList.remove("circleRed");
            if (gridInput[row][column] === 'Y') {
                gridDomOutput[row][column].classList.add("circleYellow");
            }
            if (gridInput[row][column] === "R") {
                gridDomOutput[row][column].classList.add("circleRed");
            }
        }
    }
}

// function to re-start and clean up  the grids in 1 player mode 
// and add a button start (button start/restart)
// 1. analyze empty spaces 2. choose a random column amongst the free ones 3. play like in 2 players

const buttonStartOne = document.getElementById("onePlayerButton");

buttonStartOne.addEventListener("click", restartOnePlayer);

function restartOnePlayer() {
    onePlayerActivated = true;
    machineToPlay = true;
    colorInGame = 'Y';
    console.log('passe par la fonction restartOnePlayer');
    cleanGrid(gameGrid);
    // change a partir d'ici
    setTimeout(putRandomPawnToGrid, 1000);
    feedTheGrid(gameGrid, gameStage);
    greenRedFlagColumn(gameGrid, lineAboveStage, 'R');
}


//
function getRandomInt() {
    return randomNb = Math.floor(Math.random() * 6);
}
// function to place randomly a pawn
function putRandomPawnToGrid() {
    //Nombre aleatoire entre 0 et 6 excluant les colonnes pleines RESTE A EXCLURE COL PLEINES
    addPawn(colorInGame, columnToFocusForMachine);
    feedTheGrid(gameGrid, gameStage);
    if (checkAllWinner() === false) {
        console.log('PERDU');
    } else { alert('GAGNE'); }
    if (colorInGame === 'Y') { colorInGame = 'R'; } else { colorInGame = 'Y'; }
    greenRedFlagColumn(gameGrid, lineAboveStage, colorInGame);
    machineToPlay = !machineToPlay;
    // this round is finished so we can reset the focus made by the machine during the 3 in row checks (only colonne for now)
    resetColumnToFocusForMachine();
}




// function to re-start and clean up  the grids in 2 player mode 
// and add a button start (button start/restart)

const buttonStartTwo = document.getElementById("twoPlayerButton");

buttonStartTwo.addEventListener("click", restartTwoPlayer);


function restartTwoPlayer() {
    onePlayerActivated = false;
    colorInGame = 'Y';
    cleanGrid(gameGrid);
    feedTheGrid(gameGrid, gameStage);
    greenRedFlagColumn(gameGrid, lineAboveStage, 'Y');
}


// function to cleanup the grid => function ok

function cleanGrid(gridToClean) {
    for (let row = 0; row < gridToClean.length; row++) {
        for (let column = 0; column < gridToClean[row].length; column++) {
            gridToClean[row][column] = 'E';
        }
    }
}

// function to put a pawn in an allowed column
function playAPawn() {
    // click on a column on the line above stage,if the column is free
    // this put a pawn in the deepest available cell
    lineAboveStageInit.forEach(element => { element.addEventListener("click", addEventToLineAboveStage); });

}

function addEventToLineAboveStage(event) {
    if (onePlayerActivated === false || (onePlayerActivated === true && machineToPlay === false)) {
        if (event.target.classList.contains('okToPlay')) {
            addPawn(colorInGame, parseInt(event.target.id));
            feedTheGrid(gameGrid, gameStage);
            machineToPlay = !machineToPlay;
        }

        if (checkAllWinner() === false) {
            console.log('PERDU');
        } else { alert('GAGNE'); }
        if (colorInGame === 'Y') { colorInGame = 'R'; } else { colorInGame = 'Y'; }
        greenRedFlagColumn(gameGrid, lineAboveStage, colorInGame);
    }
    if (onePlayerActivated === true && machineToPlay === true) {
        setTimeout(putRandomPawnToGrid, 1000);
    }
}

playAPawn();
feedTheGrid(gameGrid, gameStage);
greenRedFlagColumn(gameGrid, lineAboveStage, 'Y');