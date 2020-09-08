const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("path");
const Dispatch = require("./dispatch");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      sandbox: true,

      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,

      preload: path.join(app.getAppPath(), "src/preload.js")
    },
    icon: path.join(app.getAppPath(), "buildResources/icon.png"),
    frame: false
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

const namespaces = ["contactInfo", "financialInfo", "personalInfo", "orgInfo", "employeesInfo", "employees", "packageInfo", "delete_employee"];

for (const namespace of namespaces)  {
  ipcMain.on(`${namespace}_load`, (event, _data) => {
    console.log(`${namespace}_load: main.js`);
    Dispatch
      .loadData(namespace)
      .then(result => event.reply(`${namespace}_load/response`, result));
  });

  ipcMain.on(`${namespace}_save`, (event, data) => {
    console.log(`${namespace}_save: main.js`);
    Dispatch
      .saveData(namespace, data)
      .then(() => event.reply(`${namespace}_save/response`));
  }); 
}
ipcMain.on("export", (event, data) => {
  console.log("export: main.js");
  console.log(JSON.stringify(data));
  Dispatch
    .exportData(data)
    .then(() => event.reply("export/response"));
});
ipcMain.on("closeWindow", (_event, _data) => {
  const win = BrowserWindow.getFocusedWindow(); /* Note this is different to the
html global `window` variable */
  win.close();
});

ipcMain.on("minWindow", (_event, _data) => {
  const win = BrowserWindow.getFocusedWindow(); /* Note this is different to the
html global `window` variable */
  win.minimize();
});

ipcMain.on("openLink", (_event, data) => {
  console.log(`main openLink: ${data}`);
  if(data === "releases"){
    shell.openExternal("https://github.com/KylaBendrik/fuzzy-computing-machine/releases");
  } else if(data === "issues"){
    shell.openExternal("https://github.com/KylaBendrik/fuzzy-computing-machine/issues");
  }
});
