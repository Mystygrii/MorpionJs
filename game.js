var turn = GetPlayerStart();
var CurrentPlayer = 0;
const player1Img = "<div class=\"circle\"><img src=\"imgs/J1.png\"></img></div>";
const player2Img = "<div class=\"cross\"><img src=\"imgs/J2.png\"></img></div>";
const player1 = 1;
const player2 = 2;
const player1Class = "O";
const player2Class = "X";
const winningConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
const cells = document.querySelectorAll("#cell");
const container = document.querySelector(".container");

/**
 * 
 * @param {Element} c 
 * traitement principal du jeu. Effectue chaque traitement lors du clic sur une case.
 */
function WriteCase(c) {

    if (c.className !== "O" || c.className !=="X") {

        if (turn === 1) {
            c.innerHTML = player1Img;
            c.classList.remove("empty");
            c.classList.add(player1Class);
            CurrentPlayer = turn;
            checkWin(player1Class);
            SetPlayerTurn(turn);
            var writeTurn = document.querySelector(".playerTurn");
            writeTurn.innerHTML = "au tour du joueur " + turn;
        } else {
            c.innerHTML = player2Img;
            c.classList.remove("empty");
            c.classList.add(player2Class);
            CurrentPlayer = turn;
            checkWin(player2Class);
            SetPlayerTurn(turn);
            var writeTurn = document.querySelector(".playerTurn");
            writeTurn.innerHTML = "au tour du joueur " + turn;
        }

        if (checkWin(player1Class) || checkWin(player2Class)) {
            var writeVictory = document.querySelector(".gameState");
            writeVictory.innerHTML = "Victoire du joueur "+ CurrentPlayer;
            var writeTurn = document.querySelector(".playerTurn");
            writeTurn.innerHTML = "";
            endGame();
        }else{
                gameDraw();
            }
    }

    c.removeAttribute("onclick");
}
/**
 * 
 * @returns défini le jouer qui commence.
 */

function GetPlayerStart() {
    var start = GetRandomInt(1, 2);
    var writeTurn = document.querySelector(".playerTurn");
    writeTurn.innerHTML = "Le joueur " + start + " commence";
    return start;
}
/**
 * 
 * @param {number} p 
 * @returns définit le joueur suivant.
 */

function SetPlayerTurn(p) {
    if (p !== player1) {
        turn = player1;
        return turn;
    } else {
        turn = player2;
        return turn;
    }
}

/**
 * 
 * @param {number} min 
 * @param {number} max 
 * @returns renvoie une nombre entier aléatoire en 1 et 2.
 */
function GetRandomInt(min, max) {
    var result = 0;
    min = Math.ceil(min);
    max = Math.floor(max);
    result = Math.round(Math.random() * (max - min) + min);

    if (result === 0) {
        result = 1;
    } else {

        return result;
    }

}

/**
 * 
 * @param {Element} currentClass 
 * @returns renvoie vrai si une des conditions de victoire est respectée.
 */
function checkWin(currentClass) {
    return winningConditions.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

/**
 * Détecte si le jeu se solde par une égalité et applique le traitement adéquat.
 */
function gameDraw() {
    var emptyCells = document.querySelectorAll(".empty");
    var cellsArr = Array.from(emptyCells);
    var cellsArrSize = cellsArr.length;
    if(cellsArrSize === 0){
        var writeVictory = document.querySelector(".gameState");
        writeVictory.innerHTML = "Égalité";
        var writeTurn = document.querySelector(".playerTurn");
        writeTurn.innerHTML = "";
        endGame();
    }
}

/**
 * Met fin à la partie.
 */
function endGame() {
    var emptyCells = document.querySelectorAll(".empty");

    emptyCells.forEach(item => {
        item.removeAttribute("onclick");
    });

}

/**
 * Recharge la page pour relancer une partie.
 */
function restartGame() {
    location.reload();
}