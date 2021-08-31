var canvas = document.getElementById('game');
canvas.width = 400;
canvas.height = 400;
canvas.style.backgroundColor = 'black';
var context = canvas.getContext('2d');
// All objects in the game are built as multiples of the one
// basic square size. It's best if this number divides
// evenly into the canvas dimension (above).
var squareSize = 20;
var numSquares = canvas.width / squareSize;
var scoreBox = document.getElementById('scoreBox');
var score = 0;
var count = 0;

/**************************************************************/
// Please don't change code ABOVE this line
/**************************************************************/
document.body.style.backgroundColor = "#008080";
document.body.style.color = "#40e0d0";

// Game gets faster as the delay number goes down toward 1
// Make it bigger to go slower
var gameLoopDelay = 10;

// Snake can start with 1-n cells
var startingSnakeSize = 4;

// We can change how many points you get per apple eaten
var pointsPerApple = 5;

// Snake object defines head location, how big each move is, 
// starting color, and holds the list of all snake cells (body pieces)
// Snake always starts in the same place
var snake = {
  x: 160,
  y: 160,
  color: "#cc00cc",
  dx: squareSize,
  dy: 0,
  maxCells: startingSnakeSize,
  cells: []
};

// Apple object starts with a default location and color
var apple = {
  x: 0,
  y: 0,
  color: "#00ffff"
};
// But we give the apple a random location before the game starts
setNextRandomAppleLocation();

// game loop
function loop() {
  requestAnimationFrame(loop);
  // control game speed by skipping some number of animation frames
  if (++count < gameLoopDelay) {
    return;
  }

  // reset count each time do run through the game loop
  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);
  snake.x += snake.dx;
  snake.y += snake.dy;
  //console.log("snake head: "+snake.x+" "+snake.y);

  // In this version, the snake "wraps" at the edges of the
  // screen. In many versions of this game, he would die if 
  // he hits an edge. But we are too kind for that.
  if (snake.x < 0) {
    // snake head has gone off the board to the left
    snake.x = canvas.width - squareSize;
  } else if (snake.x >= canvas.width) {
    // snake head has gone off the board to the right
    snake.x = 0;
  } // else x is within the boundaries of the board, do nothing special
  if (snake.y < 0) {
    // snake head has gone off the board to the top
    snake.y = canvas.height - squareSize;
  } else if (snake.y >= canvas.height) {
    // snake head has gone off the board to the bottom
    snake.y = 0;
  } // else  y is within the borders of the board, do nothing special

  // Add a new cell to the front of the snake at the new
  // head location. This moves the snake one unit in whatever
  // direction he's going. "unshift" is javascript for
  // "insert at front".
  snake.cells.unshift({
    x: snake.x,
    y: snake.y
  });
  // To stay the same size as we move,
  // take the last cell off of the snake's tail.
  // If he's eating an apple, we'll make him longer down below.
  // "pop" is javascript for "remove from the end"
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  // We need to check the snake's head location to see if
  // it is "eating" the apple. If so, score goes up and 
  // snake grows.
  var head = snake.cells[0];
  // If the snake "eats" the apple, his head square will be drawn
  // where apple square was.
  // We will need to draw a new apple at a random spot.
  if (head.x === apple.x && head.y === apple.y) {
    // snake grows by one cell
    snake.maxCells++;
    score = score + pointsPerApple;
    setNextRandomAppleLocation();
  }

  // Now, let's check to see if the head is colliding with
  // any of the rest of the snake. If so, snake dies.
  // Start checking at cell 1, not 0 (the head).
  // Although we could probably start at 5 because of how
  // the snake has to wrap
  var i = 1;
  while (i < snake.cells.length) {
    if (head.x === snake.cells[i].x && head.y === snake.cells[i].y) {
      // collision! reset game
      snake.x = 160;
      snake.y = 160;
      snake.cells = [];
      snake.maxCells = 4;
      snake.dx = squareSize;
      snake.dy = 0;
      setNextRandomAppleLocation();
    }
    i = i + 1;
  }

  // Now we can draw the apple, new or old
  context.fillStyle = apple.color;
  context.fillRect(apple.x, apple.y, squareSize - 1, squareSize - 1);

  // And we can draw the snake
  context.fillStyle = snake.color;
  snake.cells.forEach(function(cell, index) {
    context.fillRect(cell.x, cell.y, squareSize - 1, squareSize - 1);
  });

  // update the score
  scoreBox.innerHTML = "Score: " + score;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function setNextRandomAppleLocation() {
  apple.x = getRandomInt(0, numSquares) * squareSize;
  apple.y = getRandomInt(0, numSquares) * squareSize;
}

// Handle arrow keys to change the snake's direction
// Snake travels left and right (delta x = dx)
// or up and down (delta y = dx)
// one square at a time.
document.addEventListener('keydown', function(e) {
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -squareSize;
    snake.dy = 0;
  } else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -squareSize;
    snake.dx = 0;
  } else if (e.which === 39 && snake.dx === 0) {
    snake.dx = squareSize;
    snake.dy = 0;
  } else if (e.which === 40 && snake.dy === 0) {
    snake.dy = squareSize;
    snake.dx = 0;
  }
  // else not a key we care about
});

// Start the game ball rolling.
// Tell the browser to call function loop over and over
requestAnimationFrame(loop);

