// Paste into Google Apps Script (Extensions > Apps Script) of your Google Sheet.
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(["Submitted time", "Guest name", "Response"]);
  var d = JSON.parse(e.postData.contents);
  sheet.appendRow([new Date(), String(d.name).slice(0, 100), d.answer === "Yes" ? "Yes" : "No"]);
  return ContentService.createTextOutput("ok");
}