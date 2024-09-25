document.getElementById('start-btn').addEventListener('click', () => {
    const gridSize = parseInt(document.getElementById('grid-size').value);
    const winStreak = parseInt(document.getElementById('win-streak').value);
  
    if (gridSize >= 3 && winStreak >= 3) {
      startGame(gridSize, winStreak);
    } else {
      alert('Grid size and win streak must be at least 3');
    }
  });
  
  function startGame(gridSize, winStreak) {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
  
    const board = document.createElement('div');
    board.className = 'board';
    board.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
    board.style.gridTemplateRows = `repeat(${gridSize}, 100px)`;
  
    for (let i = 0; i < gridSize * gridSize; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      board.appendChild(cell);
    }
  
    gameContainer.appendChild(board);
    initializeGame(gridSize, winStreak);
  }
  