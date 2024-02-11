const { app, BrowserWindow, screen } = require("electron");
const say = require("say");

function createWindow()
{
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });
  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadFile("main.html");

}

app.whenReady().then(() =>
{
  createWindow();
});
