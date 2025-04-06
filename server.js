const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let secretNumber = Math.floor(Math.random() * 100) + 1;  // Random number between 1 and 100

app.post('/guess', (req, res) => {
  const { guess } = req.body;

  if (guess < secretNumber) {
    return res.json({ feedback: 'Too low! Try again.' });
  } else if (guess > secretNumber) {
    return res.json({ feedback: 'Too high! Try again.' });
  } else {
    // Reset the game if the user guessed correctly
    secretNumber = Math.floor(Math.random() * 100) + 1;
    return res.json({ feedback: 'Correct! You guessed the right number.', correct: true });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
