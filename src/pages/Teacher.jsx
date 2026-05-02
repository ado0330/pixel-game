import React, { useState } from 'react';

const Teacher = ({ customQuestions, setCustomQuestions, onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [newQ, setNewQ] = useState({ question: '', A: '', B: '', C: '', D: '', answer: 'A' });

  const handleLogin = (e) => {
    e.preventDefault();
    const validId = import.meta.env.VITE_TEACHER_ID || 'admin';
    const validPass = import.meta.env.VITE_TEACHER_PASSWORD || 'pixel';
    
    if (credentials.id === validId && credentials.password === validPass) {
      setIsAuthenticated(true);
    } else {
      alert('账号或密码错误！ / Invalid Credentials');
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const q = { ...newQ, id: Date.now() };
    const updated = [...customQuestions, q];
    setCustomQuestions(updated);
    localStorage.setItem('pixel_custom_questions', JSON.stringify(updated));
    setNewQ({ question: '', A: '', B: '', C: '', D: '', answer: 'A' });
    alert('题目已新增！');
  };

  const handleClear = () => {
    if (confirm('确定要清空所有自定义题目，恢复系统默认的20题吗？')) {
      localStorage.removeItem('pixel_custom_questions');
      setCustomQuestions([]);
      alert('已恢复默认题库。');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: 'center', width: '100%' }}>
        <div style={{ textAlign: 'left', marginBottom: '20px' }}>
          <button className="pixel-btn" onClick={onBack}>{'< BACK'}</button>
        </div>
        <h2 style={{ color: '#8e44ad' }}>TEACHER LOGIN</h2>
        <form onSubmit={handleLogin} style={{ background: '#34495e', padding: '30px', border: '4px solid #ecf0f1', display: 'inline-block' }}>
          <div style={{ marginBottom: '15px' }}>
            <input 
              className="pixel-input" 
              placeholder="TEACHER ID" 
              value={credentials.id} 
              onChange={e => setCredentials({...credentials, id: e.target.value})} 
              required 
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <input 
              type="password"
              className="pixel-input" 
              placeholder="PASSWORD" 
              value={credentials.password} 
              onChange={e => setCredentials({...credentials, password: e.target.value})} 
              required 
            />
          </div>
          <button type="submit" className="pixel-btn" style={{ background: '#8e44ad' }}>LOGIN</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'left', width: '100%' }}>
      <button className="pixel-btn" onClick={onBack}>{'< LOGOUT'}</button>
      <h2 style={{ textAlign: 'center', color: '#8e44ad' }}>TEACHER MODE</h2>
      
      <div style={{ background: '#34495e', padding: '20px', border: '4px solid #ecf0f1', marginBottom: '20px' }}>
        <h3 style={{ marginTop: 0 }}>新增题目</h3>
        <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input className="pixel-input" style={{ width: '100%', maxWidth: '100%', margin: '0' }} placeholder="题目内容..." value={newQ.question} onChange={e => setNewQ({...newQ, question: e.target.value})} required />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <input className="pixel-input" style={{ width: '100%', margin: '0' }} placeholder="选项 A" value={newQ.A} onChange={e => setNewQ({...newQ, A: e.target.value})} required />
            <input className="pixel-input" style={{ width: '100%', margin: '0' }} placeholder="选项 B" value={newQ.B} onChange={e => setNewQ({...newQ, B: e.target.value})} required />
            <input className="pixel-input" style={{ width: '100%', margin: '0' }} placeholder="选项 C" value={newQ.C} onChange={e => setNewQ({...newQ, C: e.target.value})} required />
            <input className="pixel-input" style={{ width: '100%', margin: '0' }} placeholder="选项 D" value={newQ.D} onChange={e => setNewQ({...newQ, D: e.target.value})} required />
          </div>
          <div style={{ marginTop: '10px' }}>
            <label style={{ marginRight: '10px' }}>正确答案: </label>
            <select className="pixel-input" style={{ width: '100px', padding: '5px', margin: '0' }} value={newQ.answer} onChange={e => setNewQ({...newQ, answer: e.target.value})}>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
          <button type="submit" className="pixel-btn" style={{ background: '#27ae60', marginTop: '10px' }}>SAVE QUESTION</button>
        </form>
      </div>

      <div>
        <h3>目前自定义题库 ({customQuestions.length} 题)</h3>
        {customQuestions.length === 0 ? (
          <p style={{ fontSize: '12px', color: '#bdc3c7' }}>当前未设置自定义题目，游戏将使用系统默认的常识题。</p>
        ) : (
          <div style={{ maxHeight: '200px', overflowY: 'auto', background: '#2c3e50', padding: '10px', border: '2px solid #ecf0f1' }}>
            {customQuestions.map((q, i) => (
              <div key={q.id || i} style={{ borderBottom: '1px solid #7f8c8d', paddingBottom: '10px', marginBottom: '10px' }}>
                <p style={{ margin: '5px 0' }}><strong>{i+1}. {q.question}</strong></p>
                <p style={{ fontSize: '12px', margin: '0' }}>
                  A:{q.A} B:{q.B} C:{q.C} D:{q.D} <span style={{color:'#e74c3c', marginLeft: '10px'}}>答:{q.answer}</span>
                </p>
              </div>
            ))}
          </div>
        )}
        <button className="pixel-btn" onClick={handleClear} style={{ background: '#c0392b', marginTop: '20px', fontSize: '10px' }}>CLEAR ALL CUSTOM</button>
      </div>
    </div>
  );
};

export default Teacher;
