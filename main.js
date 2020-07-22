import Snake from './util/snake.js'
import Point from './util/point.js'

const NUM_ROWS = 7;
const NUM_COLS = 7;
const SNAKE_START_LENGTH = 3;
const DIRECTIONS = {
  'up': {
    i: -1,
    j: 0
  },
  'down': {
    i: 1,
    j: 0
  },
  'left': {
    i: 0,
    j: -1
  },
  'right': {
    i: 0,
    j: 1
  }
}
const snake = new Snake();
const board = []
let lastDirection = null
let pendingDirection = "right"
let count = 0;

const init = () => {
  const grid = document.querySelector("#grid");
  grid.style.gridTemplateColumns = `repeat(${NUM_COLS}, 1fr)`;
  for (let i = 0; i < NUM_ROWS; i++) {
    const row = [];
    for (let j = 0; j < NUM_COLS; j++) {
      const square = document.createElement('div');
      const squareSize = Math.min(window.innerWidth, window.innerHeight) * (3 / 4) / NUM_COLS;
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
        const squareSize = Math.min(window.innerWidth, window.innerHeight) * (3 / 4) / NUM_COLS;
        board[i][j].style.width = squareSize;
        board[i][j].style.height = squareSize;
      }
    }
  });

  window.addEventListener('keydown', (event) => {
    switch (event.key) {
      case "ArrowLeft":
        pendingDirection = 'left'
        break;
      case "ArrowRight":
        pendingDirection = 'right'
        break;
      case "ArrowUp":
        pendingDirection = 'up'
        break;
      case "ArrowDown":
        pendingDirection = 'down'
        break;
    }
  })
}

const moveSnake = () => {
  const head = snake.peek()
  debugger
  const direction = DIRECTIONS[pendingDirection]
  debugger
  snake.add(new Point(head.x + direction.j, head.y + direction.i))
  debugger
  snake.pop()
  const check = snake.arr
  debugger
}

const drawBoard = () => {
  for (let i = 0; i < NUM_ROWS; i++) {
    for (let j = 0; j < NUM_COLS; j++) {
      if (snake.contains(new Point(i, j))) {
        board[i][j].classList.add("snake")
      } else {
        board[i][j].classList.remove("snake")
      }
    }
  }
}

const loop = () => {
  console.log(count++);
  moveSnake();
  drawBoard();
  setTimeout(loop, 1000)
}

init();
loop();