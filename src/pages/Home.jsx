import React, { useState } from 'react';

const Home = ({ onStart, onTeacherMode }) => {
  const [id, setId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id.trim()) {
      onStart(id.trim());
    }
  };

  return (
    <div>
      <h1>PIXEL ARCADE<br/>QUIZ</h1>
      <p style={{ margin: '30px 0', lineHeight: '1.8' }}>
        INSERT COIN TO PLAY<br/>
        OR ENTER YOUR ID
      </p>
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="pixel-input"
          placeholder="PLAYER ID..." 
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <br/>
        <button type="submit" className="pixel-btn" disabled={!id.trim()}>
          START GAME
        </button>
      </form>

      <div style={{ marginTop: '50px' }}>
        <button className="pixel-btn" onClick={onTeacherMode} style={{ background: '#8e44ad', fontSize: '10px', padding: '8px 12px' }}>
          TEACHER MODE
        </button>
      </div>
    </div>
  );
};

export default Home;
