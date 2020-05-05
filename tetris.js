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
}

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
      drawSquare(c, r, board[r][c]);
    }
  }
}

drawBoard();

//piece colors

const PIECES = [
  [Z, "red"],
  [S, "yellow"],
  [T, "green"],
  [O, "blue"],
  [L, "purple"],
  [J, "orange"]
];

//generate a random piece

function randomPiece() {
  let r = Math.floor(Math.random()* PIECES.length) // will return numbers between 0-6
  return new Piece(PIECES[r][0], PIECES[r][1])
}

let p = randomPiece()

//object piece

function Piece(tetromino, color) {
  this.tetromino = tetromino;
  this.color = color;

  this.tetrominoNum = 0; // starting from first pattern
  this.activeTetromino = this.tetromino[this.tetrominoNum];

  // must implement control of pieces
  this.x = 3;
  this.y = -2;
}

// fill function 

Piece.prototype.fill = function(color){
  for( r = 0; r < this.activeTetromino.length; r++){
      for(c = 0; c < this.activeTetromino.length; c++){
          // we draw only occupied squares
          if( this.activeTetromino[r][c]){
              drawSquare(this.x + c,this.y + r, color);
          }
      }
  }
}

// draw a piece to the board

Piece.prototype.draw = function(){
  this.fill(this.color);
}

// undraw a piece from the board 
Piece.prototype.unDraw = function(){
  this.fill(VACANT);
}


// move down the piece 

Piece.prototype.moveDown = function () {
    if(!this.collision(0,1,this.activeTetromino)){
      this.unDraw();
      this.y++;
      this.draw(); 
    } else {
      //locking the piece and generating new one
      this.lock();
      p = randomPiece();
    }
   
}
drawBoard()

// piece is able to move right
Piece.prototype.moveRight = function () {
  if(!this.collision(1,0,this.activeTetromino)) {
    this.unDraw();
    this.x++;
    this.draw(); 
  } 
}


// piece is able to move left
Piece.prototype.moveLeft = function () {
  if(!this.collision(-1,0,this.activeTetromino)) {
    this.unDraw();
    this.x--;
    this.draw(); 
  } 
}


// rotating the piece
Piece.prototype.rotate = function () {
  let nextPattern = this.tetromino[(this.tetrominoNum+1)%this.tetromino.length]
  let kick = 0;

  if (this.collision(0,0,nextPattern)) {
    if(this.x > COL/2 ){
      // right wall
      kick = -1;
    } else{
      //left wall 
      kick = 1
    }
  }

  if(!this.collision(kick,0,nextPattern)) {
  this.unDraw();
  this.x += kick;
  this.tetrominoNum= (this.tetrominoNum+1)%this.tetromino.length; // (0+1)%4= 4
  this.activeTetromino= this.tetromino[this.tetrominoNum]
  this.draw();  
  } 
}

let score = 0;
Piece.prototype.lock = function(){
  for (r = 0; r < this.activeTetromino.length; r++){
    for (c = 0; c < this.activeTetromino.length; c++){
      //need to skip the vacant square
      if (!this.activeTetromino[r][c]){
        continue;
    }
      //lock on top results in loss
      if(this.y + r < 0){
        alert('game over!!');
        // stop the animations
        gameOver= true;
        break;
      }
      // lock the piece
      board[this.y + r][this.x + c] = this.color;
  }
}
//removing rows
for (r= 0; r< ROW; r++){
  let IsRowFull = true;
  for (c= 0; c<COL; c++){
    IsRowFull = IsRowFull && (board[r][c] != VACANT);
  }
  if(IsRowFull){
    // if the row is full be sure to move rows above it 
    for(y=r; y>1; y--){
      for(c=0; c<COL; c++){
        board[y][c] = board[y-1][c];
      }
    }
    for(c=0; c<COL; c++){
      board[0][c] = VACANT;
    }
    //need to increment score
    score +=10;
  }
  }
  //score updating
  drawBoard();

}

//collision detection 
Piece.prototype.collision = function(x,y,piece){
  for( r = 0; r < piece.length; r++){
      for(c = 0; c < piece.length; c++){
          // if the square is empty, we skip it
          if(!piece[r][c]){
              continue;
          }
          // coordinates of the piece after movement
          let newX = this.x + c + x;
          let newY = this.y + r + y;
          
          // conditions
          if(newX < 0 || newX >= COL || newY >= ROW){
              return true;
          }
          // skip newY < 0; board[-1] will crush our game
          if(newY < 0){
              continue;
          }
          // check if there is a locked piece alrady in place
          if( board[newY][newX] != VACANT){
              return true;
          }
      }
  }
  return false;
}

// Controlling the piece

document.addEventListener('keydown', CONTROL );

function CONTROL (event) {
  if (event.keyCode == 37) {
    p.moveLeft();
    dropStart = Date.now();
  } else if (event.keyCode == 38){
    p.rotate();
    dropStart = Date.now();
  } else if (event.keyCode == 39){
    p.moveRight();
    dropStart = Date.now();
  } else if (event.keyCode == 40){
    p.moveDown();
  }
}



// piece gets dropped every second 
let dropStart = Date.now();
let gameOver = false;
function drop () {
    let now = Date.now();
    let delta = now - dropStart;
    if (delta > 1000) {
        p.moveDown();
        dropStart = Date.now();
    }
    if(!gameOver){
      requestAnimationFrame(drop);
    } 
}

drop();