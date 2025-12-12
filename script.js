//Creating board
const board = (function Gameboard () {

    const board = [];

    for (let i = 0 ; i < 3 ; i++) {
        board[i] = [];
        for (let j = 0 ; j < 3 ; j++) {
            board[i].push(0);
        };
    };
    const getBoard = () => board;
    return {getBoard};
})();

console.log(board.getBoard());


//Creating players
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
    const getActivePlayer = () => activePlayer

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        console.log(activePlayer);
    };

    return {getActivePlayer, switchActivePlayer};
};

const players = Players();