const {app, BrowserWindow, protocol} = require('electron');
const PROTOCOL_PREFIX = 'trivia'
const rpc = require('./discordRpc')

let mainWindow;

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}



app.on('ready', async function () {
  mainWindow = new BrowserWindow({
      height: 600,
      width: 800, 
      webPreferences: {
      	nodeIntegration: true
      },
  });
  mainWindow.removeMenu();
  mainWindow.loadFile('static/logo.html');
  await sleep(3000)
  mainWindow.loadFile('static/launcher.html');
});
