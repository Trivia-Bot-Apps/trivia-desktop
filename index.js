const {app, BrowserWindow, protocol, ipcMain} = require('electron');
const fs = require('fs');
const PROTOCOL_PREFIX = 'trivia'
let mainWindow;

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


function getpoints() {
    let points_data
    fs.readFile('trivia.data', (err, data) => {
        points_data = JSON.parse(data);
        console.log(points_data);
    });
    return points_data // return_thingy
}

ipcMain.handle('get-points', async (event, someArgument) => {
    let return_value
    console.log(return_value)
    return_value = getpoints();
    return_value = return_value['points'];
    console.log(return_value+'!')
    return return_value
})

app.on('ready', async function () {
  mainWindow = new BrowserWindow({
      height: 600,
      width: 800, 
      webPreferences: {
      	nodeIntegration: true
      },
  });
  // mainWindow.removeMenu();
  mainWindow.loadFile('static/logo.html');
  await sleep(3000)
  mainWindow.loadFile('static/launcher.html');
});
