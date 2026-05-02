import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Game from './pages/Game';
import Result from './pages/Result';
import Teacher from './pages/Teacher';

function App() {
  const [gameState, setGameState] = useState('home'); // home, game, result
  const [userId, setUserId] = useState('');
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  // Load custom questions from localStorage
  const [customQuestions, setCustomQuestions] = useState(() => {
    const saved = localStorage.getItem('pixel_custom_questions');
    return saved ? JSON.parse(saved) : [];
  });

  // MOCK DATA for local testing without GAS
  const mockQuestions = [
    { id: 1, question: '世界上陆地面积最大的国家是？', A: '中国', B: '美国', C: '俄罗斯', D: '加拿大', answer: 'C' },
    { id: 2, question: '人体最大的器官是？', A: '心脏', B: '大脑', C: '肝脏', D: '皮肤', answer: 'D' },
    { id: 3, question: '太阳系中体积最大的行星是？', A: '地球', B: '木星', C: '火星', D: '土星', answer: 'B' },
    { id: 4, question: '中国的“母亲河”通常是指？', A: '长江', B: '黄河', C: '珠江', D: '黑龙江', answer: 'B' },
    { id: 5, question: '标准大气压下，水的沸点是多少度？', A: '90℃', B: '100℃', C: '120℃', D: '80℃', answer: 'B' },
    { id: 6, question: '被称为“万园之园”的中国古典园林是？', A: '颐和园', B: '避暑山庄', C: '拙政园', D: '圆明园', answer: 'D' },
    { id: 7, question: '光的三原色是哪三种颜色？', A: '红、黄、蓝', B: '红、绿、蓝', C: '黄、绿、蓝', D: '红、白、蓝', answer: 'B' },
    { id: 8, question: '地球自转一周大约需要多长时间？', A: '12小时', B: '24小时', C: '30天', D: '365天', answer: 'B' },
    { id: 9, question: '古代“丝绸之路”的起点是？', A: '洛阳', B: '北京', C: '长安（西安）', D: '南京', answer: 'C' },
    { id: 10, question: '植物进行光合作用，主要吸收什么气体？', A: '氧气', B: '二氧化碳', C: '氮气', D: '一氧化碳', answer: 'B' },
    { id: 11, question: '世界上最高的山峰是？', A: '乔戈里峰', B: '乞力马扎罗山', C: '富士山', D: '珠穆朗玛峰', answer: 'D' },
    { id: 12, question: '人的正常体温大约是多少度？', A: '35℃', B: '37℃', C: '39℃', D: '36℃', answer: 'B' },
    { id: 13, question: '《西游记》的作者是？', A: '吴承恩', B: '罗贯中', C: '施耐庵', D: '曹雪芹', answer: 'A' },
    { id: 14, question: '“举头望明月，低头思故乡”出自哪位诗人之手？', A: '杜甫', B: '白居易', C: '李白', D: '苏轼', answer: 'C' },
    { id: 15, question: '空气中含量最多的气体是？', A: '氧气', B: '二氧化碳', C: '氮气', D: '氢气', answer: 'C' },
    { id: 16, question: '中国传统的二十四节气中，春季的第一个节气是？', A: '惊蛰', B: '立春', C: '雨水', D: '春分', answer: 'B' },
    { id: 17, question: '被称为“诗圣”的唐代诗人是？', A: '李白', B: '杜甫', C: '王维', D: '杜牧', answer: 'B' },
    { id: 18, question: '下列哪个选项不属于可再生能源？', A: '太阳能', B: '风能', C: '水能', D: '煤炭', answer: 'D' },
    { id: 19, question: '奥运会五环标志中的黄色代表哪个大洲？', A: '亚洲', B: '欧洲', C: '非洲', D: '美洲', answer: 'A' },
    { id: 20, question: '企鹅主要生活在地球的哪个地方？', A: '北极', B: '南极', C: '赤道', D: '澳洲', answer: 'B' }
  ];

  const startGame = async (id) => {
    setUserId(id);
    setGameState('game');
    
    // Fetch questions from GAS
    try {
      const url = import.meta.env.VITE_GAS_API_URL;
      if (url) {
        const response = await fetch(`${url}?action=getQuestions`);
        const data = await response.json();
        // slice based on TOTAL_QUESTIONS
        const limit = parseInt(import.meta.env.VITE_TOTAL_QUESTIONS) || 10;
        setQuestions(data.slice(0, limit));
      } else {
        // Fallback to mock or custom
        console.warn("No GAS URL provided, using local data.");
        const pool = customQuestions.length > 0 ? customQuestions : mockQuestions;
        const shuffled = [...pool].sort(() => 0.5 - Math.random());
        const limit = parseInt(import.meta.env.VITE_TOTAL_QUESTIONS) || 10;
        setQuestions(shuffled.slice(0, limit));
      }
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      const pool = customQuestions.length > 0 ? customQuestions : mockQuestions;
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      const limit = parseInt(import.meta.env.VITE_TOTAL_QUESTIONS) || 10;
      setQuestions(shuffled.slice(0, limit));
    }
  };

  const endGame = async (finalScore, finalAnswers) => {
    setScore(finalScore);
    setUserAnswers(finalAnswers);
    setGameState('result');

    // Submit score to GAS
    try {
      const url = import.meta.env.VITE_GAS_API_URL;
      if (url) {
        await fetch(url, {
          method: 'POST',
          mode: 'no-cors', // Because GAS might have CORS issues on POST without proper headers
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'submitScore',
            id: userId,
            score: finalScore
          })
        });
      }
    } catch (error) {
      console.error("Failed to submit score:", error);
    }
  };

  const goHome = () => {
    setScore(0);
    setGameState('home');
    setUserId('');
  };

  const tryAgain = () => {
    startGame(userId);
  };

  return (
    <div className="arcade-container">
      {gameState === 'home' && <Home onStart={startGame} onTeacherMode={() => setGameState('teacher')} />}
      {gameState === 'teacher' && <Teacher customQuestions={customQuestions} setCustomQuestions={setCustomQuestions} onBack={() => setGameState('home')} />}
      {gameState === 'game' && <Game questions={questions} onEnd={endGame} />}
      {gameState === 'result' && <Result score={score} total={questions.length} onHome={goHome} onTryAgain={tryAgain} userAnswers={userAnswers} />}
    </div>
  );
}

export default App;
