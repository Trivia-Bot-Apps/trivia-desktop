const {app, BrowserWindow} = require('electron');

let mainWindow;

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
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
