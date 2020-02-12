const ipcRenderer = require('electron').ipcRenderer;

function sendForm(event) {
    event.preventDefault() // stop the form from submitting
    let firstname = document.getElementById("firstname").value;
    let middlename = document.getElementById("middlename").value;
    let lastname = document.getElementById('lastname').value;
    ipcRenderer.send('form-submission', `${lastname}, ${firstname} ${middlename}`)
}