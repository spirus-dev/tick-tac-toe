const DisplayController = (function(){
    const renderMessage = function(message){
        console.log(message);
    }

    return{
        renderMessage
    };
})();

const GameBoard = (function(){
    let gameBoard = ["","","","","","","","",""];

    const renderBoard = function(){
        DisplayController.renderMessage(gameBoard);
    };

    const updateBoard = function(index,value){
        gameBoard[index]=value;
        renderBoard();
    };

    return {
        gameBoard,
        renderBoard,
        updateBoard
    };
})();

const Player = function(name,marker){
    DisplayController.renderMessage(`Player created with name as ${name} and marker as ${marker}`)
    return {
        name,
        marker
    };
};

const Game = (function(){
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start= function(){
        DisplayController.renderMessage('Game started');
        players=[
            Player('Saurabh','X'),
            Player('Aditya','O')
        ];
        currentPlayerIndex = 0;
        gameOver = false;
        GameBoard.renderBoard();
    }

    const handleTurn = function(number){
        if(gameOver){
            DisplayController.renderMessage("Game over, please restart the game to play again");
            return;
        }
        if(GameBoard.gameBoard[number]!=""){
            DisplayController.renderMessage(`You cannot place a marker here ${players[currentPlayerIndex].name} as it's already occupied`);
            return;
        }
        DisplayController.renderMessage(`${players[currentPlayerIndex].name} placed ${players[currentPlayerIndex].marker} at index ${number}`);
        GameBoard.updateBoard(number,players[currentPlayerIndex].marker);

        if(checkForWin(GameBoard.gameBoard)){
            gameOver=true;
            DisplayController.renderMessage(`${players[currentPlayerIndex].name} won the game!`);
        }
        else if(checkForTie(GameBoard.gameBoard)){
            gameOver=true;
            DisplayController.renderMessage('It\'s a tie');
        }

        currentPlayerIndex= currentPlayerIndex === 0 ? 1 : 0;
    }

    const restart = function(){
        for(let i=0;i<GameBoard.gameBoard.length;i++){
            GameBoard.gameBoard[i]="";
        }
        DisplayController.renderMessage('Game restarted');
        gameOver=false;
        GameBoard.renderBoard();
    }

    return {
        start,
        handleTurn,
        restart
    };
}
)();

function checkForWin(board){
    const winningCombination=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    // winningCombination.forEach(element => {
    //     const [a,b,c]=element;
    //     if(board[a]!=="" && board[a]===board[b] && board[b]===board[c]){
    //         return true;
    //     }
    // });

    for(let i=0;i<winningCombination.length;i++){
        const [a,b,c]=winningCombination[i];
        if(board[a]!=="" && board[a]===board[b] && board[b]===board[c]){
            return true;
        }
    }

    return false;
}

function checkForTie(board){
    const check=board.find(x => x === "")
    if(check===undefined){
        return true;
    }
    else{
        return false;
    }
}