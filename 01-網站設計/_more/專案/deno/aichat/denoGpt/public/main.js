let user = 'guest' // null

window.onhashchange = async function () {
    var tokens = window.location.hash.split('/')
    switch (tokens[0]) {
      case '#home':
        await home()
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
      case '#chat':
        user = uriDecode(tokens[1])
        await chat(user)
        break
      default:
        console.log(`Error:hash=${tokens[0]}`)
        break
    }
}

function menuSwitch(item) {
  let user = localStorage.getItem('user')
  switch (item) {
    case 'home': Ui.goto(`#home`); break
    case 'userList': Ui.goto(`#userList`); break
    case 'login': Ui.goto(`#login`); break
    case 'signup': Ui.goto(`#signup`); break
    case 'chat': Ui.goto(`#chat`); break
    default: break
  }
  Ui.id('menu').value = ''
}

window.onload = function () {
  window.onhashchange()
}

async function home() {
  Ui.show(`
  <p>如果你經常使用 ChatGPT ，卻又覺得他回應太慢，希望能提升效率，那麼你就應該使用 DenoGPT！</p>
  <ol>
    <li>想先試用，請用 <a href="#login">guest 帳號登入</a> ！ </li>
    <li>已經有帳號，請 <a href="#login">登入</a> ！ </li>
    <li>還沒有帳號，請 <a href="#signup">註冊</a> ！ </li>
    <li>如果您已經登入了，請 <a href="#chat">開始使用</a> ！ </li>
  </ol>
  `)
}

function usersHtml(users) {
  let outs = []
  for (let user of users) {
    outs.push(`<li><a href="#user/${user}">${user}</a></li>`)
  }
  return outs.join('\n')
}

async function userList() {
  let r = await Server.get(`/userList`)
  let users = r.obj
  // console.log('users=', users)
  Ui.show(`<h1>Users</h1>\n<ul>\n${usersHtml(users)}\n</ul>\n`)
}

async function signup() {
  Ui.show(`
  <form onsubmit="return false">
  <h1>註冊</h1>
  <p><input type="text" placeholder="使用者" id="user"></p>
  <p><input type="password" placeholder="密碼" id="password"></p>
  <p><input type="email" placeholder="電子信箱" id="email"></p>
  <p><button onclick="serverSignup()">註冊</button></p>
  </form>`)
}

async function login() {
  Ui.show(`
  <form onsubmit="return false">
  <h1>登入</h1>
  <p><input type="text" placeholder="使用者" id="user" value="guest"></p>
  <p><input type="password" placeholder="密碼" id="password" value="denogpt123"></p>
  <p><button onclick="serverLogin()" id="loginSubmit">登入</button></p>
  </form>`)
}

async function chat(user) {
  Ui.show(`
  <form onsubmit="return false">
    <div>
      <input type="text" id="question" class="long" placeholder="想要問 ChatGPT 的問題"/>
      <button onclick="serverChat()" id="chatSubmit">送出</button>
    </div>
    <div style="width:16em" class="center">
      <input type="radio" name="mode" id="simple" onclick="switchMode('simple')" checked/> <label for="simple">簡易模式</label>
      <input type="radio" name="mode" id="advance" onclick="switchMode('advance')"/> <label for="advance">詳細模式</label>
    </div>
    <!-- advance --->
    <div id="advanceBox" style="display:none">
      <input list="tagList" name="tag" id="tag" onchange="switchJob()" placeholder="套用模板">
      <datalist id="tagList"></datalist>
      <textarea id="more"></textarea>
    </div>
  </form>
  <!-- table -->
  <table id="chatTable">
  <tr><th style="width:5em">模板</th><th>問題</th><th style="width:5em">回應狀態</th></tr>
  </table>
  <!-- popup -->
  <div id="popupBox" class="popupBox" style="display:none">
      <button onclick="viewClose()" class="dark" style="float:right">關閉</button>
      <select>
        <option value="json">JSON</option>
        <option value="plaintext">PlainText</option>
        <option value="markdown" selected="selected">Markdown</option>
      </select>
      <div id="viewRenderBox" style="height:90%;overflow:auto;">
      </div>
      <pre id="viewSourceBox" style="display:none;height:90%;overflow:auto;"></pre>
  </div>
  `)
  initJobs()
  loadChatList()
}

async function loadChatList() {
  let r = await Server.get(`/chatList`)
  let chatList = r.obj
  // console.log('chatList=', chatList)
  for (let c of chatList) {
    insertChatTableRow(c.query.tag||'', c.query.question, `<div id="status_${c.cid}" onclick="viewChat('${c.cid}')" class="link">可檢視</div>`)
  }
}

