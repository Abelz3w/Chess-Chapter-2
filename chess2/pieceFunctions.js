// Returns the possible moves given the board and position


function rookCalc(board, positionX, positionY, color) {
    // X, Y, Takeable
    let possibleMoves = [];
    // up
    let y = positionY - 1;
    while (y >= 0 && board[y][positionX] == "  ") {
        possibleMoves.push([positionX, y, false]);
        y--;
    }

    if (y >= 0 && board[y][positionX][0] != color && board[y][positionX][0] != "X") {
        possibleMoves.push([positionX, y, true]);
    }
    y = positionY + 1;
    // down
    while (y < board.length && board[y][positionX] == "  ") {

        possibleMoves.push([positionX, y, false]);
        y++;
    }

    if (y < board.length && board[y][positionX][0] != color && board[y][positionX][0] != "X") {
        possibleMoves.push([positionX, y, true]);
    }

    // left
    let x = positionX - 1
    while (x >= 0 && board[positionY][x] == "  ") {
        possibleMoves.push([x, positionY, false]);
        x--;
    }
    if (x >= 0 && board[x][positionY][0] != color && board[x][positionY][0] != "X") {
        possibleMoves.push([x, positionY, true]);
    }

    // right
    x = positionX + 1
    while (x < board[positionY].length && board[positionY][x] == "  ") {
        possibleMoves.push([x, positionY, false]);
        x++;
    }
    if (x < board[positionY].length && board[x][positionY][0] != color && board[x][positionY][0] != "X") {
        possibleMoves.push([x, positionY, true]);
    }

    return possibleMoves;
}
