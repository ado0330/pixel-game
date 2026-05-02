import React, { useState } from 'react';
import Boss from '../components/Boss';

const Game = ({ questions, onEnd }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  if (!questions || questions.length === 0) {
    return <div className="loading">LOADING MODULE...</div>;
  }

  const currentQ = questions[currentIndex];

  const handleAnswer = (selectedOption) => {
    const isCorrect = selectedOption === currentQ.answer;
    const newScore = score + (isCorrect ? 10 : 0);
    setScore(newScore);

    const newAnswers = [...answers, {
      question: currentQ.question,
      selected: selectedOption,
      correct: currentQ.answer,
      isCorrect: isCorrect,
      options: { A: currentQ.A, B: currentQ.B, C: currentQ.C, D: currentQ.D }
    }];
    setAnswers(newAnswers);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onEnd(newScore, newAnswers);
    }
  };

  return (
    <div>
      <div className="stats">
        <span>SCORE: {score}</span>
        <span>STAGE: {currentIndex + 1}/{questions.length}</span>
      </div>

      <h2>STAGE {currentIndex + 1}</h2>
      
      <Boss level={currentIndex + 1} />

      <div style={{ minHeight: '80px', margin: '20px 0' }}>
        <p style={{ lineHeight: '1.5' }}>{currentQ.question}</p>
      </div>

      <div className="options-grid">
        {['A', 'B', 'C', 'D'].map((opt) => (
          currentQ[opt] && (
            <button 
              key={opt} 
              className="pixel-btn" 
              onClick={() => handleAnswer(opt)}
            >
              {opt}. {currentQ[opt]}
            </button>
          )
        ))}
      </div>
    </div>
  );
};

export default Game;
