import React, { useState } from 'react';

function App() {
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [correct, setCorrect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/guess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guess: parseInt(guess) }),
      });
      const data = await response.json();
      setFeedback(data.feedback);
      if (data.correct) {
        setCorrect(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Number Guessing Game</h1>
      <p>Guess a number between 1 and 100:</p>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          min="1"
          max="100"
          required
        />
        <button type="submit" disabled={correct}>
          Submit Guess
        </button>
      </form>
      <p>{feedback}</p>
      {correct && <button onClick={() => window.location.reload()}>Play Again</button>}
    </div>
  );
}

export default App;
