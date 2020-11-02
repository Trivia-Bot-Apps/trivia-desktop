const {app, BrowserWindow, protocol, ipcMain} = require('electron');
const PROTOCOL_PREFIX = 'trivia'
const rpc = require('./discordRpc')
const fs = require('fs')
const path = require('path')
loadData = new Promise(function (done, error) {
  if (fs.existsSync(path.join(app.getPath('userData'), "userdata.dat"))) {
    fs.readFile(path.join(app.getPath('userData'), "userdata.dat"), (err, data) => {
      if (err) error(err);
      try {
      parsed = JSON.parse(String(data))
      } catch(err) {
        fs.writeFile(path.join(app.getPath('userData'), "userdata.dat"), '{"points": 0}', (err) => {if (err) throw err;})
        done({points: 0})
      }
      done(parsed)
    })
  } else {
    fs.writeFile(path.join(app.getPath('userData'), "userdata.dat"), '{"points": 0}', (err) => {if (err) throw err;})
    done({points: 0})
  }
})
function saveData(data) {
  fs.writeFile(path.join(app.getPath('userData'), "userdata.dat"), JSON.stringify(data), (err) => {if (err) throw err;})
}
let userData
async function setup() {
  userData = await loadData
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
