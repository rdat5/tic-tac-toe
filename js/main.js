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

    const isWinFound = () =>
    {
        let winFound = false;

        for (let i = 0; i < 3; i++)
        {
            // Check each row
            if (getMark(i, 0) === getMark(i, 1) && getMark(i, 0) == getMark(i, 2))
            {
                if (getMark(i, 0) !== null)
                {
                    winFound = true;
                }
            }

            // Check each column
            if (getMark(0, i) === getMark(1, i) && getMark(0, i) == getMark(2, i))
            {
                if (getMark(0, i) !== null)
                {
                    winFound = true;
                }
            }
        }

        // Check diagonals
        if (getMark(0, 0) === getMark(1, 1) && getMark(0, 0) == getMark(2, 2))
        {
            if (getMark(0, 0) !== null)
            {
                winFound = true;
            }
        }

        if (getMark(0, 2) === getMark(1, 1) && getMark(0, 2) == getMark(2, 0))
        {
            if (getMark(0, 2) !== null)
            {
                winFound = true;
            }
        }

        return winFound;
    }

    return {
        board,
        printboard,
        getMark,
        setMark,
        clearBoard,
        isWinFound,
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
    
    const togglePlayer = () =>
    {
        if (currentPlayer === player1)
        {
            currentPlayer = player2;
        }
        else if (currentPlayer === player2)
        {
            currentPlayer = player1
        }
    }

    const displayBoard = () =>
    {
        let index = 0;
        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                if (gameBoard.getMark(i, j) !== null)
                {
                    allButtons[index].textContent = gameBoard.getMark(i, j);
                }
                index++;
            }
        }
    }

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
                    if (gameBoard.isWinFound())
                    {
                        gameInProgress = false;
                        console.log(currentPlayer.name + " won!");
                    }
                    togglePlayer();
                }
                displayBoard();

            }
        });
    }

    startButton.addEventListener("click", function()
    {
        gameInProgress = true;

        player1 = Player("ray", symX);
        player2 = Player("bepis", symO);

        let randomResult = Math.floor(Math.random() * 2);
        if (randomResult === 0)
        {
            currentPlayer = player1;
        }
        else
        {
            currentPlayer = player2;
        }
        console.log("Current player is now: " + currentPlayer.name);
    })

})();