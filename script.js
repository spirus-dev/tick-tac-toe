const DisplayController = (function(){
    const renderMessage = function(message){
        messageBox.innerText=message
    }

    return{
        renderMessage
    };
})();

const GameBoard = (function(){
    let gameBoard = ["","","","","","","","",""];

    const renderBoard = function(){
        for (let index = 0; index < gameBoard.length; index++) {
            boxes[index].innerText=gameBoard[index];            
        }
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
            Player('Player X','X'),
            Player('Player O','O')
        ];
        currentPlayerIndex = 0;
        DisplayController.renderMessage(`${players[currentPlayerIndex].marker}'s turn`)
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
            DisplayController.renderMessage(`${players[currentPlayerIndex].marker} won the game!`);
            return;
        }
        else if(checkForTie(GameBoard.gameBoard)){
            gameOver=true;
            DisplayController.renderMessage('It\'s a tie, please restart the game to play again');
            return;
        }

        currentPlayerIndex= currentPlayerIndex === 0 ? 1 : 0;
        DisplayController.renderMessage(`${players[currentPlayerIndex].marker}'s turn`)
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

const messageBox = document.querySelector('.message');
const boxes=document.querySelectorAll('.box');
boxes.forEach(element => {
    element.addEventListener('click',handleClick)
});

function handleClick(event){
    const index=Number(event.srcElement.dataset.index);
    Game.handleTurn(index);
}

const reset=document.querySelector('#reset');
reset.addEventListener('click',handleReset);

function handleReset(event){
    Game.restart();
}

Game.start();