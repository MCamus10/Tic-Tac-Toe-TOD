import TicTacToe from "./TicTacToe.js";

const playerNamesDialog = document.getElementById("player-name-dialog");
const setPlayerBtn = document.getElementById("set-player-btn");
const newGameBtn = document.getElementById("new-game-btn");

setPlayerBtn.addEventListener("click", () => playerNamesDialog.showModal());

//Setting player names:
const playerOneInput = document.getElementById("player-one-name");
const playerTwoInput = document.getElementById("player-two-name");
const saveNameBtn = document.getElementById("save-name-btn");
saveNameBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const playerOneName = playerOneInput.value.trim();
    const playerTwoName = playerTwoInput.value.trim();
    TicTacToe.setNames(playerOneName, playerTwoName);
    TicTacToe.startGame();
    renderBoard();
    renderStatus(`It's ${TicTacToe.getActivePlayerName()}'s turn`);
    playerNamesDialog.close();
});

const everyCell = document.getElementsByClassName("board-cell");
newGameBtn.addEventListener("click", () => {
    TicTacToe.reset()
    renderStatus(`It's ${TicTacToe.getActivePlayerName()}'s turn`);
    renderBoard();
});


//Listening to game inputs:
const boardElement = document.getElementById("board-container");
const cells = document.querySelectorAll(".board-cell");

function renderBoard() {
    const board = TicTacToe.getBoard();

    cells.forEach(cell => {
       const row = Number(cell.dataset.row);
       const col = Number(cell.dataset.col); 
       const value = board[row][col];

       cell.classList.remove("x", "o");
       
       if (value ==="X") cell.classList.add("x");
       if (value ==="O") cell.classList.add("o");
    });
}

boardElement.addEventListener("click", (e) =>{
    const cell = e.target;
    if (!cell.classList.contains("board-cell")) return;

    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);

    const result = TicTacToe.play(row, col);
    if(!result) return;

    renderBoard();
    renderStatus(result.message);
});

//Messages output
const gameStatus = document.getElementById("game-status-output");
function renderStatus(message) {
    gameStatus.textContent = message;
};