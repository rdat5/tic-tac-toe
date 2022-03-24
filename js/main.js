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