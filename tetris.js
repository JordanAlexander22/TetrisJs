const cvs = document.getElementById("Tetris");
const ctx = cvs.getContext("2d");

const ROW = 20;
const COL = (COLUMN = 10);
const SQ = (squareSize = 20);
const VACANT = "WHITE"; //color of the empty square

// draw a square on the canvas

// ctx.fillStyle = "red";
// ctx.fillRect(0, 0, 50, 50);

// ctx.strokeStyle = "BLACK";
// ctx.strokeRect(0, 0, 50, 50);

// create a function to make above code reuseable ^

function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * SQ, y * SQ, SQ, SQ);

  ctx.strokeStyle = "BLACK";
  ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
};

// time to create the board

let board = [];
for (r = 0; r < ROW; r++) {
  board[r] = [];
  for (c = 0; c < COL; c++) {
    board[r][c] = VACANT;
  }
}

//need to draw board to the canvas
function drawBoard() {
  for (r = 0; r < ROW; r++) {
    for (c = 0; c < COL; c++) {
      drawSquare(c,r,board[r][c]);
    }
  }
};

drawBoard();

//object piece 

function Piece(tetromino, color){
    this.tetromino= tetromino;
    this.color= color;

    this.tetrominoNum= 0;  // starting from first pattern
    this.activeTetromino= this.tetromino[this.tetrominoNum];

    // must implement control of pieces 
}

