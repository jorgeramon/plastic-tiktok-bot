const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  onChat: (callback) => ipcRenderer.on("tiktok-chat", callback),
});
