import React, { useState } from 'react';

const Result = ({ score, total, onHome, onTryAgain, userAnswers, submitStatus }) => {
  const [showReview, setShowReview] = useState(false);
  const mistakes = userAnswers ? userAnswers.filter(a => !a.isCorrect) : [];
  const correctCount = userAnswers ? userAnswers.filter(a => a.isCorrect).length : 0;

  const getStatusText = () => {
    switch (submitStatus) {
      case 'submitting': return { text: '⏳ 正在同步成绩...', color: '#f39c12' };
      case 'success': return { text: '✅ 成绩已同步至云端', color: '#2ecc71' };
      case 'error': return { text: '⚠️ 同步失败（成绩仅本地保存）', color: '#e74c3c' };
      default: return null;
    }
  };

  const status = getStatusText();

  return (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <h1>GAME OVER</h1>
      
      <div style={{ margin: '20px 0' }}>
        <h2>FINAL SCORE</h2>
        <p style={{ fontSize: '48px', color: '#e74c3c', textShadow: '4px 4px 0 #000', margin: '20px 0' }}>
          {score}
        </p>
        <p>MAX POSSIBLE: {total * 10}</p>
        <p style={{ fontSize: '12px', marginTop: '10px' }}>
          正确: <span style={{ color: '#2ecc71' }}>{correctCount}</span> / {total}
          {' | '}
          错误: <span style={{ color: '#e74c3c' }}>{mistakes.length}</span>
        </p>
      </div>

      {/* Submission status indicator */}
      {status && (
        <div style={{ 
          padding: '8px 15px', 
          margin: '15px auto', 
          fontSize: '10px', 
          color: status.color, 
          border: `2px solid ${status.color}`,
          background: 'rgba(0,0,0,0.3)',
          display: 'inline-block',
          animation: submitStatus === 'submitting' ? 'blink 1s infinite' : 'none'
        }}>
          {status.text}
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button className="pixel-btn" onClick={onTryAgain} style={{ background: '#27ae60' }}>
          TRY AGAIN
        </button>
        <button className="pixel-btn" onClick={() => setShowReview(!showReview)} style={{ background: '#f39c12' }}>
          {showReview ? 'HIDE' : 'REVIEW'}
        </button>
        <button className="pixel-btn" onClick={onHome} style={{ background: '#2980b9' }}>
          HOME
        </button>
      </div>

      {showReview && userAnswers && userAnswers.length > 0 && (
        <div style={{ textAlign: 'left', background: '#34495e', padding: '20px', margin: '20px 0', border: '4px solid #ecf0f1', maxHeight: '300px', overflowY: 'auto' }}>
          <h3 style={{ textAlign: 'center', color: '#f1c40f', marginTop: 0 }}>错题回顾 REVIEW</h3>
          {mistakes.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#2ecc71' }}>太棒了！你全部答对了！🎉</p>
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
