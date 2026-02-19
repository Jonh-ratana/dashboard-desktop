const path = require("path")
const { app, BrowserWindow, Menu, nativeImage, ipcMain } = require("electron")
const { autoUpdater } = require("electron-updater")
const packageJson = require("./package.json")

const APP_ICON_PATH = path.join(__dirname, "icons.png")
let mainWindow = null
let updateState = {
  status: "idle",
  message: "",
  requiredUpdate: false,
}

function hasValidPublishConfig() {
  const publish = packageJson?.build?.publish
  const first = Array.isArray(publish) ? publish[0] : publish
  const owner = first?.owner
  const repo = first?.repo

  if (!owner || !repo) return false
  if (owner === "YOUR_GITHUB_USERNAME" || repo === "YOUR_REPO_NAME") return false
  return true
}

function loadAppIcon() {
  const icon = nativeImage.createFromPath(APP_ICON_PATH)
  return icon.isEmpty() ? null : icon
}

function createWindow() {
  const appIcon = loadAppIcon()
  const win = new BrowserWindow({
    width: 1100,
    height: 750,
    autoHideMenuBar: true,
    backgroundColor: "#ffffff",
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
    ...(appIcon ? { icon: appIcon } : {}),
  })
  mainWindow = win
  win.setBackgroundColor("#ffffff")
  win.setMenuBarVisibility(false)

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "dist", "index.html"))
    return
  }

  // DEV: load Vite
  const devServerUrl = process.env.VITE_DEV_SERVER_URL || "http://localhost:5173"
  win.loadURL(devServerUrl)
}

function sendUpdateStatus(status, message, extra = {}) {
  updateState = {
    ...updateState,
    status,
    message,
    ...extra,
  }
  if (!mainWindow || mainWindow.isDestroyed()) return
  mainWindow.webContents.send("update:status", updateState)
}

function setupAutoUpdater() {
  autoUpdater.autoDownload = false
  autoUpdater.autoInstallOnAppQuit = true

  autoUpdater.on("checking-for-update", () => {
    sendUpdateStatus("checking", "Checking for updates...")
  })
  autoUpdater.on("update-available", () => {
    sendUpdateStatus("available", "New update available. Update is required to continue.", {
      requiredUpdate: true,
    })
  })
  autoUpdater.on("update-not-available", () => {
    sendUpdateStatus("none", "App is up to date.", { requiredUpdate: false })
  })
  autoUpdater.on("error", (error) => {
    sendUpdateStatus("error", `Update failed: ${error?.message || "unknown error"}`)
  })
  autoUpdater.on("download-progress", (progressObj) => {
    const pct = Math.round(progressObj.percent || 0)
    sendUpdateStatus("downloading", `Downloading update... ${pct}%`)
  })
  autoUpdater.on("update-downloaded", () => {
    sendUpdateStatus("downloaded", "Update downloaded. Restarting to finish update...")
    setTimeout(() => {
      autoUpdater.quitAndInstall()
    }, 1200)
  })
}

ipcMain.handle("app:check-for-updates", async () => {
  if (!app.isPackaged) {
    const message = "Update check is available only in packaged app."
    sendUpdateStatus("dev", message)
    return { ok: false, message }
  }
  if (!hasValidPublishConfig()) {
    return { ok: false, message: "Update server is not configured yet." }
  }

  try {
    await autoUpdater.checkForUpdates()
    return { ok: true }
  } catch (error) {
    const message = "Unable to check updates right now."
    sendUpdateStatus("error", message)
    return { ok: false, message }
  }
})

ipcMain.handle("app:get-update-state", async () => {
  return updateState
})

ipcMain.handle("app:start-update", async () => {
  if (!app.isPackaged) {
    const message = "Updates are available only in packaged app."
    sendUpdateStatus("dev", message)
    return { ok: false, message }
  }
  if (!hasValidPublishConfig()) {
    const message = "Update server is not configured yet."
    sendUpdateStatus("error", message)
    return { ok: false, message }
  }

  try {
    sendUpdateStatus("downloading", "Starting update download...")
    await autoUpdater.downloadUpdate()
    return { ok: true }
  } catch (error) {
    const message = `Update download failed: ${error?.message || "unknown error"}`
    sendUpdateStatus("error", message)
    return { ok: false, message }
  }
})

app.whenReady().then(() => {
  Menu.setApplicationMenu(null)
  const appIcon = loadAppIcon()
  if (process.platform === "darwin" && appIcon) {
    app.dock.setIcon(appIcon)
  }
  createWindow()
  setupAutoUpdater()

  if (app.isPackaged && hasValidPublishConfig()) {
    autoUpdater.checkForUpdates().catch((error) => {
      sendUpdateStatus("error", "Unable to check updates right now.")
    })
  }
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})
