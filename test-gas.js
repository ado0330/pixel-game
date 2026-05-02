const url = "https://script.google.com/macros/s/AKfycbwe_l5pEfcfcnWGm0FhuDJ2T6koPWdoH16LrTAqM8KpHw4njMKJbZfShUBPDm9HS2g2kA/exec";
fetch(url, {
  method: 'POST',
  body: JSON.stringify({ action: 'submitScore', id: 'TEST1234', score: 100 })
}).then(r => r.text()).then(console.log).catch(console.error);
