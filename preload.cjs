const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("desktopAPI", {
  checkForUpdates: () => ipcRenderer.invoke("app:check-for-updates"),
  getUpdateState: () => ipcRenderer.invoke("app:get-update-state"),
  startUpdate: () => ipcRenderer.invoke("app:start-update"),
  onUpdateStatus: (handler) => {
    const listener = (_event, payload) => handler(payload)
    ipcRenderer.on("update:status", listener)
    return () => ipcRenderer.removeListener("update:status", listener)
  },
})
