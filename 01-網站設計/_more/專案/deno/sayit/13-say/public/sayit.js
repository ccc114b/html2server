window.onhashchange = async function () {
    var tokens = window.location.hash.split('/')
    var user
    switch (tokens[0]) {
      case '#home':
        Ui.goto(`#msgBy/sayit`)
        break
      case '#userList':
        await userList()
        break
      case '#signup':
        await signup()
        break
      case '#login':
        await login()
        break
      case '#msgBy':
        user = uriDecode(tokens[1])
        await msgList('By', user)
        break
      case '#msgTo':
        user = uriDecode(tokens[1])
        await msgList('To', user)
        break
      case '#msgFollow':
        user = uriDecode(tokens[1])
        await msgList('Follow', user)
        break
      default:
        console.log(`Error:hash=${tokens[0]}`)
        // Ui.goto('#home')
        break
    }
}

function menuSwitch(job) {
  switch (job) {
    case 'home': Ui.goto(`#home`); break
    case 'userList': Ui.goto(`#userList`); break
    case 'msgBy': Ui.goto(`#msgBy/${localStorage.getItem('user')}`); break
    case 'login': Ui.goto(`#login`); break
    case 'signup': Ui.goto(`#signup`); break
    default: break
  }
  Ui.id('menu').value = ''
}

window.onload = function () {
  window.onhashchange()
}

function usersHtml(users) {
  let outs = []
  for (let user of users) {
    outs.push(`<li><a href="#msgBy/${user}">${user}</a></li>`)
  }
  return outs.join('\n')
}

async function userList() {
  let r = await Server.get(`/userList`)
  let users = r.obj
  console.log('users=', users)
  Ui.show(`<h1>Users</h1>\n<ul>\n${usersHtml(users)}\n</ul>\n`)
}

async function signup() {
  Ui.show(`
  <form>
  <h1>註冊</h1>
  <p><input type="text" placeholder="使用者" id="user"></p>
  <p><input type="password" placeholder="密碼" id="password"></p>
  <p><input type="email" placeholder="電子信箱" id="email"></p>
  <p><button onclick="serverSignup()">註冊</button></p>
  </form>`)
}

async function login() {
  Ui.show(`
  <form>
  <h1>登入</h1>
  <p><input type="text" placeholder="使用者" id="user"></p>
  <p><input type="password" placeholder="密碼" id="password"></p>
  <p><button onclick="serverLogin()">登入</button></p>
  </form>`)
}

async function serverSignup() {
  let user = Ui.id('user').value
  let password = Ui.id('password').value
  let email = Ui.id('email').value
  let r = await Server.post('/signup', {user, password, email})
  console.log('serverLogin: r=', r)
  if (r.status == Status.OK) {
    alert('註冊成功，開始登入使用!')
    Ui.goto('#login')
  } else {
    alert('註冊失敗，請選擇另一個使用者名稱!')
  }
}

async function serverLogin() {
  let user = Ui.id('user').value
  let password = Ui.id('password').value
  let r = await Server.post('/login', {user, password})
  console.log('serverLogin: r=', r)
  if (r.status == Status.OK) {
    localStorage.setItem('user', user)
    Ui.goto(`#msgBy/${user}`)
  } else
    alert('登入失敗: 請輸入正確的帳號密碼!')
}

async function serverSayit() {
  let msg = Ui.id('say').value
  let user = localStorage.getItem('user')
  let r = await Server.post(`/msgAdd/${user}`, {msg})
  console.log(`sayit: user=${user} r=`, r)
  if (r.status == Status.OK) {
    localStorage.setItem('user', user)
    Ui.goto(`#`)
    Ui.goto(`#msgBy/${user}`)
  } else
    alert('貼文失敗!')
}

function timeFormat(time) {
  let minutes = Math.round((Date.now()-time)/(1000*60))
  console.log('minutes=', minutes)
  if (minutes<60)
    return `${minutes} minutes ago`
  else if (minutes < 60*24)
    return `${Math.round(minutes/60)} hours ago`
  else {
    let date = new Date(time)
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
  }
}

function msgFormat(msg) {
    var linkExp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    var html = msg.replace(linkExp,"<a href='$1'>$1</a>")
    html = html.replace(/@(\w+)/ig, "<a href='#msgBy/$1'>$1</a>")
    html = html.replace(/\n/ig, '<br/>')
    return html
}

function autosize(self) {
    self.style.height = 0;
    self.style.height = (self.scrollHeight) + "px";
}

async function msgList(op, user) {
    let r = await Server.get(`/msg${op}/${user}`)
    let msgs = r.obj
    let outs = []
    for (let msg of msgs) {
        let comments = []
        for (let comment of msg.comments) {
            comments.push(`<li><em class="user"><a href="#msgBy/${comment.user}">${comment.user}</a></em> : ${comment.msg}</li>`)
        }
        outs.push(`<li><em class="user"><a href="#msgBy/${msg.ufrom}">${msg.ufrom}</a></em> <em class="time">${timeFormat(msg.time)}</em> <br/> ${msgFormat(msg.msg)}\n<ul>\n${comments.join('\n')}\n</ul>\n</li>`)
    }
    Ui.show(`<h1><em class="user">${user}</em>
    <div class="op">
      <a href="#msgBy/${user}">By</a> / 
      <a href="#msgTo/${user}">To</a> / 
      <a href="#msgFollow/${user}">Follow</a>
    </div></h1>\n
    <ul>\n
      <li>
        <textarea id="say" oninput="autosize(this)" placeholder="${user} : Say something!"></textarea>
        <button class="op" onclick="serverSayit()">Sayit</button>
      </li>
      ${outs.join('\n')}\n
    </ul>\n`)
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
