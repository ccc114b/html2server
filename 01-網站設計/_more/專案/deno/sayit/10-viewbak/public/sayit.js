window.onhashchange = async function () {
    var tokens = window.location.hash.split('/')
    switch (tokens[0]) {
      case '#home':
        Ui.goto('#userList')
        break
      case '#userList':
        await userList()
        break
      case '#userSignup':
        await userSignup()
        break
      case '#userLogin':
        await userLogin()
        break
      case '#userMsgs':
        let user = uriDecode(tokens[1])
        await userMsgs(user)
        break
      default: Ui.goto('#home'); break
    }
}

window.onload = function () {
    window.onhashchange()
}

function menuSwitch(job) {
  switch (job) {
    case 'msgs': Ui.goto(`#userMsgs/${localStorage.getItem('user')}`); break
    case 'login': Ui.goto(`#userLogin`); break
    case 'signup': Ui.goto(`#userSignup`); break
    default: break
  }
  Ui.id('menu').value = ''
}

function usersHtml(users) {
  let outs = []
  for (let user of users) {
    outs.push(`<li><a href="#userMsgs/${user}">${user}</a></li>`)
  }
  return outs.join('\n')
}

async function userList() {
  let r = await Server.get(`/user/list`)
  let users = r.obj
  console.log('users=', users)
  Ui.show(`<h1>Users</h1>\n<ul>\n${usersHtml(users)}\n</ul>\n`)
}

async function userSignup() {
  Ui.show(`
  <form>
  <h1>註冊</h1>
  <p><input type="text" placeholder="user" id="user"></p>
  <p><input type="password" placeholder="password" id="password"></p>
  <p><input type="email" placeholder="email" id="email"></p>
  <p><button onclick="serverSignup()">註冊</button></p>
  </form>`)
}

async function userLogin() {
  Ui.show(`
  <form>
  <h1>登入</h1>
  <p><input type="text" placeholder="user" id="user"></p>
  <p><input type="password" placeholder="password" id="password"></p>
  <p><button onclick="serverLogin()">Login</button></p>
  </form>`)
}

async function serverSignup() {
  let user = Ui.id('user').value
  let password = Ui.id('password').value
  let email = Ui.id('email').value
  let r = await Server.post('/user/signup', {user, password, email})
  console.log('serverLogin: r=', r)
  if (r.status == Status.OK) {
    alert('Signup success: You may login now!')
    Ui.goto('#userLogin')
  } else {
    alert('Signup fail: try another user name!')
  }
}

async function serverLogin() {
  let user = Ui.id('user').value
  let password = Ui.id('password').value
  let r = await Server.post('/user/login', {user, password})
  console.log('serverLogin: r=', r)
  if (r.status == Status.OK) {
    localStorage.setItem('user', user)
    Ui.goto(`#userMsgs/${user}`)
  } else
    alert('Login fail: try again!')
}

function ago(time) {
  let minutes = Math.round((Date.now()-time)/(1000*60))
  if (minutes<60)
    return `${minutes} minutes ago`
  else if (minutes < 60*24)
    return `${Math.round(minutes/60)} hours ago`
  else
    return `${Math.round(minutes/(60*24))} days ago`
}

async function userMsgs(user) {
    let r = await Server.get(`/user/${user}/msg`)
    let msgs = r.obj
    let outs = []
    for (let msg of msgs) {
        let comments = []
        for (let comment of msg.comments) {
            comments.push(`<li><em class="user">${comment.user}</em>:${comment.msg}</li>`)
        }
        outs.push(`<li><em class="user">${user}</em>:${msg.msg} : <em class="time">${ago(msg.time)}</em>\n<ul>\n${comments.join('\n')}\n</ul>\n</li>`)
    }
    Ui.show(`<h1>${user} 的留言</h1>\n<ul>\n${outs.join('\n')}\n</ul>\n`)
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
  return {status:r.status, obj:await r.json()}
}

Server.post = async function(path, params) {
  let r = await window.fetch(path, {
    body: JSON.stringify(params),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return {status:r.status, obj:await r.json()}
}

const Status = {
  OK:200,
  Fail:400,
  Unauthorized:401,
  Forbidden:403,
  NotFound:404,
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
