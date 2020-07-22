import Snake from './util/snake.js'
import Point from './util/point.js'

const NUM_ROWS = 20;
const NUM_COLS = 20;
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
const snake = new Snake();
const board = []
window.board = board;
let lastDirection = "right"
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
  for (let i = SNAKE_START_LENGTH - 1; i >= 0; i--) {
    const point = new Point(middleI, middleJ - i);
    snake.add(point)
  }

  spawnApple()

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
        if (lastDirection !== 'right') {
          pendingDirection = 'left'
        }
        break;
      case "ArrowRight":
        if (lastDirection !== 'left') {
          pendingDirection = 'right'
        }
        break;
      case "ArrowUp":
        if (lastDirection !== 'down') {
          pendingDirection = 'up'
        }
        break;
      case "ArrowDown":
        if (lastDirection !== 'up') {
          pendingDirection = 'down'
        }
        break;
    }
  })
  document.querySelector('#step').addEventListener('click', loop)
}

const moveSnake = () => {
  const head = snake.peek()
  const direction = DIRECTIONS[pendingDirection]
  const newHead = new Point(head.x + direction.i, head.y + direction.j);
  lastDirection = pendingDirection;

  snake.add(newHead)
  if (newHead.inBounds(0, NUM_COLS, 0, NUM_ROWS) && board[newHead.x][newHead.y].classList.contains('apple')) {
    board[newHead.x][newHead.y].classList.remove('apple')
    spawnApple();
  } else {
    snake.remove()
  }
}

const validateBoardState = () => {
  const head = snake.peek()
  if (!head.inBounds(0, NUM_COLS, 0, NUM_ROWS)) {
    return false;
  }
  if (snake.eatSelf()) {
    return false;
  }
  return true;
}

const spawnApple = () => {
  const emptySquares = (NUM_COLS * NUM_ROWS) - snake.size();
  const appleIdx = Math.floor(Math.random() * emptySquares);

  let currentIdx = 0
  searchLoop:
  for (let i = 0; i < NUM_ROWS; i++) {
    for (let j = 0; j < NUM_COLS; j++) {
      if (!board[i][j].classList.contains('snake')) {
        currentIdx += 1
      }

      if (currentIdx === appleIdx) {
        board[i][j].classList.add('apple')
        break searchLoop;
      }
    }
  }
}

const drawBoard = () => {
  for (let i = 0; i < NUM_ROWS; i++) {
    for (let j = 0; j < NUM_COLS; j++) {
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

const loop = () => {
  console.log(count++);
  moveSnake();
  if (validateBoardState()) {
    drawBoard();
    setTimeout(loop, 200)
  } else {
    console.log('hello')
  }
}

init();
loop();

