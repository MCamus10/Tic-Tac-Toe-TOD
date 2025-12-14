//Creating board
function Gameboard () {
    const board = [];
    const boardRows = 3;
    const boardColumns = 3;

    for (let i = 0 ; i < boardRows ; i++) {
        board[i] = [];
        for (let j = 0 ; j < boardColumns ; j++) {
            board[i].push(0);
        };
    };
    const getBoard = () => board;

    const isBoardComplete = () => {
        return board.every((row) => row.every((col) => col !== 0));  
    };

    const getCellValue = (row, column) => board[row][column];

    const setCellValue = (row, column, value) => {
        board[row][column] = value
    };

    const resetBoard = () => {
        for (let i = 0; i < boardRows; i++){
            for (let j = 0; j < boardColumns; j++) {
                board[i][j] = 0;
            };
        };
    };
 
    return {
        getBoard, 
        isBoardComplete, 
        getCellValue, 
        setCellValue,
        resetBoard
    };
};

function Players (){
    const players = [
        {name: "Player One", token: "X"},
        {name: "Player Two", token: "O"}
    ];

    let activePlayer = players[0];

    const setPlayerNames = (playerOneName="Player One", playerTwoName="Player Two") => {
        players[0].name = playerOneName || "Player One";
        players[1].name = playerTwoName || "Player Two";
    };

    const getActivePlayerName = () => activePlayer.name
    const getActivePlayerToken = () => activePlayer.token;
    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getPlayerFromToken = (symbol) => {
        const player = players.find(({token}) => token === symbol);
        return player ? player.name : null;
    };

    const resetActivePlayer = () => {
        activePlayer = players[0];
    }

    return {
        getActivePlayerName, 
        switchActivePlayer, 
        getActivePlayerToken, 
        getPlayerFromToken,
        setPlayerNames,
        resetActivePlayer
    };
};

function Winner (board, players) {
    //Check if a line has a winner
    const checkLine = (line) => {
        const firstCell = line[0];
        if (firstCell != 0 && line.every((cell) => cell === firstCell)) {
            return firstCell;
        };
        return null;
    };

    //Search for winner
    const getWinner = () => {
        const boardData = board.getBoard();
        const size = boardData.length;

        //Verify rows
        for (let row of boardData) {
            const winner = checkLine(row);
            if (winner) return players.getPlayerFromToken(winner);
        };

        //Verify columns (transposing matrix)
        for (let col = 0; col < size; col++){
            const column = boardData.map(row => row[col]);
            const winner = checkLine(column);
            if (winner) return players.getPlayerFromToken(winner);
        };
    

        //Verify main diagonal
        const mainDiagonal = boardData.map((row, i) => row[i]);
        const mainWinner = checkLine(mainDiagonal);
        if (mainWinner) return players.getPlayerFromToken(mainWinner);

        //Verify anti diagonal
        const antiDiagonal = boardData.map((row, i) => row[size - 1 - i]);
        const antiWinner = checkLine(antiDiagonal);
        if (antiWinner) return players.getPlayerFromToken(antiWinner);
        
    };
    return {getWinner};
};    

function GameController(board, players, winner) {
    let gameEnd = false;
    const checkGameEnd = () => gameEnd;
        
    const printBoard = () => { 
        console.log(board.getBoard());
    };

    printBoard();
    console.log(`It's ${players.getActivePlayerName()}'s turn`);

    const play = (row, column) => {
        if (gameEnd) {
            console.log("Game has already ended!");
            return true;
        }

        if (board.getCellValue(row, column) !== 0) {
            console.log("Choose another cell!");
            return true;
        }

        if (!gameEnd) {
            board.setCellValue(row, column, players.getActivePlayerToken());
            printBoard();
        }
            
        
        const winnerName = winner.getWinner();
        if (winnerName) {
            console.log(`${winnerName} wins!`)
            gameEnd = true;
            return true;
        };
        
        if (board.isBoardComplete()){
            console.log("Tie! Game end!");
            gameEnd = true;
            return true;
        };

        players.switchActivePlayer();
        console.log(`It's ${players.getActivePlayerName()}'s turn`);
    };

    const resetGame = () => {
        board.resetBoard();
        gameEnd = false;
        players.resetActivePlayer();
        console.log("Game reset");
        printBoard()
    };

    return {play, resetGame, checkGameEnd};
};

const TicTacToe = (function(){
    const board = Gameboard();
    const players = Players();
    const winner = Winner(board, players);
    let game = null;

    const startGame = () => {
        game = GameController(board, players, winner);

    };
    
    return {
        play: (row,col) => game?.play(row, col),
        startGame,
        setNames: players.setPlayerNames,
        reset: () => game?.resetGame(),
        getBoard: board.getBoard,
        getActivePlayerToken: players.getActivePlayerToken,
        checkGameEnd: () => game ? game.checkGameEnd() : false     
    }
})();

export default TicTacToe;

//Test tie
// TicTacToe.play(0,0);
// TicTacToe.play(2,1);
// TicTacToe.play(0,1);
// TicTacToe.play(0,2);
// TicTacToe.reset();
// TicTacT.play(1,1);
// TicTacT.play(2,2);
// TicTacT.play(2,0);
// TicTacT.play(1,0);
// TicTacT.play(1,2);

//Test row winner
// TicTacT.play(0,0);
// TicTacT.play(1,0);
// TicTacT.play(2,0);
// TicTacT.play(1,1);
// TicTacT.play(2,1);
// TicTacT.play(1,2);

//Test column winner
// TicTacT.play(0,0);
// TicTacT.play(0,1);
// TicTacT.play(2,2);
// TicTacT.play(1,1);
// TicTacT.play(0,2);
// TicTacT.play(2,1);


//Test diagonal winner
// TicTacT.play(0,0);
// TicTacT.play(0,1);
// TicTacT.play(1,1);
// TicTacT.play(1,2);
// TicTacT.play(2,2);

//Test anti diagonal winner
// TicTacT.play(0,0);
// TicTacT.play(0,2);
// TicTacT.play(0,1);
// TicTacT.play(1,1);
// TicTacT.play(2,1);
// TicTacT.play(2,0);
