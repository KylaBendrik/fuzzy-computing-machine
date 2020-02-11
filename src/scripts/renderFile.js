const ipcRenderer = require('electron').ipcRenderer;

function sendForm(event) {
    event.preventDefault() // stop the form from submitting
    let firstname = document.getElementById("firstname").value;
    ipcRenderer.send('form-submission', firstname)
}