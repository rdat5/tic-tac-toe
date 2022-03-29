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
                board[i][j] = null;
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

    const isDraw = () =>
    {
        let drawFound = true;

        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                if (getMark(i, j) === null)
                {
                    drawFound = false
                }
            }
        }

        return drawFound;
    }
    
    return {
        board,
        printboard,
        getMark,
        setMark,
        clearBoard,
        isWinFound,
        isDraw,
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
    const gameEndMsgCont = document.querySelector('.game-end-message');
    const gameEndMsg = document.querySelector('.game-end-message p');
    const p1NameElem = document.querySelector('.player1-card .player-name');
    const p2NameElem = document.querySelector('.player2-card .player-name');
    const p1NameInput = document.querySelector('#p1nameinp');
    const p2NameInput = document.querySelector('#p2nameinp');
    const p1Card = document.querySelector('.player1-card');
    const p2Card = document.querySelector('.player2-card');

    let gameInProgress = false;
    let player1 = Player("", symX);
    let player2 = Player("", symO);
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
                else
                {
                    allButtons[index].textContent = " ";
                }
                index++;
            }
        }
    }

    const showCurrentPlayer = () =>
    {
        if (currentPlayer === player1)
        {
            console.log(player1.name + "'s turn");
            p1Card.style.border = "4px solid var(--accent1)"; 
            p1Card.style.backgroundColor = "var(--accent1)"; 
            p1Card.style.boxShadow = "0 0 5px var(--accent1)";
            p2Card.style.border = "none";
            p2Card.style.backgroundColor = "transparent";
            p2Card.style.boxShadow = "none";
        }
        else if (currentPlayer === player2)
        {
            console.log(player2.name + "'s turn")
            p2Card.style.border = "4px solid var(--accent2)";
            p2Card.style.backgroundColor = "var(--accent2)";
            p2Card.style.boxShadow = "0 0 5px var(--accent2)";
            p1Card.style.border = "none";
            p1Card.style.backgroundColor = "transparent"; 
            p1Card.style.boxShadow = "none";
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
                        gameEndMsgCont.style.visiblity = "visible";
                        gameEndMsg.textContent = currentPlayer.name + 
                                "[" + currentPlayer.mark + "]" + " won!";
                        p1NameInput.style.display = "block";
                        p2NameInput.style.display = "block";
                        p1NameElem.style.display = "none";
                        p2NameElem.style.display = "none";
                        p1Card.style.border = "none";
                        p1Card.style.backgroundColor = "transparent"; 
                        p1Card.style.boxShadow = "none";
                        p2Card.style.border = "none";
                        p2Card.style.backgroundColor = "transparent";
                        p2Card.style.boxShadow = "none";

                    }
                    else if (gameBoard.isDraw())
                    {
                        gameInProgress = false;
                        console.log("It's a draw!");
                        gameEndMsgCont.style.visiblity = "visible";
                        gameEndMsg.textContent = "It's a draw!";
                        p1NameInput.style.display = "block";
                        p2NameInput.style.display = "block";
                        p1NameElem.style.display = "none";
                        p2NameElem.style.display = "none";
                        p1Card.style.border = "none";
                        p1Card.style.backgroundColor = "transparent"; 
                        p1Card.style.boxShadow = "none";
                        p2Card.style.border = "none";
                        p2Card.style.backgroundColor = "transparent";
                        p2Card.style.boxShadow = "none";
                    }
                    else
                    {
                        togglePlayer();
                        showCurrentPlayer();
                    }
                }
                displayBoard();
            }
            displayBoard();
        });
    }

    startButton.addEventListener("click", function()
    {
        gameInProgress = true;
        gameBoard.clearBoard();
        displayBoard();

        player1.name = p1NameInput.value;
        player2.name = p2NameInput.value;
        p1NameElem.textContent = player1.name;
        p2NameElem.textContent = player2.name;
        p1NameInput.value = "";
        p2NameInput.value = "";

        let randomResult = Math.floor(Math.random() * 2);
        if (randomResult === 0)
        {
            currentPlayer = player1;
        }
        else
        {
            currentPlayer = player2;
        }
        showCurrentPlayer();
        gameEndMsgCont.style.visiblity = "hidden";
        p1NameInput.style.display = "none";
        p2NameInput.style.display = "none";
        p1NameElem.style.display = "block";
        p2NameElem.style.display = "block";
    })    
})();