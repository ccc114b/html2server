let user = 'guest'

async function serverChat() {
  let questionNode = document.querySelector('#question')
  let question = questionNode.value.trim()
  if (question.length == 0) {
      alert('你沒輸入問題，請先輸入後再送出！')
      return
  }
  console.log('start chat')
  let cid = guid()
  // add a new question
  const qTable = document.querySelector("#questionTable")
  let row = qTable.insertRow(1)
  let timeCell = row.insertCell(0); timeCell.innerHTML = new Date().toISOString()
  let questionCell = row.insertCell(1); questionCell.innerHTML = question
  let statusCell = row.insertCell(2); statusCell.innerHTML = `<div id="status_${cid}">等待中</div>`

  if (location.protocol != 'file:') {
      Server.post(`/chat`, {cid, user, query:{question}}).then((r)=>{
          document.querySelector(`#status_${cid}`).innerHTML = `<a onclick="viewChat('${cid}')">可檢視</a>`
      }).catch((error)=>{
          console.log('error=', error)
      })
  }
}

async function viewChat(cid) {
  console.log('viewChat:', cid)
  let popupBox = document.querySelector('#popupBox')
  let viewBox = document.querySelector('#viewBox')
  let r = await Server.get(`/chatGet/${cid}`)
  console.log('r=', r)
  viewBox.innerText = r.obj.response.answer
  popupBox.style.display = 'block'
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

