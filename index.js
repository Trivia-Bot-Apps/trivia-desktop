const {app, BrowserWindow, protocol, ipcMain} = require('electron');
const PROTOCOL_PREFIX = 'trivia'
const rpc = require('./discordRpc')
const fs = require('fs')
const path = require('path')
const https = require('https')

//Obfuscated Code that is used for secure storage of save files
const _0x557c=['utf16le'];(function(_0x2f31c9,_0x557c91){const _0xc91ca6=function(_0x466081){while(--_0x466081){_0x2f31c9['push'](_0x2f31c9['shift']());}};_0xc91ca6(++_0x557c91);}(_0x557c,0x18b));const _0xc91c=function(_0x2f31c9,_0x557c91){_0x2f31c9=_0x2f31c9-0x0;let _0xc91ca6=_0x557c[_0x2f31c9];return _0xc91ca6;};const _0x4cc709=_0xc91c,encodeType=_0x4cc709('0x0');

loadData = new Promise(function (done, error) {
  if (fs.existsSync(path.join(app.getPath('userData'), "userdata.dat"))) {
    fs.readFile(path.join(app.getPath('userData'), "userdata.dat"), (err, data) => {
      if (err) error(err);
      let parsed
      try {
        const _0x4d28=['from','utf8','parse'];(function(_0x1a8bb5,_0x4d2837){const _0x585ef6=function(_0x288e86){while(--_0x288e86){_0x1a8bb5['push'](_0x1a8bb5['shift']());}};_0x585ef6(++_0x4d2837);}(_0x4d28,0x93));const _0x585e=function(_0x1a8bb5,_0x4d2837){_0x1a8bb5=_0x1a8bb5-0x0;let _0x585ef6=_0x4d28[_0x1a8bb5];return _0x585ef6;};const _0x1e077b=_0x585e;parsed=JSON[_0x1e077b('0x2')](Buffer[_0x1e077b('0x0')](String(data),'utf16le')['toString'](_0x1e077b('0x1')));
      } catch(err) {
        // Backwards Compatibility (Will be removed Later)
        try {
          parsed = JSON.parse(String(data))
          saveData(parsed)
        } catch(err) {
          saveData({points: 0})
          done({points: 0})
        }
      }
      done(parsed)
    })
  } else {
    saveData({points: 0})
    done({points: 0})
  }
})
function getToken () {
  promise = new Promise((done, error) => {
    // Get Token from API
    https.get("https://opentdb.com/api_token.php?command=request", (res) => {
      res.setEncoding('utf8');
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          done(parsed)
        } catch (err) {
          done(None)
        }
      })
    })
  })
  return promise
}
function saveData(data) {
  const _0x5a63=['from'];(function(_0x451c4a,_0x5a63f4){const _0xc8942b=function(_0x45ea05){while(--_0x45ea05){_0x451c4a['push'](_0x451c4a['shift']());}};_0xc8942b(++_0x5a63f4);}(_0x5a63,0x143));const _0xc894=function(_0x451c4a,_0x5a63f4){_0x451c4a=_0x451c4a-0x0;let _0xc8942b=_0x5a63[_0x451c4a];return _0xc8942b;};const _0x136743=_0xc894;let parsedData=Buffer[_0x136743('0x0')](JSON['stringify'](data))['toString'](encodeType);
  fs.writeFile(path.join(app.getPath('userData'), "userdata.dat"), parsedData, (err) => {if (err) throw err;})
}
let userData
async function setup() {
  userData = await loadData
  if (typeof userData.token === 'undefined' || userData.tokenExp <= Date.now()) {
    userData.token = (await getToken()).token
    userData.tokenExp = Date.now() + 18000000
    saveData(userData)
  }
  saveData(userData)
}
setup()

let mainWindow;
ipcMain.on('get-data', (event) => {
  event.returnValue = userData
})

ipcMain.on('give-points', (event, pnts) => {
  userData.points += pnts
  saveData(userData)
})

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}



app.on('ready', async function () {
  mainWindow = new BrowserWindow({
      title: "Trivia Desktop",
      height: 600,
      width: 800,
      backgroundColor: '#17181c',
      webPreferences: {
      	nodeIntegration: true
      },
  });
  mainWindow.removeMenu();
  mainWindow.loadFile('static/logo.html');
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.key.toLowerCase() === 'i') {
      mainWindow.webContents.openDevTools()
      event.preventDefault()
    }
  })
  await sleep(3000)
  mainWindow.loadFile('static/launcher.html');
});
