//Creating board
function Gameboard () {

    const board = [];
    for (let i = 0 ; i < 3 ; i++) {
        board[i] = [];
        for (let j = 0 ; j < 3 ; j++) {
            board[i].push(0);
        };
    };
    const getBoard = () => board;

    const isBoardFull = () => {
        return board.every((row) => row.every((col) => col !== 0));  
    };
    return {getBoard, isBoardFull};
};
const board = Gameboard();


function Players (){
    playerOne = "Player One";
    playerTwo = "Player Two";
    const players = [
        {
            name: playerOne,
            token: "X"
        },
        {
            name: playerTwo,
            token: "O"
        }
    ];

    let activePlayer = players[0];
    const getActivePlayerName = () => activePlayer.name

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayerToken = () => activePlayer.token;

    return {getActivePlayerName, switchActivePlayer, getActivePlayerToken};
};
const players = Players();


function Cell() {
    const getCellToken = (row, column) => board.getBoard()[row][column];
    return {getCellToken};
};
const cell = Cell();


function Winner () {
    const getWinner = () => {

    };
    return {getWinner};
}
    

function GameController() {
    console.log(board.getBoard());
    console.log(`It's ${players.getActivePlayerName()}'s turn`);

    const play = (row, column) => {
        if (cell.getCellToken(row, column) !== 0) {
            console.log("Choose another cell!");
        } else {        
        board.getBoard()[row].splice(column, 1, players.getActivePlayerToken());
        players.switchActivePlayer();
        console.log(board.getBoard());
        };
        
        board.isBoardFull() ? console.log("Game end!") : console.log(`It's ${players.getActivePlayerName()}'s turn`);
    };
        return {play};

};
const game = GameController();
