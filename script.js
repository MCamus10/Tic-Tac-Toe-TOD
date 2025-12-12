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

    const isBoardComplete = () => {
        return board.every((row) => row.every((col) => col !== 0));  
    };

    return {getBoard, isBoardComplete};
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

    const getPlayerFromToken = (symbol) => {
        const player = players.find(({token}) => token === symbol).name;
        return player;
    };

    return {getActivePlayerName, switchActivePlayer, getActivePlayerToken, getPlayerFromToken};
};
const players = Players();


function Cell() {
    const getCellToken = (row, column) => board.getBoard()[row][column];
    return {getCellToken};
};
const cell = Cell();


function Winner () {
    const getWinner = () => {
        const boardRowsCount = board.getBoard().length;
        const boardColumnCount = board.getBoard()[0].length;

        //Search for row winner
        function isWinner(board) {
            for (let i=0; i < board.length; i++) {
                if (board[i].every((cell) => cell === "X")) {
                    console.log(`${players.getPlayerFromToken("X")} is the winner!`)
                    return true;
                } else if (board[i].every((cell) => cell === "O")) {
                    console.log(`${players.getPlayerFromToken("O")} is the winner!`)
                    return true;
                };
            };
        };
            
        //Invert rows-columns to search column winner
        let transpondedBoard = [];
        for (let j = 0; j < boardColumnCount; j++) {
            transpondedBoard[j] = [];
            for (let i = 0; i < boardRowsCount; i++){
                transpondedBoard[j].push(board.getBoard()[i][j]);
            };
        };

        //Put diagonals on new matrix
        const size = board.getBoard().length - 1;
        const mainDiagonal = board.getBoard().map((row, i) => row[i]);
        const antiDiagonal = board.getBoard().map((row, i) => row[size - i])
        const diagonalBoard = [mainDiagonal, antiDiagonal]

        if (isWinner(board.getBoard()) || isWinner(transpondedBoard) || isWinner(diagonalBoard)){
            return true;
        };   
        
    };
    return {getWinner};
};
const winner = Winner();
    

function GameController() {
    let gameEnd = false;

    console.log(board.getBoard());
    console.log(`It's ${players.getActivePlayerName()}'s turn`);

    const play = (row, column) => {
        if (gameEnd) {
            console.log("Game has ended!");
            return false;
        }

        if (cell.getCellToken(row, column) !== 0) {
            console.log("Choose another cell!");
        } else {        
        board.getBoard()[row].splice(column, 1, players.getActivePlayerToken());
        players.switchActivePlayer();
        console.log(board.getBoard());
        };
        
        if (winner.getWinner()) {
            gameEnd = true;
            return false;
        };
        
        if (!winner.getWinner() && board.isBoardComplete()){
            console.log("Tie! Game end!");
            gameEnd = true;
            return false;
        };
        
        console.log(`It's ${players.getActivePlayerName()}'s turn`);
    };


    return {play};
};
const game = GameController();

//Test tie
/* game.play(0,0);
game.play(2,1);
game.play(0,1);
game.play(0,2);
game.play(1,1);
game.play(2,2);
game.play(2,0);
game.play(1,0);
game.play(1,2); */

//Test row winner
/* game.play(0,0);
game.play(1,0);
game.play(2,0);
game.play(1,1);
game.play(2,1);
game.play(1,2); */

//Test column winner
/* game.play(0,0);
game.play(0,1);
game.play(2,2);
game.play(1,1);
game.play(0,2);
game.play(2,1); */


//Test diagonal winner
/* game.play(0,0);
game.play(0,1);
game.play(1,1);
game.play(1,2);
game.play(2,2); */

//Test anti diagonal winner
/* game.play(0,0);
game.play(0,2);
game.play(0,1);
game.play(1,1);
game.play(2,1);
game.play(2,0); */