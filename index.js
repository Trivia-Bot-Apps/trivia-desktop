const {app, BrowserWindow, protocol} = require('electron');
const PROTOCOL_PREFIX = 'trivia'
let mainWindow;

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  protocol.registerHttpProtocol(PROTOCOL_PREFIX, (req, cb) => {
    const fullUrl = formFullTodoUrl(req.url)
    devToolsLog('full url to open ' + fullUrl)
    mainWindow.loadURL(fullUrl)
  })
}


app.on('ready', () => {
  mainWindow = new BrowserWindow({
      height: 600,
      width: 800, 
      webPreferences: {
      	nodeIntegration: true
      },
  });
  mainWindow.removeMenu();
  mainWindow.loadURL('file://' + __dirname + '/logo.html');
  sleep(3000).then(() => {
    mainWindow.loadURL('file://' + __dirname + '/launcher.html');
  })
});
