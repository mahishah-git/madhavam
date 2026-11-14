// Paste this into Extensions > Apps Script (inside your RSVP sheet), then Deploy > New deployment > Web app.
const SHEET_ID = '1Gh94X5_6GMTYYnQC5NjWJ6KPndhfC0F0P0fhkPDaSSU';

function doPost(e) {
  try {
    let d = {};
    if (e.postData && e.postData.contents) {
      try { d = JSON.parse(e.postData.contents); } catch (_) { d = e.parameter || {}; }
    } else {
      d = e.parameter || {};
    }
    let name = String(d.name || '').trim().slice(0, 100);
    if (!name) return out({ ok: false, error: 'name missing' });
    name = name.replace(/^[=+\-@]/, "'$&");            // stop sheet formulas
    const answer = d.answer === 'No' ? 'No' : 'Yes';

    const sh = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    if (sh.getLastRow() === 0) sh.appendRow(['Time', 'Name', 'Coming?']);
    sh.appendRow([new Date(), name, answer]);
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  }
}

// open the web app address in a browser to check it is live
function doGet() { return out({ ok: true, message: 'RSVP endpoint is live' }); }

function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
