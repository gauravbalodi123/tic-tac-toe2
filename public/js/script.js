let currentPlayer = 'X';
let gameActive = true;
let gridSize, winStreak, board;

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `It's a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

function initializeGame(size, streak) {
  gridSize = size;
  winStreak = streak;
  board = Array(gridSize * gridSize).fill("");
  document.getElementById('message').innerText = currentPlayerTurn();

  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
  board[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  document.getElementById('message').innerText = currentPlayerTurn();
}

function checkWinCondition() {
  const lines = [];

  // Horizontal lines
  for (let row = 0; row < gridSize; row++) {
    lines.push(board.slice(row * gridSize, row * gridSize + gridSize));
  }

  // Vertical lines
  for (let col = 0; col < gridSize; col++) {
    const line = [];
    for (let row = 0; row < gridSize; row++) {
      line.push(board[row * gridSize + col]);
    }
    lines.push(line);
  }

  // Diagonal lines
  const diag1 = [];
  const diag2 = [];
  for (let i = 0; i < gridSize; i++) {
    diag1.push(board[i * gridSize + i]);
    diag2.push(board[i * gridSize + (gridSize - 1 - i)]);
  }
  lines.push(diag1, diag2);

  // Check if any line has the required streak
  for (const line of lines) {
    if (line.join('').includes(currentPlayer.repeat(winStreak))) {
      return true;
    }
  }

  return false;
}

function handleResultValidation() {
  if (checkWinCondition()) {
    document.getElementById('message').innerText = winningMessage();
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    document.getElementById('message').innerText = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (board[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}
