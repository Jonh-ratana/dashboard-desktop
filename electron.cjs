const path = require("path")
const { app, BrowserWindow, Menu, nativeImage } = require("electron")

const APP_ICON_PATH = path.join(__dirname, "icons.png")

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
    ...(appIcon ? { icon: appIcon } : {}),
  })
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

app.whenReady().then(() => {
  Menu.setApplicationMenu(null)
  const appIcon = loadAppIcon()
  if (process.platform === "darwin" && appIcon) {
    app.dock.setIcon(appIcon)
  }
  createWindow()
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})
