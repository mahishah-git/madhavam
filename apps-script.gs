// Paste into Extensions > Apps Script of your Google Sheet (see README)
function doPost(e) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sh.getLastRow() === 0) sh.appendRow(['Submitted at', 'Guest name', 'Attendance']);
  sh.appendRow([new Date(), e.parameter.name || '', e.parameter.attendance || '']);
  return ContentService.createTextOutput('ok');
}
