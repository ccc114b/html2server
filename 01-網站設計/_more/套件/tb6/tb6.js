// ===================== tb (table) =========================
function cell2text(v, type) {
  if (v == null) return ''
  switch (type) {
    case 'boolean': return (v == false) ? '0' : '1'
    case 'number': return ''+v
  }
  return v
}

function text2cell(text, type) {
  if (text.trim() === '') return undefined
  switch (type) {
    case 'boolean': return (text == true || text == "true")
    case 'number': return parseFloat(text)
  }
  return text
}

export function attachTo(selector, args) {
  var node = document.querySelector(selector)
  var html = `
  <p>
    <i class="add fa fa-plus-circle" aria-hidden="true"></i>
    <i class="edit fa fa-edit"></i>
    <i class="save fa fa-save"></i>
  </p>
  <div>
    ${table2html(args)}
  </div>
  `
  node.innerHTML = html
  node.querySelector('.edit').addEventListener("click", function () { renewTable(args); })
  node.querySelector('.save').addEventListener("click", function () { updateRecords(args); })
  node.querySelector('.add').addEventListener("click", function () { addRow(args); })
  return args
}

export function table2html(args) {
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
      var cell = cell2text(record[fields[fi]], types[fi])
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

export function updateRecords(args) {
  var { records, fields, types, id } = args
  var rows = document.querySelectorAll(`#${id} tr`)
  for (var ri=1; ri<rows.length; ri++) {
    var cells = rows[ri].querySelectorAll('td')
    var record = records[ri-1] || {}
    for (var ci=0; ci<cells.length; ci++) {
      var cell = cells[ci].innerText.trim()
      record[fields[ci]] = text2cell(cell, types[ci])
    }
    records[ri-1] = record
  }
  args.records = records.slice(0, rows.length-1);
  var map = toMap(args.records, args.key)
  console.log(map)
  var list = toList(map)
  console.log(list)
}

export function addRow(args) {
  console.log("tableAddRow()")
  var { fields, id, editable } = args
  var tbody = document.querySelector(`#${id} tbody`)
  var row = []
  for (var fi=0; fi<fields.length; fi++) {
    row.push(`<td contenteditable="${editable}">&nbsp;</td>`)
  }
  tbody.innerHTML += `<tr>${row.join('')}</tr>`
}

export function toMap(list, key) {
  var map = {}
  for (var o of list) {
    map[o[key]] = o
  }
  return map
}

export function toList(map) {
  return Object.values(map)
}

