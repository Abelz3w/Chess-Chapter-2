// Returns the possible moves given the board and position


function rookCalc(board, positionX, positionY, color, ignoreColor = false) {
    if (color != board[positionY][positionX][0] && !ignoreColor) return [];
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
    if (!ignoreColor) possibleMoves = putsKingInDanger(board, color, possibleMoves, positionX, positionY)

    return possibleMoves;
}

function pawnCalc(board, positionX, positionY, direction, turn, lastMove, doubleJump, ignoreColor = false) {
    let possibleMoves = [];

    if (board[positionY][positionX][0] != turn && !ignoreColor) return [];
    if (direction == "up") {
        if (positionY > 0 && board[positionY - 1][positionX] == "  ") {
            possibleMoves.push([positionX, positionY - 1, false]);
        }
        if (positionX > 0 && positionY > 0 && board[positionY - 1][positionX - 1][0] != turn && board[positionY - 1][positionX - 1][0] != " ") {
            possibleMoves.push([positionX - 1, positionY - 1, true]);
        }
        if (positionX < board[positionY].length - 1 && positionY > 0 && board[positionY - 1][positionX + 1][0] != turn && board[positionY - 1][positionX + 1][0] != " ") {
            possibleMoves.push([positionX + 1, positionY - 1, true]);
        }
        if (doubleJump) {
            if (positionY > 1 && board[positionY - 2][positionX] == "  " && board[positionY - 1][positionX] == "  ") {
                possibleMoves.push([positionX, positionY - 2, false]);
            }
        }
        if (lastMove[4][1] == "P" && lastMove[4][0] != turn) {
            if (lastMove[3] - lastMove[1] == 2 && lastMove[3] == positionY && (lastMove[0] + 1 == positionX || lastMove[0] - 1 == positionX)) {
                possibleMoves.push([lastMove[0], positionY - 1, true, lastMove[2], lastMove[3]]);
            }
        }
    } else if (direction == "down") {
        if (positionY < board.length - 1 && board[positionY + 1][positionX] == "  ") {
            possibleMoves.push([positionX, positionY + 1, false]);
        }
        if (positionX > 0 && positionY < board.length - 1 && board[positionY + 1][positionX - 1][0] != turn && board[positionY + 1][positionX - 1][0] != " ") {
            possibleMoves.push([positionX - 1, positionY + 1, true]);

        }
        if (positionY < board[positionY].length - 1 && positionX < board.length - 1 && board[positionY + 1][positionX + 1][0] != turn && board[positionY + 1][positionX + 1][0] != " ") {
            possibleMoves.push([positionX + 1, positionY + 1, true]);
        }
        if (doubleJump) {
            if (positionY < board[positionY].length - 2 && board[positionY + 2][positionX] == "  " && board[positionY + 1][positionX] == "  ") {
                possibleMoves.push([positionX, positionY + 2, false]);
            }
        }
        if (lastMove[4][1] == "P" && lastMove[4][0] != turn) {
            if (lastMove[1] - lastMove[3] == 2 && lastMove[3] == positionY && (lastMove[0] + 1 == positionX || lastMove[0] - 1 == positionX)) {
                possibleMoves.push([lastMove[0], positionY + 1, true, lastMove[2], lastMove[3]]);
            }
        }
    }

    if (!ignoreColor) possibleMoves = putsKingInDanger(board, turn, possibleMoves, positionX, positionY)

    return possibleMoves
}

