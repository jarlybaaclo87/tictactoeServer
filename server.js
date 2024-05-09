const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;


app.use(express.json());

const corsOptions = {
    origin: function (origin, callback) {
      // Replace this condition with your logic to allow or deny specific origins
      if (origin === 'https://cdpn.io') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  app.use(cors(corsOptions));

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

app.get('/api/start', (req, res) => {
    try {
      const gameData = startGame();
      res.json(gameData);
    } catch (error) {
      console.error("Error starting game:", error); // Log the full error object
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

app.post('/api/move', (req, res) => {
  const { position } = req.body;
  try {
    const gameData = makeMove(position);
    res.json(gameData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/api/reset', (req, res) => {
  const gameData = resetGame();
  res.json(gameData);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