// ============== Chat 畫面處理函數 ================
function switchMode(mode) {
  let advanceBox = document.querySelector('#advanceBox')
  advanceBox.style.display = (mode == 'simple')?'none':'block'
}

let jobs = {
  '': {question:'', more:'' },
  '寫書': {question:'請寫一本主題為 xxx 的書，先寫目錄', more:'章節盡量細分，每章至少要有 5 個小節，章用 第 x 章，小節前面用 1.1, 1.2 這樣的編號'},
  '寫信': {question:'請寫一封主題為 xxx 的信', more:''},
  '翻譯': {question:'請翻譯下列文章', more:'盡可能翻譯得通順流暢，可以不需要逐句對應'},
  '程式翻譯': {question:'請將下列程式轉換成 xxx 語言', more:'函式庫呼叫的部分，保留原來的呼叫名稱，但改用目標語言的語法'},
}

function initJobs() {
  let tagListNode = document.querySelector('#tagList')
  let options = []
  for (let tag in jobs) {
      options.push(`<option value="${tag}">${tag}</option>`)
  }
  tagListNode.innerHTML = options.join('\n')
}

function switchJob() {
  let questionNode = document.querySelector('#question')
  let moreNode = document.querySelector('#more')
  let tagNode = document.querySelector('#tag')
  let job = jobs[tagNode.value]
  questionNode.value = job.question || ''
  moreNode.value = job.more || ''
}

// ================ 對 server 的請求函數 ===================
async function serverSignup() {
  let user = Ui.id('user').value
  let password = Ui.id('password').value
  let email = Ui.id('email').value
  let r = await Server.post('/signup', {user, password, email})
  console.log('serverSignup: r=', r)
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
    Ui.goto(`#chat/${user}`)
  } else
    alert('登入失敗: 請輸入正確的帳號密碼!')
}

function insertChatTableRow(tag, question, statusHtml) {
  const cTable = document.querySelector("#chatTable")
  let row = cTable.insertRow(1)
  let jobCell = row.insertCell(0); jobCell.innerHTML = tag
  let questionCell = row.insertCell(1); questionCell.innerHTML = question
  let statusCell = row.insertCell(2); statusCell.innerHTML = statusHtml  
}

async function serverChat() {
  let questionNode = document.querySelector('#question')
  let moreNode = document.querySelector('#more')
  let tagNode = document.querySelector('#tag')
  let question = questionNode.value.trim()
  let more = moreNode.value.trim()
  let tag = tagNode.value
  if (question.length == 0) {
      alert('你沒輸入問題，請先輸入後再送出！')
      return
  }
  // console.log('start chat')
  let cid = guid()
  insertChatTableRow(tagNode.value, question, `<div id="status_${cid}">等待中</div>`)

  if (location.protocol != 'file:') {
      Server.post(`/chat`, {cid, user, query:{question, more, tag}}).then((r)=>{
          document.querySelector(`#status_${cid}`).innerHTML = `<a onclick="viewChat('${cid}')">可檢視</a>`
      }).catch((error)=>{
          console.log('error=', error)
      })
  }
}

let mdit = window.markdownit()

async function viewChat(cid) {
  // console.log('viewChat:', cid)
  let popupBox = document.querySelector('#popupBox')
  let viewSourceBox = document.querySelector('#viewSourceBox')
  let viewRenderBox = document.querySelector('#viewRenderBox')
  let r = await Server.get(`/chatGet/${cid}`)
  popupBox.style.display = 'block'
  viewSourceBox.innerText = JSON.stringify(r, null, 2)
  // console.log('json=\n', JSON.stringify(r, null, 2))
  viewRenderBox.innerHTML = mdit.render(r.obj.response.answer)
}

function viewClose() {
  let popupBox = document.querySelector('#popupBox')
  popupBox.style.display = 'none'
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

// ======================== Library ================
function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

function timeFormat(time) {
  let minutes = Math.round((Date.now()-time)/(1000*60))
  // console.log('minutes=', minutes)
  if (minutes<60)
    return `${minutes} minutes ago`
  else if (minutes < 60*24)
    return `${Math.round(minutes/60)} hours ago`
  else {
    let date = new Date(time)
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
  }
}

function autosize(self) {
    self.style.height = 0;
    self.style.height = (self.scrollHeight) + "px";
}

function uriDecode(line) {
  return (line == null)?null:decodeURIComponent(line)
}