function knightCalc(board, positionX, positionY, color, ignoreColor = false) {
    possibleMoves = [];
    if (color != board[positionY][positionX][0] && !ignoreColor) {
        return [];
    }
    // top and bottom
    if (positionY > 1) {
        if (positionX > 0 && board[positionY - 2][positionX - 1][0] != color) {
            possibleMoves.push([positionX - 1, positionY - 2, board[positionY - 2][positionX - 1][0] != " "]);

        }
        if (positionX < board[positionY].length - 1 && board[positionY - 2][positionX + 1][0] != color) {
            possibleMoves.push([positionX + 1, positionY - 2, board[positionY - 2][positionX + 1][0] != " "]);

        }
    }
    if (positionY < board.length - 2) {
        if (positionX > 0 && board[positionY + 2][positionX - 1][0] != color) {
            possibleMoves.push([positionX - 1, positionY + 2, board[positionY + 2][positionX - 1][0] != " "]);

        }
        if (positionX < board[positionY].length - 1 && board[positionY + 2][positionX + 1][0] != color) {
            possibleMoves.push([positionX + 1, positionY + 2, board[positionY + 2][positionX + 1][0] != " "]);

        }
    }
    // left and right
    if (positionX > 1) {
        if (positionY > 0 && board[positionY - 1][positionX - 2][0] != color) {
            possibleMoves.push([positionX - 2, positionY - 1, board[positionY - 1][positionX - 2][0] != " "]);

        }
        if (positionY < board[positionY].length - 1 && board[positionY + 1][positionX - 2][0] != color) {
            possibleMoves.push([positionX - 2, positionY + 1, board[positionY + 1][positionX - 2][0] != " "]);

        }
    }
    if (positionX < board[positionY].length - 2) {
        if (positionY > 0 && board[positionY - 1][positionX + 2][0] != color) {
            possibleMoves.push([positionX + 2, positionY - 1, board[positionY - 1][positionX + 2][0] != " "]);

        }
        if (positionY < board.length - 1 && board[positionY + 1][positionX + 2][0] != color) {
            possibleMoves.push([positionX + 2, positionY + 1, board[positionY + 1][positionX + 2][0] != " "]);

        }
    }
    if (!ignoreColor) possibleMoves = putsKingInDanger(board, color, possibleMoves, positionX, positionY)

    return possibleMoves;
}

function bishopCalc(board, positionX, positionY, color, ignoreColor = false) {
    possibleMoves = [];

    if (color != board[positionY][positionX][0] && !ignoreColor) {
        return possibleMoves;
    }

    // Top right

    let maxY = board.length - 1;
    let maxX = board[0].length - 1;

    let tempX = positionX;
    let tempY = positionY;

    while (tempX++ < maxX && tempY-- > 0 && board[tempY][tempX] == "  ") {
        possibleMoves.push([tempX, tempY, false]);
    }

    if (tempY >= 0 && tempX <= maxX && board[tempY][tempX][0] != color) {
        possibleMoves.push([tempX, tempY, true]);
    }

    tempX = positionX;
    tempY = positionY;

    while (tempX-- > 0 && tempY-- > 0 && board[tempY][tempX] == "  ") {
        possibleMoves.push([tempX, tempY, false]);
    }

    if (tempY >= 0 && tempX >= 0 && board[tempY][tempX][0] != color) {
        possibleMoves.push([tempX, tempY, true]);
    }



    tempX = positionX;
    tempY = positionY;

    while (tempX++ < maxX && tempY++ < maxY && board[tempY][tempX] == "  ") {
        possibleMoves.push([tempX, tempY, false]);
    }

    if (tempY <= maxY && tempX <= maxX && board[tempY][tempX][0] != color) {
        possibleMoves.push([tempX, tempY, true]);
    }

    tempX = positionX;
    tempY = positionY;

    while (tempX-- > 0 && tempY++ < maxY && board[tempY][tempX] == "  ") {
        possibleMoves.push([tempX, tempY, false]);
    }

    if (tempY <= maxY && tempX > 0 && board[tempY][tempX][0] != color) {
        possibleMoves.push([tempX, tempY, true]);
    }
    if (!ignoreColor) possibleMoves = putsKingInDanger(board, color, possibleMoves, positionX, positionY)

    return possibleMoves
}

function queenCalc(board, positionX, positionY, color, ignoreColor = false) {
    if (!ignoreColor) {
        return bishopCalc(board, positionX, positionY, color).concat(rookCalc(board, positionX, positionY, color));
    } else {
        return bishopCalc(board, positionX, positionY, color, true).concat(rookCalc(board, positionX, positionY, color, true));

    }
}

