import React, { useState } from 'react';

const Result = ({ score, total, onHome, onTryAgain, userAnswers }) => {
  const [showReview, setShowReview] = useState(false);
  const mistakes = userAnswers ? userAnswers.filter(a => !a.isCorrect) : [];

  return (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <h1>GAME OVER</h1>
      
      <div style={{ margin: '20px 0' }}>
        <h2>FINAL SCORE</h2>
        <p style={{ fontSize: '48px', color: '#e74c3c', textShadow: '4px 4px 0 #000', margin: '20px 0' }}>
          {score}
        </p>
        <p>MAX POSSIBLE: {total * 10}</p>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
        <button className="pixel-btn" onClick={onTryAgain} style={{ background: '#27ae60' }}>
          TRY AGAIN
        </button>
        <button className="pixel-btn" onClick={() => setShowReview(!showReview)} style={{ background: '#f39c12' }}>
          REVIEW
        </button>
        <button className="pixel-btn" onClick={onHome} style={{ background: '#2980b9' }}>
          HOME
        </button>
      </div>

      {showReview && userAnswers && userAnswers.length > 0 && (
        <div style={{ textAlign: 'left', background: '#34495e', padding: '20px', margin: '20px 0', border: '4px solid #ecf0f1', maxHeight: '300px', overflowY: 'auto' }}>
          <h3 style={{ textAlign: 'center', color: '#f1c40f', marginTop: 0 }}>错题回顾 REVIEW</h3>
          {mistakes.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#2ecc71' }}>太棒了！你全部答对了！</p>
          ) : (
            mistakes.map((ans, i) => (
              <div key={i} style={{ marginBottom: '15px', borderBottom: '1px dashed #7f8c8d', paddingBottom: '10px' }}>
                <p style={{ lineHeight: '1.5' }}><strong>Q: {ans.question}</strong></p>
                <p style={{ color: '#e74c3c', fontSize: '12px', margin: '5px 0' }}>你的回答: {ans.selected}. {ans.options[ans.selected]}</p>
                <p style={{ color: '#2ecc71', fontSize: '12px', margin: '5px 0' }}>正确答案: {ans.correct}. {ans.options[ans.correct]}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Result;
