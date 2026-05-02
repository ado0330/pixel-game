import React, { useState, useEffect, useRef } from 'react';
import Boss from '../components/Boss';
import { playCorrect, playWrong, playClick, playBossAppear } from '../utils/sounds';

const Game = ({ questions, onEnd }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState(null); // { selected, isCorrect, correctAnswer }
  const [locked, setLocked] = useState(false);
  const bossRef = useRef(null);

  useEffect(() => {
    playBossAppear();
  }, [currentIndex]);

  if (!questions || questions.length === 0) {
    return <div className="loading">LOADING MODULE...</div>;
  }

  const currentQ = questions[currentIndex];

  const handleAnswer = (selectedOption) => {
    if (locked) return;
    setLocked(true);
    playClick();

    const isCorrect = selectedOption === currentQ.answer;
    const newScore = score + (isCorrect ? 10 : 0);

    // Show feedback
    setFeedback({ selected: selectedOption, isCorrect, correctAnswer: currentQ.answer });

    // Play sound
    setTimeout(() => {
      isCorrect ? playCorrect() : playWrong();
    }, 100);

    const newAnswers = [...answers, {
      question: currentQ.question,
      selected: selectedOption,
      correct: currentQ.answer,
      isCorrect: isCorrect,
      options: { A: currentQ.A, B: currentQ.B, C: currentQ.C, D: currentQ.D }
    }];

    // Delay before next question
    setTimeout(() => {
      setScore(newScore);
      setAnswers(newAnswers);
      setFeedback(null);
      setLocked(false);

      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onEnd(newScore, newAnswers);
      }
    }, 1200);
  };

  const getOptionClass = (opt) => {
    if (!feedback) return 'pixel-btn option-btn';
    if (opt === feedback.correctAnswer) return 'pixel-btn option-btn option-correct';
    if (opt === feedback.selected && !feedback.isCorrect) return 'pixel-btn option-btn option-wrong';
    return 'pixel-btn option-btn option-dim';
  };

  return (
    <div>
      <div className="stats">
        <span>SCORE: {score}</span>
        <span>STAGE: {currentIndex + 1}/{questions.length}</span>
      </div>

      <h2>STAGE {currentIndex + 1}</h2>
      
      <div className={feedback ? (feedback.isCorrect ? 'boss-hit' : 'boss-dodge') : ''}>
        <Boss level={currentIndex + 1} />
      </div>

      {feedback && (
        <div className={`feedback-text ${feedback.isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
          {feedback.isCorrect ? '✅ CORRECT!' : `❌ WRONG! → ${feedback.correctAnswer}`}
        </div>
      )}

      <div style={{ minHeight: '80px', margin: '20px 0' }}>
        <p style={{ lineHeight: '1.5' }}>{currentQ.question}</p>
      </div>

      <div className="options-grid">
        {['A', 'B', 'C', 'D'].map((opt) => (
          currentQ[opt] && (
            <button 
              key={opt} 
              className={getOptionClass(opt)}
              onClick={() => handleAnswer(opt)}
              disabled={locked}
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
