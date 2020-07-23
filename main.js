import Snake from './util/snake.js'
import Point from './util/point.js'

const SNAKE_START_LENGTH = 4;
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
const LEVELS = {
  'easy': {
    speed: 500,
    numCols: 10,
    numRows: 10,
  },
  'medium': {
    speed: 250,
    numCols: 15,
    numRows: 15,
  },
  'hard': {
    speed: 125,
    numCols: 20,
    numRows: 20,
  },
}
const FRUITS = [
  "./assets/apple.png",
  "./assets/banana.jpg",
  "./assets/grapes.png",
  "./assets/pear.jpg",
  "./assets/orange.png",
  "./assets/cherries.jpg",
  "./assets/melon.png",
]

const snake = new Snake();
window.snake = snake;
const board = []
window.board = board;
let lastDirection = "right"
let pendingDirection = "right"
let level = 'easy';
let paused = true;
let gameOver = false;

const fruit = document.createElement("img")
fruit.setAttribute('id', "fruit")

const init = () => {
  const { numCols, numRows } = LEVELS[level]
  const grid = document.querySelector("#grid");
  grid.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
  for (let i = 0; i < numRows; i++) {
    const row = [];
    for (let j = 0; j < numCols; j++) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.dataset.i = i;
      square.dataset.j = j;
      grid.appendChild(square);
      row.push(square);
    }
    board.push(row)
  }
  resizeGrid()

  spawnSnake();
  spawnFruit();
  updateScore();
  drawBoard();
  configureButtonsAndKeys();
}

const deinit = () => {
  const grid = document.querySelector("#grid");   // Remove whole grid
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
  board.splice(0, board.length);                  // Reset board
  snake.reset();                                  // Reset snake
  lastDirection = "right"
  pendingDirection = "right"
}

const keyEvents = (event) => {
  switch (event.key) {
    case "ArrowLeft":
      if (lastDirection !== 'right' && !paused) {
        pendingDirection = 'left'
      }
      break;
    case "ArrowRight":
      if (lastDirection !== 'left' && !paused) {
        pendingDirection = 'right'
      }
      break;
    case "ArrowUp":
      if (lastDirection !== 'down' && !paused) {
        pendingDirection = 'up'
      }
      break;
    case "ArrowDown":
      if (lastDirection !== 'up' && !paused) {
        pendingDirection = 'down'
      }
      break;
    case " ":
      paused = !paused;
      break;
  }
}

const resizeGrid = () => {
  const grid = document.querySelector("#grid");
  const gridSize = Math.min(window.innerWidth, window.innerHeight) * (2 / 3);
  grid.style.width = gridSize;
  grid.style.width = gridSize;
  for (let i = 0; i < LEVELS[level].numRows; i++) {
    for (let j = 0; j < LEVELS[level].numCols; j++) {
      board[i][j].style.width = gridSize / LEVELS[level].numCols;;
      board[i][j].style.height = gridSize / LEVELS[level].numCols;;
    }
  }
}

const updateScore = () => {
  document.querySelector('#data > p').textContent = snake.size() - SNAKE_START_LENGTH;
}

const configureButtonsAndKeys = () => {
  window.addEventListener('keydown', keyEvents);
  window.addEventListener('resize', resizeGrid);

  document.querySelectorAll('.reset').forEach((btn) => btn.addEventListener('click', resetGame))

  const easyBtn = document.querySelector('#easy')
  easyBtn.dataset.level = 'easy'
  easyBtn.addEventListener('click', resetGame)

  const mediumBtn = document.querySelector('#medium')
  mediumBtn.dataset.level = 'medium'
  mediumBtn.addEventListener('click', resetGame)

  const hardBtn = document.querySelector('#hard')
  hardBtn.dataset.level = 'hard'
  hardBtn.addEventListener('click', resetGame)

  document.querySelectorAll("button").forEach((item) => {
    item.addEventListener('focus', () => {
      item.blur();
    })
  })
}

const moveSnake = () => {
  const head = snake.peek()
  const direction = DIRECTIONS[pendingDirection]
  const newHead = new Point(head.x + direction.i, head.y + direction.j);
  lastDirection = pendingDirection;

  snake.add(newHead)
  if (newHead.inBounds(0, LEVELS[level].numCols, 0, LEVELS[level].numRows) && board[newHead.x][newHead.y].contains(fruit)) {
    board[newHead.x][newHead.y].removeChild(fruit)
    updateScore();
    spawnFruit();
  } else {
    snake.remove()
  }
}

const validateBoardState = () => {
  const head = snake.peek()
  if (!head.inBounds(0, LEVELS[level].numCols, 0, LEVELS[level].numRows)) {
    return false;
  }
  if (snake.eatSelf()) {
    return false;
  }
  return true;
}

const randomizeFruit = () => {
  fruit.setAttribute('src', FRUITS[(Math.floor(Math.random() * FRUITS.length))])
}

const spawnFruit = () => {
  const emptySquares = (LEVELS[level].numCols * LEVELS[level].numRows) - snake.size();
  const fruitIdx = Math.floor(Math.random() * emptySquares);

  let currentIdx = 0
  searchLoop:
  for (let i = 0; i < LEVELS[level].numRows; i++) {
    for (let j = 0; j < LEVELS[level].numCols; j++) {
      if (!board[i][j].classList.contains('snake')) {
        currentIdx += 1
      }

      if (currentIdx === fruitIdx) {
        randomizeFruit();
        board[i][j].appendChild(fruit)
        break searchLoop;
      }
    }
  }
}

const spawnSnake = () => {
  const { numCols, numRows } = LEVELS[level]
  const middleI = Math.floor(numCols / 2)
  const middleJ = Math.floor(numRows / 2)
  for (let i = SNAKE_START_LENGTH - 1; i >= 0; i--) {
    const point = new Point(middleI, middleJ - i);
    snake.add(point)
  }
}

const drawBoard = () => {
  for (let i = 0; i < LEVELS[level].numRows; i++) {
    for (let j = 0; j < LEVELS[level].numCols; j++) {
      const head = snake.peek();
      const temp = new Point(i, j)

      if (snake.contains(temp)) {
        if (head.equals(temp)) {
          board[i][j].classList.add("head")
        } else {
          board[i][j].classList.remove("head")
        }
        board[i][j].classList.add("snake")
      } else {
        board[i][j].classList.remove("snake")
      }

    }
  }
}

const resetGame = (e) => {
  if (e.target.dataset.level) {
    level = e.target.dataset.level;
  }
  gameOver = false;
  paused = true;

  deinit()
  init()
}

const loop = () => {
  if (!paused && !gameOver) {
    moveSnake();
    if (validateBoardState()) {
      drawBoard();
    } else {
      gameOver = true;
    }
  }
  setTimeout(loop, LEVELS[level].speed);
}

init();
loop();



