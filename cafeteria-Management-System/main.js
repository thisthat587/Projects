const { app, BrowserWindow } = require('electron');

function createWindow(htmlfile, w, h) {
    const mainWindow = new BrowserWindow({
        width: w,
        height: h,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false,
        },
    });
    mainWindow.loadFile(htmlfile);
}

app.whenReady().then(() => {
    createWindow("main.html", 375, 667);
});