import React, { useMemo } from 'react';

// Using DiceBear Pixel Art style
const Boss = ({ level }) => {
  const seed = useMemo(() => `boss_${level}_${Math.random()}`, [level]);
  const bossUrl = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}&size=150`;

  return (
    <div className="boss-container">
      <img src={bossUrl} alt={`Boss Level ${level}`} />
    </div>
  );
};

export default Boss;
