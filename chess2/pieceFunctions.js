// Returns the possible moves given the board and position


function rookCalc(board, positionX, positionY, color) {
    if(color != board[positionY][positionX][0] ) return [];
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
    if (x >= 0 && board[positionY][x][0] != color && board[positionY][x][0] != "X") {
        possibleMoves.push([x, positionY, true]);
    }

    // right
    x = positionX + 1
    while (x < board[positionY].length && board[positionY][x] == "  ") {
        possibleMoves.push([x, positionY, false]);
        x++;
    }
    if (x < board[positionY].length && board[positionY][x][0] != color && board[positionY][x][0] != "X") {
        possibleMoves.push([x, positionY, true]);
    }

    return possibleMoves;
}
function pawnCalc(board, positionX, positionY, direction, turn){
    let possibleMoves = [];
    
    if(board[positionY][positionX][0] != turn) return [];
    if(direction == "up"){
        if(board[positionY-1][positionX] == "  "){
            possibleMoves.push([positionX, positionY-1, false]);
        }if(positionX > 0 && positionY >0 &&board[positionY-1][positionX-1][0] != turn && board[positionY-1][positionX-1][0] != " " ){
            possibleMoves.push([positionX-1, positionY-1, true]);

        }if(positionX < board[positionY].length && positionY >0 &&board[positionY-1][positionX+1][0] != turn && board[positionY-1][positionX+1][0] != " " ){
            possibleMoves.push([positionX+1, positionY-1, true]);

        }
    }
    return possibleMoves
}
