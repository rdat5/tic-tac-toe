// main.js
const symX = "⛌";
const symO = "◯";

const gameBoard = (() =>
{
    const board = [ [null, null, null], 
                    [null, null, null], 
                    [null, null, null] ];
    const printboard = () =>
    {
        for (let i = 0; i < board.length; i++)
        {
            let line = "";
            for (let j = 0; j < board[i].length; j++)
            {
                let symbol;

                if (board[i][j] !== null)
                {
                    symbol = board[i][j];
                }
                else
                {
                    symbol = " ";
                }

                line += "[ " + symbol + " ]";
            }
            console.log(line);
            if (i < 2)
            {
                console.log('---------------');
            }
        }
    };

    const getMark = (row, column) =>
    {
        return board[row][column];
    }
    
    const setMark = (row, column, symbol) =>
    {
        if (getMark(row, column) === null)
        {
            board[row][column] = symbol;
            return true;
        }
        else
        {
            return false;
        }
    }

    const clearBoard = () =>
    {
        for (let i = 0; i < board.length; i++)
        {
            for (let j = 0; j < board[i].length; j++)
            {
                setMark(i, j, null);
            }
        }
    }

    return {
        board,
        printboard,
        getMark,
        setMark,
        clearBoard,
    }
})();

const Player = (name, mark) =>
{
    return {
        name,
        mark,
    }
}

const game = (() =>
{
    const allButtons = document.querySelectorAll('.gameboard-wrapper button');
    const startButton = document.querySelector('.game-start-btn');

    let gameInProgress = false;
    let player1;
    let player2;
    let currentPlayer;
    
    // button setup
    for (let i = 0; i < allButtons.length; i++)
    {
        allButtons[i].addEventListener("click", function()
        {
            let cellRow = allButtons[i].getAttribute('data-row');
            let cellCol = allButtons[i].getAttribute('data-col');
            
            if (gameInProgress)
            {
                if (gameBoard.setMark(cellRow, cellCol, currentPlayer.mark))
                {
                    // change turns
                    console.log("eh");
                }
                gameBoard.printboard();
            }
        });
    }

    startButton.addEventListener("click", function()
    {
        gameInProgress = true;
        player1 = Player("ray", symX);
        player2 = Player("bepis", symO);

        currentPlayer = player2;
    })


    // button setup

})();