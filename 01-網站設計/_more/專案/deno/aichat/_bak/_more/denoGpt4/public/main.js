const menu = document.querySelector("#menu")
const main = document.querySelector('main')

// 頁面：問答
let pageChat = {
    html: `
    <div>
      <div>
        <select id="job" onchange="switchJob()"></select>
        <input type="text" id="question" placeholder="想要問 ChatGPT 的問題"/>
        <button id="qsubmit" onclick="submitQuestion()">送出</button>
      </div>
      <div style="width:16em">
        <input type="radio" name="mode" id="simple" onclick="switchMode('simple')" checked/> <label for="simple">簡易模式</label>
        <input type="radio" name="mode" id="advance" onclick="switchMode('advance')"/> <label for="advance">詳細模式</label>
      </div>
      <div id="advanceBox">
        <input type="text" class="long" id="queryLang" placeholder="輸出語言" value="輸出語言為中文"/>
        <input type="text" class="long" id="queryFormat" placeholder="輸出格式" value="輸出格式為 Markdown+LaTex"/>
        <input type="text" class="long" id="queryMore" placeholder="更多描述" value=""/>
        <div>附加文件</div>
        <textarea id="queryText"></textarea>
        <div>ChatGPT 回應</div>
        <textarea id="response"></textarea>
      </div>
    </div>
    <table id="questionTable">
    <tr><th style="width:5em">模板</th><th>問題</th><th style="width:5em">回答</th></tr>
    </table>
    `,
    init: function () {
        let jobNode = document.querySelector('#job')
        let options = []
        for (let key in jobs) {
            options.push(`<option value="${key}">${key}</option>`)
        }
        jobNode.innerHTML = options.join('\n')
        switchJob()
        switchMode('simple')
    }
}

// 頁面：模板
let pageTemplate = {
    html: `
    <select style="visibility: hidden">
      <option value="">　</option>
    </select>
    <textarea id="template">
    </textarea>
    `,
    init: function () {
        let template = document.querySelector('#template')
        template.value = JSON.stringify(jobs, null, 2)
    }
}

let jobs = {
    '模板': {question:'', more:'' },
    '寫書': {question:'請寫一本主題為 xxx 的書，先寫目錄', more:'章節盡量細分，每章至少要有 5 個小節，章用 第 x 章，小節前面用 1.1, 1.2 這樣的編號'},
    '寫信': {question:'請寫一封主題為 xxx 的信', more:''},
    '翻譯': {question:'請翻譯下列文章', more:'盡可能翻譯得通順流暢，可以不需要逐句對應'},
    '程式翻譯': {question:'請將下列程式轉換成 $目標程式語言', more:'函式庫呼叫的部分，保留原來的呼叫名稱，但改用目標語言的語法'},
}

const pages = {
    '問答': pageChat,
    '模板': pageTemplate,
}

menu.addEventListener("change", (event) => {
    switchPage()
})

function switchPage() {
    let page = pages[menu.value]
    if (page == null) {
        alert('無此分頁')
        return
    }
    main.innerHTML = page.html
    page.init()
}

switchPage()

function switchJob() {
    let qNode = document.querySelector('#question')
    let moreNode = document.querySelector('#queryMore')
    let jobNode = document.querySelector('#job')
    let job = jobs[jobNode.value]
    qNode.value = job.question
    moreNode.value = job.more || ''
}

function switchMode(mode) {
    let advanceBox = document.querySelector('#advanceBox')
    advanceBox.style.display = (mode == 'simple')?'none':'block'
}

function submitQuestion() {
    let jobNode = document.querySelector('#job')
    let questionNode = document.querySelector('#question')
    let question = questionNode.value.trim()
    if (question.length == 0) {
        alert('你沒輸入問題，請先輸入後再送出！')
        return
    }
    console.log('start chat')
    if (location.protocol != 'file:')
        chat(questionNode.value).then((response)=>{
            document.querySelector('#response').value = response.answer
        }).catch((error)=>{
            console.log('error=', error)
        })
    // add a new question
    let newNode = document.createElement('div')
    newNode.innerHTML = `<div> <i class="fa fa-eye"></i> ${question}</div>`
    const qTable = document.getElementById("questionTable")
    let row = qTable.insertRow(1)
    let jobCell = row.insertCell(0); jobCell.innerHTML = jobNode.value
    let questionCell = row.insertCell(1); questionCell.innerHTML = question
    let statusCell = row.insertCell(2); statusCell.innerHTML = '等待中'
    // qTable.prepend(newNode)
}

async function chat(question) {
    // let responseNode = document.querySelector('#response')
    let r = await window.fetch(`/chat/${question}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let response = await r.json()
    console.log(response)
    return response
    // responseNode.innerText = response.answer
}


