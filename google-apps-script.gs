// 這是要在 Google Apps Script 貼上的程式碼
// 部署為網頁應用程式 (Web App)，並將權限設為「所有人」

const SHEET_ID = '你的_SPREADSHEET_ID'; // 請填入你的 Google Sheet ID

function doGet(e) {
  const action = e.parameter.action;
  
  if (action === 'getQuestions') {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('題目');
    const data = sheet.getDataRange().getValues();
    
    // 假設第一行是標題 (題號, 題目, A, B, C, D, 解答)
    const headers = data.shift();
    
    const questions = data.map(row => {
      return {
        id: row[0],
        question: row[1],
        A: row[2],
        B: row[3],
        C: row[4],
        D: row[5],
        answer: row[6] 
      };
    });
    
    // 隨機打亂題目 (Fisher-Yates shuffle)
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    
    return ContentService.createTextOutput(JSON.stringify(questions))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  return ContentService.createTextOutput("Invalid Action");
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'submitScore') {
      // 这里的表名假设为 "成绩" 或 "玩家数据"
      const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('成绩');
      
      const id = data.id.toString();
      const score = Number(data.score);
      // 【设定】在这里定义几分算“通关”，目前预设是 60 分
      const isPass = score >= 60; 
      
      const rows = sheet.getDataRange().getValues();
      let foundIndex = -1;
      
      // 遍历寻找此 ID 是否已经存在 (假设第一行是标题)
      for(let i = 1; i < rows.length; i++) {
        if (rows[i][0].toString() === id) {
          foundIndex = i;
          break;
        }
      }
      
      if (foundIndex !== -1) {
        // 旧玩家，更新数据
        let attempts = Number(rows[foundIndex][1]) || 0;
        let highest = Number(rows[foundIndex][2]) || 0;
        let firstPlayScore = rows[foundIndex][3] !== '' ? rows[foundIndex][3] : ''; // 第一次玩的分数永远不变
        let passAttempts = rows[foundIndex][4] || '';
        
        attempts += 1; // 闯关次数 +1
        if (score > highest) highest = score; // 更新最高分
        
        // 记录花了几次通关 (如果是第一次通关的话)
        if (isPass && passAttempts === '') {
          passAttempts = attempts;
        }
        
        // 写回表格
        sheet.getRange(foundIndex + 1, 2, 1, 4).setValues([[attempts, highest, firstPlayScore, passAttempts]]);
        
      } else {
        // 新玩家，新增一行
        const attempts = 1;
        const highest = score;
        const firstPlayScore = score; // 新玩家的第一次分数就是这次的分数
        const passAttempts = isPass ? 1 : '';
        
        // 栏位顺序：ID | 闯关次数 | 最高分 | 第一次玩的分数 | 花了几次通关
        sheet.appendRow([id, attempts, highest, firstPlayScore, passAttempts]);
      }
      
      return ContentService.createTextOutput(JSON.stringify({ success: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
