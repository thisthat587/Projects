const { app, BrowserWindow, screen } = require("electron");
const say = require("say");

function createWindow()
{
  // const text = 'welcome';

  // Get the size of the primary display
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
  // say.speak(text);
  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadFile("main.html");

  mainWindow.webContents.once('did-finish-load', () =>
  {
    // Speak the welcome message after the window is loaded
    const text = 'Welcome';
    say.speak(text, 'espeak', 1.0, null, null, { espeak: { amplitude: 100, wordgap: 0, pitch: 50 } });
  });
}

app.whenReady().then(() =>
{
  createWindow();
});
