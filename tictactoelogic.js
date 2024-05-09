let currentPlayer = 'X';
let board = Array(9).fill(null);

function startGame() {
  currentPlayer = 'X';
  board = Array(9).fill(null);
  return { currentPlayer, board };
}

function makeMove(position) {
  if (board[position] || !Number.isInteger(position) || position < 0 || position >= 9) {
    throw new Error('Invalid move');
  }
  board[position] = currentPlayer;
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  return { currentPlayer, board };
}

function resetGame() {
  currentPlayer = 'X';
  board = Array(9).fill(null);
  return { currentPlayer, board };
}

module.exports = { startGame, makeMove, resetGame };

