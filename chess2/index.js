const canvas = document.getElementById('GameBoard');

canvas.addEventListener('mousedown', function(e) {
    selectPiece(canvas, e)
})
document.addEventListener('mousemove', function(e) {
    checkHover(canvas, e)
})
document.addEventListener('mouseup', function(e) {
    placeDraggedPeice(canvas, e)
})
let xDim = 8;
let yDim = 8;
let boardHeight = 500;
let boardWidth = 500;
let turn = "W"
let dragging = false;
canvas.width = boardWidth;
canvas.height = boardHeight;
let fillRatio = .75;
let selected = [-1, -1];
let draggedCoords = [0, 0];
let possibleMoves = [];
let pieceImages = {
    BR: new Image(),
    BN: new Image(),
    BB: new Image(),
    BQ: new Image(),
    BK: new Image(),
    BP: new Image(),
    WR: new Image(),
    WN: new Image(),
    WB: new Image(),
    WQ: new Image(),
    WK: new Image(),
    WP: new Image()
}
pieceImages.BR.src = "images/Pieces/BR.png";
pieceImages.BN.src = "images/Pieces/BN.png";
pieceImages.BB.src = "images/Pieces/BB.png";
pieceImages.BQ.src = "images/Pieces/BQ.png";
pieceImages.BK.src = "images/Pieces/BK.png";
pieceImages.BP.src = "images/Pieces/BP.png";
pieceImages.WR.src = "images/Pieces/WR.png";
pieceImages.WN.src = "images/Pieces/WN.png";
pieceImages.WB.src = "images/Pieces/WB.png";
pieceImages.WQ.src = "images/Pieces/WQ.png";
pieceImages.WK.src = "images/Pieces/WK.png";
pieceImages.WP.src = "images/Pieces/WP.png";
let board = [
    ["BR", "BN", "BB", "BQ", "BK", "BB", "BN", "BR"],
    ["BP", "BP", "BP", "BP", "BP", "  ", "BP", "BP"],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "WP", "  ", "  ", "  ", "  ", "  "],
    ["  ", "WP", "WR", "  ", "  ", "BP", "  ", "  "],
    ["  ", "  ", "WP", "  ", "  ", "  ", "  ", "  "],
    ["WP", "  ", "  ", "  ", "WP", "WP", "WP", "WP"],
    ["WR", "WN", "  ", "WQ", "WK", "WB", "WN", "WR"],
];

function draw() {
    const ctx = canvas.getContext("2d");
    for (let h = 0; h < yDim; h++) {

        for (let w = 0; w < xDim; w++) {
            if ((w % 2 == 0 && h % 2 == 0) || (w % 2 == 1 && h % 2 == 1)) ctx.fillStyle = "#922724";
            else ctx.fillStyle = "#F1D0AA";


            ctx.fillRect((boardWidth / xDim) * w, (boardHeight / yDim) * h, boardWidth / xDim, boardHeight / yDim);

        }
    }

    // draw possible moves
    if(possibleMoves != undefined && possibleMoves.length > 0){
        possibleMoves.forEach(pMove => {
            if(!pMove[2]){
                console.log("ay")
                ctx.fillStyle = "green"; 
                ctx.fillRect((boardWidth / xDim) * pMove[0] + boardWidth / xDim * ((1 - fillRatio) / 2), (boardHeight / yDim) * pMove[1] + boardHeight / yDim * ((1 - fillRatio) / 2), boardWidth / xDim * fillRatio, boardHeight / yDim * fillRatio)
    
            }
    
        })
    }
    

    // Draw peices
    for (let h = 0; h < yDim; h++) {

        for (let w = 0; w < xDim; w++) {
            if (!(dragging && selected[0] == w && selected[1] == h) && board[h][w][0] != " " && board[h][w][0] != "X") {
                ctx.drawImage(pieceImages[board[h][w]], (boardWidth / xDim) * w + boardWidth / xDim * ((1 - fillRatio) / 2), (boardHeight / yDim) * h + boardHeight / yDim * ((1 - fillRatio) / 2), boardWidth / xDim * fillRatio, boardHeight / yDim * fillRatio)
            } else if (board[h][w][0] == "X") {
                ctx.fillStyle = "#000000";
                ctx.fillRect((boardWidth / xDim) * w, (boardHeight / yDim) * h, boardWidth / xDim, boardHeight / yDim);


            } else if (dragging && selected[0] == w && selected[1] == h) {
                ctx.drawImage(pieceImages[board[h][w]], draggedCoords[0] - boardWidth / xDim * ((1 - fillRatio)) * 2, draggedCoords[1] - boardHeight / yDim * ((1 - fillRatio)) * 2, boardWidth / xDim * fillRatio, boardHeight / yDim * fillRatio)

            }
        }
    }

    
}

function drawPeiceOnMouse(canvas, event) {

}

function selectPiece(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    let xSquare = Math.floor((x / boardWidth) * xDim);
    let ySquare = Math.floor((y / boardHeight) * yDim);

    if (board[ySquare][xSquare][0] != " " && board[ySquare][xSquare][0] != "X") {
        dragging = true;
        selected = [xSquare, ySquare]
        draggedCoords[0] = x;
        draggedCoords[1] = y;

        if(board[ySquare][xSquare][1] == "R"){
            possibleMoves = rookCalc(board, xSquare, ySquare, board[ySquare][xSquare][0])
            
        }else{
            possibleMoves = [];
        }
    }else{
        selected =  [-1, -1];
        possibleMoves = [];

    }
}

function checkHover(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    let xSquare = Math.floor((x / boardWidth) * xDim);
    let ySquare = Math.floor((y / boardHeight) * yDim);
    if (dragging) {
        draggedCoords[0] = x;
        draggedCoords[1] = y;
    }
    if (!(0 <= xSquare && xSquare < xDim) || !(0 <= ySquare && ySquare < yDim)) {
        return false;
    }
    if (board[ySquare][xSquare][0] != " " && board[ySquare][xSquare][0] != "X") {
        document.getElementsByTagName("body")[0].style.cursor = 'grab';
    } else {
        document.getElementsByTagName("body")[0].style.cursor = 'auto';
    }
}

function placeDraggedPeice(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    let xSquare = Math.floor((x / boardWidth) * xDim);
    let ySquare = Math.floor((y / boardHeight) * yDim);
    dragging = false
}
setInterval(draw, 10);