function kingCalc(board, positionX, positionY, color, ignoreColor = false) {
    let possibleMoves = [];
    if (color != board[positionY][positionX][0] && !ignoreColor) {
        return possibleMoves;
    }
    if (positionY > 0) {
        if (color != board[positionY - 1][positionX][0]) {
            possibleMoves.push([positionX, positionY - 1, board[positionY - 1][positionX][0] != " "]);
        }
        if (positionX > 0 && color != board[positionY - 1][positionX - 1][0]) {
            possibleMoves.push([positionX - 1, positionY - 1, board[positionY - 1][positionX - 1][0] != " "]);

        }
        if (positionX < board[positionY - 1].length - 1 && color != board[positionY - 1][positionX + 1][0]) {
            possibleMoves.push([positionX + 1, positionY - 1, board[positionY - 1][positionX + 1][0] != " "]);

        }
    }

    if (positionY < board.length - 1) {
        if (color != board[positionY + 1][positionX][0]) {
            possibleMoves.push([positionX, positionY + 1, board[positionY + 1][positionX][0] != " "]);
        }
        if (positionX > 0 && color != board[positionY + 1][positionX - 1][0]) {
            possibleMoves.push([positionX - 1, positionY + 1, board[positionY + 1][positionX - 1][0] != " "]);

        }
        if (positionX < board[positionY + 1].length - 1 && color != board[positionY + 1][positionX + 1][0]) {
            possibleMoves.push([positionX + 1, positionY + 1, board[positionY + 1][positionX + 1][0] != " "]);

        }
    }

    if (positionX > 0) {
        if (color != board[positionY][positionX - 1][0]) {
            possibleMoves.push([positionX - 1, positionY, board[positionY][positionX - 1][0] != " "]);
        }
    }
    if (positionX < board[positionY].length - 1) {
        if (color != board[positionY][positionX + 1][0]) {
            possibleMoves.push([positionX + 1, positionY, board[positionY][positionX + 1][0] != " "]);
        }
    }

    // clean up moves that put the king into check
    if (!ignoreColor) possibleMoves = putsKingInDanger(board, color, possibleMoves, positionX, positionY)



    return possibleMoves
}

function putsKingInDanger(board, color, movesToCheck, positionX, positionY) {
    let workingMoves = [];

    // find kings

    movesToCheck.forEach(testMove => {
        let tempBoard = [];
        board.forEach(row => {
            tempBoard.push([]);
            row.forEach(piece => {
                tempBoard[tempBoard.length - 1].push(piece);
            })
        })

        tempBoard[testMove[1]][testMove[0]] = tempBoard[positionY][positionX];
        tempBoard[positionY][positionX] = "  ";

        let enemyControlledSquares = getEnemyMoves(tempBoard, color);
        let works = true;
        let kings = [];
        tempBoard.forEach((row, y) => {
                row.forEach((piece, x) => {
                    if (piece == color + "K") {
                        kings.push([x, y]);
                    }
                })
            })
            // check to see if the move puts the king in danger

        enemyControlledSquares.every(controlledSquare => {
            kings.forEach(king => {
                if (king[1] == controlledSquare[1] && king[0] == controlledSquare[0]) {
                    works = false;
                }
            })

            return works;

        })
        if (works) {
            workingMoves.push(testMove);
        }

    })


    return workingMoves;



}

function getEnemyMoves(board, color) {
    let enemyControlledSquares = [];
    board.forEach((row, ySquare) => {
        row.forEach((piece, xSquare) => {
            if (piece[0] != color && piece[0] != " ") {
                if (piece[1] == "R") {
                    let eMoves = rookCalc(board, xSquare, ySquare, "[", true);
                    enemyControlledSquares.push(...eMoves);
                } else if (piece[1] == "P") {
                    if (piece[0] == "W") {
                        let eMoves = pawnCalc(board, xSquare, ySquare, "up", "[", [0, 0, 0, 0, "  "], false, true);
                        enemyControlledSquares.push(...eMoves);

                    } else if (piece[0] == "B") {
                        let eMoves = pawnCalc(board, xSquare, ySquare, "down", "[", [0, 0, 0, 0, "  "], false, true);
                        enemyControlledSquares.push(...eMoves);

                    }
                } else if (piece[1] == "N") {
                    let eMoves = knightCalc(board, xSquare, ySquare, "[", true);
                    enemyControlledSquares.push(...eMoves);


                } else if (piece[1] == "B") {
                    let eMoves = bishopCalc(board, xSquare, ySquare, "[", true);
                    enemyControlledSquares.push(...eMoves);


                } else if (piece[1] == "Q") {
                    let eMoves = queenCalc(board, xSquare, ySquare, "[", true);
                    enemyControlledSquares.push(...eMoves);

                } else if (piece[1] == "K") {
                    let eMoves = kingCalc(board, xSquare, ySquare, "[", true);
                    enemyControlledSquares.push(...eMoves);


                }
            }
        })
    })
    return enemyControlledSquares
}
