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

function drawSquare(x,y,color) {
  ctx.fillStyle = color;
  ctx.fillRect(x*SQ, y*SQ, 50, 50);

  ctx.strokeStyle = "BLACK";
  ctx.strokeRect(x*SQ, y*SQ, 50, 50);
}

drawSquare(0,0,"purple");