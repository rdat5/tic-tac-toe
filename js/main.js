// main.js
const gameBoard = (() =>
{
    const board = [ [" ", " ", " "], 
                    [" ", " ", " "], 
                    [" ", " ", " "] ];
    const printboard = () =>
    {
        for (let i = 0; i < board.length; i++)
        {
            let line = "";
            for (let j = 0; j < board[i].length; j++)
            {
                line += "[ " + board[i][j] + " ]";
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
        board[row][column] = symbol;
    }

    const clearBoard = () =>
    {
        for (let i = 0; i < board.length; i++)
        {
            for (let j = 0; j < board[i].length; j++)
            {
                setMark(i, j, " ");
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