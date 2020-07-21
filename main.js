import Snake from './util/snake.js'
import Point from './util/point.js'

const NUM_ROWS = 7;
const NUM_COLS = 7;
const SNAKE_START_LENGTH = 3;
const DIRECTIONS = ['north', 'east', 'south', 'west']
const snake = new Snake();
const board = []
let direction = "east"
let count = 0;

const init = () => {
  const grid = document.querySelector("#grid");
  grid.style.gridTemplateColumns = `repeat(${NUM_COLS}, 1fr)`;
  for (let i = 0; i < NUM_ROWS; i++) {
    const row = [];
    for (let j = 0; j < NUM_COLS; j++) {
      const square = document.createElement('div');
      const squareSize = Math.min(window.innerWidth, window.innerHeight) * (3/4) / NUM_COLS;
      square.style.width = squareSize;
      square.style.height = squareSize;
      square.classList.add('square');
      square.dataset.i = i;
      square.dataset.j = j;
      grid.appendChild(square);
      row.push(square);
    }
    board.push(row)
  }
 
  const middleI = Math.floor(NUM_COLS / 2)
  const middleJ = Math.floor(NUM_ROWS / 2)
  for (let i = 0; i < SNAKE_START_LENGTH; i++) {
    const point = new Point(middleI, middleJ - i);
    snake.add(point)
    console.log("ADDED SNAKE PIECE")
  }

  window.addEventListener('resize', () => {
    const grid = document.querySelector("#grid");
    for (let i = 0; i < NUM_ROWS; i++) {
      for (let j = 0; j < NUM_COLS; j++) {
        const squareSize = Math.min(window.innerWidth, window.innerHeight) * (3/4) / NUM_COLS;
        board[i][j].style.width = squareSize;
        board[i][j].style.height = squareSize;
      }
    }
  });
}

const drawBoard = () => {
  for (let i = 0; i < NUM_ROWS; i++) {
    for (let j = 0; j < NUM_COLS; j++) {
      if (snake.contains(new Point(i, j))) {
        board[i][j].classList.add("snake")
      }
    }
  }
}

const loop = () => {
  console.log(count++);
  drawBoard();
  setTimeout(loop, 1000)
}

init();
loop();