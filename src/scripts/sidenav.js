const { BrowserWindow } = require('electron').remote

window.onload=function(){

  //console title
  const side_nav_pages = [
    {title_id: 'dashboard_page', 
      button: 'dashboard_btn', 
      html: 'index.html', 
      text: 'Dashboard', 
      color: '#007C89',
      button_style: 'focus'
    },
    {title_id: 'new_employee_page', 
      button: 'new_employee_btn',
      html: 'new_employee_wizard.html', 
      text: 'New Employee',
      color: '#29712A',
      button_style: 'new'
    },
    {title_id: 'employee_page', 
      button: 'employee_btn',
      html: 'employee_info.html', 
      text: 'Employees',
      color: '#7A0441',
      button_style: 'change'
    }
  ]

  // generate buttons
  parentDiv = document.getElementById("sidenav")
  let spacing = 40

  side_nav_pages.forEach(function (page, index) {
    let element = document.createElement('button')
    element.id = page.button
    element.style.backgroundColor = page.color
    element.innerHTML = page.text
    element.style.top = `${20 + (spacing * index)}px`

    // add event listener
    element.addEventListener('click', (event) => {
      console.log('button pushed: ', page.button)

      if (page.button_style == 'new'){
        let win = new BrowserWindow({ width: 600, height: 500, webPreferences: {
          nodeIntegration: true
        }, frame: false})
      
        win.on('close', () => {win = null})
        win.loadURL(`file://${__dirname}/${page.html}`)
        win.show()
    
        // win.webContents.getElementById("new_employee").style.backgroundColor = 'black';
        // Open the DevTools.
        // win.webContents.openDevTools();
      } else if (page.button_style == 'focus'){
        // focus on open page
        console.log(BrowserWindow.getAllWindows())
        window.close()
      } else {
        window.loadURL(page.html)
      }
      
    })

    parentDiv.appendChild(element)
  })


  // find current page
  const currentPage_id = document.getElementsByTagName("title")[0].id
  console.log(currentPage_id)

  function isCurrentPage(page) {
    return page.title_id === currentPage_id
  }

  currentPage = side_nav_pages.find(isCurrentPage)

  pageButton = document.getElementById(currentPage.button)

  pageButton.style.left = '-100px'
  pageButton.addEventListener("mouseover", mOver)
  pageButton.addEventListener("mouseout", mOut)
  // pageButton.removeEventListener('click')

  function mOver() {
    pageButton.style.left = '0px'
  }

  function mOut() {
    pageButton.style.left = '-100px'
  }
}


