const fe6 = {}

fe6.on = function (name, f) {
  window.addEventListener(name, f)
}

fe6.go = function (hash) { fe6.router.go(hash) }

fe6.escape = function(text) {
  return text.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// ============= ui ===================
fe6.ui = {}

fe6.ui.id = function(path) {
  return document.getElementById(path)
}

fe6.ui.one = function(path) {
  return document.querySelector(path)
}

fe6.ui.showPanel = function(name) {
  document.querySelectorAll('.panel').forEach((node)=>node.style.display='none')
  fe6.ui.id(name).style.display = 'block'
}

fe6.ui.show = function (html) {
  fe6.ui.id('main').innerHTML = html
}

fe6.ui.openNav = function () {
  fe6.ui.id('mySidenav').style.width = '250px'
}

fe6.ui.closeNav = function () {
  fe6.ui.id('mySidenav').style.width = '0'
}

// ============= router ===================
fe6.router = {
  list:[]
}

fe6.router.route = function (regexp, f) {
  fe6.router.list.push([regexp, f])
  return this
}

fe6.router.default = function (f) {
  fe6.router.list.push([/.*/, f])
}

fe6.router.onhash = async function () {
  var hash = location.hash.trim()
  // console.log('onhash:hash=', hash)
  // console.log('fe6.router.list=', fe6.router.list)
  for (let [regexp, f] of fe6.router.list) {
    var m = hash.match(regexp)
    if (m) {
      console.log('router.match(', regexp, ') m=', m)
      f(m, hash)
      return m
    }
  }
  return null
}

fe6.router.on = function () {
  window.addEventListener('hashchange', fe6.router.onhash)
}

fe6.router.go = function (hash) {
  window.location.hash = hash
  return fe6.router.onhash()
}

// ===================== tb (table) =========================
fe6.tb = {}

fe6.tb.cell2text = function (v, type) {
  if (v == null) return ''
  switch (type) {
    case 'boolean': return (v == false) ? '0' : '1'
    case 'number': return ''+v
  }
  return v
}

fe6.tb.text2cell = function (text, type) {
  if (text.trim() === '') return undefined
  switch (type) {
    case 'boolean': return (text == true || text == "true")
    case 'number': return parseFloat(text)
  }
  return text
}

fe6.tb.attachTo = function (selector, args) {
  var node = document.querySelector(selector)
  var html = `
  <p>
    <i class="add fa fa-plus-circle" aria-hidden="true"></i>
    <i class="edit fa fa-edit"></i>
    <i class="save fa fa-save"></i>
  </p>
  <div>
    ${fe6.tb.table2html(args)}
  </div>
  `
  node.innerHTML = html
  node.querySelector('.edit').addEventListener("click", function () { fe6.tb.renewTable(args); })
  node.querySelector('.save').addEventListener("click", function () { fe6.tb.updateRecords(args); })
  node.querySelector('.add').addEventListener("click", function () { fe6.tb.addRow(args); })
  return args
}

fe6.tb.table2html = function (args) {
  var {fields, types, titles, records, styles, templates, editable, id} = args
  titles = titles || fields
  templates = templates || []
  var fcells = []
  for (var fi=0; fi<fields.length; fi++) {
    fcells[fi] = `<th>${titles[fi]}</th>`
  }
  var header = `<tr>${fcells.join('\n')}</tr>`
  var rows = []
  for (var record of records) {
    var cells = []
    for (var fi=0; fi<fields.length; fi++) {
      var style = (styles == null) ? '' : styles[fi]
      var cell = fe6.tb.cell2text(record[fields[fi]], types[fi])
      var template = templates[fi] || '<%=cell%>'
      var expand = template.replaceAll('<%=cell%>', cell)
      cells.push(`<td contenteditable="${editable}" style="${style}">${expand}</td>`)
    }
    rows.push(`<tr>${cells.join('')}</tr>`)
  }
  var body = rows.join('\n')
  return `
<table id="${id}">
  <thead>${header}</thead>
  <tbody>${body}</tbody>
</table>`
}

fe6.tb.updateRecords = function (args) {
  var { records, fields, types, id } = args
  var rows = document.querySelectorAll(`#${id} tr`)
  for (var ri=1; ri<rows.length; ri++) {
    var cells = rows[ri].querySelectorAll('td')
    var record = records[ri-1] || {}
    for (var ci=0; ci<cells.length; ci++) {
      var cell = cells[ci].innerText.trim()
      record[fields[ci]] = fe6.tb.text2cell(cell, types[ci])
    }
    records[ri-1] = record
  }
  args.records = records.slice(0, rows.length-1);
  var map = fe6.tb.toMap(args.records, args.key)
  console.log(map)
  var list = fe6.tb.toList(map)
  console.log(list)
}

fe6.tb.addRow = function (args) {
  console.log("fe6.tb.tableAddRow()")
  var { fields, id, editable } = args
  var tbody = document.querySelector(`#${id} tbody`)
  var row = []
  for (var fi=0; fi<fields.length; fi++) {
    row.push(`<td contenteditable="${editable}">&nbsp;</td>`)
  }
  tbody.innerHTML += `<tr>${row.join('')}</tr>`
}

fe6.tb.toMap = function (list, key) {
  var map = {}
  for (var o of list) {
    map[o[key]] = o
  }
  return map
}

fe6.tb.toList = function (map) {
  return Object.values(map)
}

// ================== lib ========================
fe6.lib = {}

fe6.lib.dateToString = function (date) {
  return date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()
}

fe6.lib.timeToString = function (date) {
  return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
fe6.lib.guid = function() {
  var s4 = function() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

// ================= fe6.cache =======================
fe6.cache = {
  map: new Map()
}

fe6.cache.load = function (key) {
  var value = fe6.cache.map.get(key)
  if (value != null) return value
}

fe6.cache.save = function (key, value) {
  fe6.cache.map.set(key, value)
}

// ============= fe6.db (Database) ==================
fe6.db = {}

fe6.db.normal = function (key) {
  return key.toLowerCase() // 轉小寫，正規化！
}

fe6.db.saveLocal = function (key, value) {
  var k = fe6.db.normal(key)
  fe6.cache.save(k, value)
  localStorage.setItem(k, JSON.stringify(value))
}

fe6.db.save = function (key, value) {
  fe6.db.saveLocal(key, value)
}

fe6.db.loadLocal = function (key) {
  var k = fe6.db.normal(key)
  var value = fe6.cache.load(k, value)
  if (value != null) return value
  var json = localStorage.getItem(k)
  if (json != null) {
    value = JSON.parse(json)
    fe6.cache.save(k, value)
    return value
  }
  return null
}

fe6.db.load = function (key) {
  return fe6.db.loadLocal(key)
}

fe6.db.add = function (key, n) {
  var k = fe6.db.normal(key)
  var value = fe6.db.load(k)
  if (value == null) return null
  value += n
  fe6.db.save(k, value)
  return value
}
