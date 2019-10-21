const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");
const Menu = electron.Menu;

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      webviewTag: true,
      nodeIntegration: true
    },
    width: 800, height: 900
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "desktop.html"),
      protocol: "file:",
      slashes: true
    })
  );

  initWindowMenu();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

function initWindowMenu() {
  const template = [
    {
      label: "View",
      submenu: [
        { role: "reload" }
      ]
    }
  ];

  if (!app.isPackaged) {
    template.unshift({
      label: "Debug",
      submenu: [
        { role: "forceReload"},
        { role: "toggledevtools" },
        { 
          label: "open devTools for WebView",
          click () {
            mainWindow.webContents.send("openDevToolsForWebView");
          }
        }
      ]
    });
  }

  if (process.platform === "darwin") {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: "about" },
        { type: "separator" },
        { role: "services", submenu: [] },
        { type: "separator" },
        { role: "hide" },
        { role: "hideothers" },
        { role: "unhide" },
        { type: "separator" },
        { role: "quit" }
      ]
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
