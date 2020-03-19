const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('MainAPI', {
  loadData(infoGroup) {
    console.log("loadData(): preload.js")
    return new Promise((resolve, _reject) => {
      ipcRenderer.once(`${infoGroup}_load/response`,
      (_event, data) => resolve(data));

      ipcRenderer.send(`${infoGroup}_load`, {})
    })
  },
  saveData(infoGroup, data) {
    console.log("saveData(): preload.js")
    console.log(`send ${infoGroup}_save`)
    return new Promise((resolve, _reject) => {
      ipcRenderer.once(`${infoGroup}_save/response`,
        (event) => resolve(event));
      
      ipcRenderer.send(`${infoGroup}_save`, data)
    })
  }
})