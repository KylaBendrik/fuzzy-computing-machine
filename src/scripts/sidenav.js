console.log('sidenav.js loaded');
if (document != null){
  console.log('document loaded')
}

console.log(require)
if (require == null){
  console.log("require is null")
}
if (require == undefined){
  console.log("require is undefined")
}
if (require == false){
  console.log("require is false")
}
// if (require != undefined){
//   import { remote } from 'electron';
//   const { BrowserWindow } = remote;
// } else {
  const { BrowserWindow } = require('electron').remote
// }





window.onload=function(){
  const newEmployeeBtn = document.getElementById("new_employee");

  newEmployeeBtn.addEventListener('click', (event) => {
    console.log('button pushed!')
    let win = new BrowserWindow({ width: 600, height: 500, webPreferences: {
      nodeIntegration: true
    },})
  
    win.on('close', () => {win = null})
    win.loadURL(`file://${__dirname}/new_employee_wizard.html`)
    win.show()
    // Open the DevTools.
    win.webContents.openDevTools();
  })
}


