window.onhashchange = async function () {
    var tokens = window.location.hash.split('/')
    switch (tokens[0]) {
      case '#home':
        Ui.show("<h1>Just Say It!</h1>")
        break
      case '#userList':
          await userList()
          break
      case '#userSays':
        let user = uriDecode(tokens[1])
        await userSays(user)
        break
      default: Ui.goto('#home'); break
    }
}

window.onload = function () {
    window.onhashchange()
}

function usersHtml(users) {
  let outs = []
  for (let user of users) {
    outs.push(`<li><a href="#userSays/${user}">${user}</a></li>`)
  }
  return outs.join('\n')
}

async function userList() {
  let users = await Server.get(`/user/list`)
  console.log('users=', users)
  Ui.show(`<h1>Users</h1>\n<ul>\n${usersHtml(users)}\n</ul>\n`)
}

async function userSays(user) {
    let says = await Server.get(`/say/${user}`)
    console.log('says=', says)
    let outs = []
    for (let say of says) {
        let comments = []
        for (let comment of say.comments) {
            comments.push(`<li>${comment.user}:${comment.msg}</li>`)
        }
        outs.push(`<li>${say.msg} : ${Math.round((Date.now()-say.time)/(1000*60))} minutes ago\n<ul>\n${comments.join('\n')}\n</ul>\n</li>`)
    }
    Ui.show(`<h1>${user}</h1>\n<ul>\n${outs.join('\n')}\n</ul>\n`)
}

function uriDecode(line) {
  return (line == null)?null:decodeURIComponent(line)
}

// ====================== Server ====================
const Server = {}

Server.get = async function(path) {
  let r = await window.fetch(path, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return await r.json()
}

Server.post = async function(path, params, mode="alert") {
  let r = await window.fetch(path, {
    body: JSON.stringify(params),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (mode != "alert") return r.status==200
  if (r.status == 200)
    alert("上傳成功！")
  else
    alert("上傳失敗: 原因是 "+r.statusText)
}

// ========================= Ui ======================
const Ui = {}

Ui.id = function(path) {
  return document.getElementById(path)
}

Ui.one = function(path) {
  return document.querySelector(path)
}

Ui.showPanel = function(name) {
  document.querySelectorAll('.panel').forEach((node)=>node.style.display='none')
  Ui.id(name).style.display = 'block'
}

Ui.show = function (html) {
  Ui.id('main').innerHTML = html
}

Ui.openNav = function () {
  Ui.id('mySidenav').style.width = '200px'
}

Ui.closeNav = function () {
  Ui.id('mySidenav').style.width = '0'
}

Ui.goto = function (hash) {
  window.location.hash = hash
}
