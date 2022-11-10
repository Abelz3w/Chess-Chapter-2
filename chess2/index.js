const canvas = document.getElementById('GameBoard');

canvas.addEventListener('mousedown', function(e) {
    selectPiece(canvas, e)
})
document.addEventListener('mousemove', function(e) {
    getCursorPosition(canvas, e)
})
let xDim = 8;
let yDim = 8;
let boardHeight = 500;
let boardWidth = 500;
let turn = "W"
canvas.width = boardWidth;
canvas.height = boardHeight;
let fillRatio = .75;
let selected = [-1, -1];
let possibleMoves;
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
            if (selected[0] != h && selected[1] != w && board[h][w][0] != " ") {
                ctx.drawImage(pieceImages[board[h][w]], (boardWidth / xDim) * w + boardWidth / xDim * ((1 - fillRatio) / 2), (boardHeight / yDim) * h + boardHeight / yDim * ((1 - fillRatio) / 2), boardWidth / xDim * fillRatio, boardHeight / yDim * fillRatio)
            }
        }
    }

}

function holdingPeice

function selectPiece(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    let xSquare = Math.floor((x / boardWidth) * xDim);
    let ySquare = Math.floor((y / boardHeight) * yDim);

    console.log("x: " + xSquare + " y: " + ySquare)
}

function checkHover(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    let xSquare = Math.floor((x / boardWidth) * xDim);
    let ySquare = Math.floor((y / boardHeight) * yDim);

    console.log("x: " + xSquare + " y: " + ySquare)
}

setInterval(draw, 500);