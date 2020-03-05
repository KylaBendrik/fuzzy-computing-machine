const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('MainAPI', {
  loadInfo(infoGroup) {
    return new Promise((resolve, _reject) => {
      ipcRenderer.once(`${infoGroup}_load/response`,
      (_event, data) => resolve(data));

      ipcRenderer.send(`${infoGroup}_load`, {})
    })
  },
  saveInfo(infoGroup, data) {
    return new Promise((resolve, _reject) => {
      ipcRenderer.once(`${infoGroup}_save/response`,
        (event) => resolve(event));
      
      ipcRenderer.send(`${infoGroup}_save`, data)
    })
  }
})