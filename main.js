import Queue from './util/queue.js'

const NUM_ROWS = 20;
const NUM_COLS = 32;

const board = []
let count = 0;

const init = () => {
  const grid = document.querySelector("#grid");
  grid.style.gridTemplateColumns = `repeat(${NUM_COLS}, 1fr)`;
  for (let i = 0; i < NUM_ROWS; i++) {
    const row = [];
    for (let j = 0; j < NUM_COLS; j++) {
      const square = document.createElement('div');
      const squareSize = window.innerWidth * (2/3) / NUM_COLS;
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

  window.addEventListener('resize', () => {
    const grid = document.querySelector("#grid");
    for (let i = 0; i < NUM_ROWS; i++) {
      for (let j = 0; j < NUM_COLS; j++) {
        const squareSize = window.innerWidth * (2/3) / NUM_COLS;
        board[i][j].style.width = squareSize;
        board[i][j].style.height = squareSize;
      }
    }
  });
}

const loop = () => {
  console.log(count++);
  setTimeout(loop, 1000)
}

init();
loop();