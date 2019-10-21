const { electron, shell } = require("electron");

const webview = document.querySelector("#webview");

onload = () => {
  const webview = document.querySelector("#webview");
  webview.addEventListener("new-window", e => {
    electron.shell.openExternal(e.url);
  });
  webview.addEventListener("new-window", e => {
    shell.openExternal(e.url);
  });
};

const { ipcRenderer } = require("electron");

ipcRenderer.on("openDevToolsForWebView", () => {
  webview.openDevTools();
});