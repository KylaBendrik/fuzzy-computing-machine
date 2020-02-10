console.log('home.js loaded');
if (document != null){
  console.log('document loaded')
}

const { BrowserWindow } = require('electron').remote

window.onload=function(){
  const newEmployeeBtn = document.getElementById("new_employee");

  newEmployeeBtn.addEventListener('click', (event) => {
    console.log('button pushed!')
    const modalPath = './new_employee_wizard.html'
    let win = new BrowserWindow({ width: 400, height: 320})
  
    win.on('close', () => {win = null})
    win.loadURL(`file://${__dirname}/new_employee_wizard.html`)
    win.show()
  })
}


