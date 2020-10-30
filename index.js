const {app, BrowserWindow, protocol} = require('electron');
const PROTOCOL_PREFIX = 'trivia'
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
  mainWindow.loadFile('logo.html');
  await sleep(3000)
  mainWindow.loadFile('launcher.html');
});
