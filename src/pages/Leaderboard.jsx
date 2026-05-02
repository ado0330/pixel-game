import React, { useState, useEffect } from 'react';

const Leaderboard = ({ onBack }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const url = import.meta.env.VITE_GAS_API_URL;
        if (!url) {
          setError('未配置 API 地址');
          setLoading(false);
          return;
        }
        const resp = await fetch(`${url}?action=getLeaderboard`);
        const result = await resp.json();
        setData(result);
      } catch (err) {
        setError('无法加载排行榜数据');
        console.error(err);
      }
      setLoading(false);
    };
    fetchLeaderboard();
  }, []);

  const getMedal = (rank) => {
    if (rank === 0) return '🥇';
    if (rank === 1) return '🥈';
    if (rank === 2) return '🥉';
    return `#${rank + 1}`;
  };

  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <div style={{ textAlign: 'left', marginBottom: '20px' }}>
        <button className="pixel-btn" onClick={onBack}>{'< BACK'}</button>
      </div>
      
      <h2 style={{ color: '#f1c40f' }}>🏆 LEADERBOARD</h2>

      {loading && <div className="loading">LOADING...</div>}
      
      {error && (
        <p style={{ color: '#e74c3c', fontSize: '12px' }}>{error}</p>
      )}

      {!loading && !error && data.length === 0 && (
        <p style={{ fontSize: '12px', color: '#bdc3c7' }}>暂无排行数据，快去挑战吧！</p>
      )}

      {!loading && !error && data.length > 0 && (
        <div style={{ textAlign: 'left' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
            <thead>
              <tr style={{ borderBottom: '3px solid #f1c40f', color: '#f1c40f' }}>
                <th style={{ padding: '10px 5px', textAlign: 'center' }}>RANK</th>
                <th style={{ padding: '10px 5px' }}>PLAYER</th>
                <th style={{ padding: '10px 5px', textAlign: 'center' }}>BEST</th>
                <th style={{ padding: '10px 5px', textAlign: 'center' }}>TRIES</th>
                <th style={{ padding: '10px 5px', textAlign: 'center' }}>PASS</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} style={{ 
                  borderBottom: '1px solid #7f8c8d',
                  background: i < 3 ? 'rgba(241,196,15,0.1)' : 'transparent'
                }}>
                  <td style={{ padding: '10px 5px', textAlign: 'center', fontSize: '14px' }}>
                    {getMedal(i)}
                  </td>
                  <td style={{ padding: '10px 5px' }}>{row.id}</td>
                  <td style={{ padding: '10px 5px', textAlign: 'center', color: '#2ecc71', fontWeight: 'bold' }}>
                    {row.highest}
                  </td>
                  <td style={{ padding: '10px 5px', textAlign: 'center' }}>{row.attempts}</td>
                  <td style={{ padding: '10px 5px', textAlign: 'center' }}>
                    {row.passAttempts ? `第${row.passAttempts}次` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
