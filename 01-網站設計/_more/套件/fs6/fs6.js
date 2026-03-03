import * as fe6 from '../fe6/fe6.js'
import * as md6 from '../md6/md6.js'

function path2html(path) {
  if (!path.startsWith('/')) return path
  if (path.endsWith('/.meta.json')) path=path.substr(0, path.length-'/.meta.json'.length)
  const dpath = decodeURIComponent(path)
  const parts = dpath.split('/')
  const len = parts.length
  const links = [`<a href="#/.meta.json"><i class="fas fa-home"></i></a>`]
  const pStack = []
  for (let i = 1; i < len; i++) {
    pStack.push(parts[i])
    links.push(`<a href="#/${pStack.join('/')}/.meta.json">${parts[i]}</a>`)
  }
  return links.join(' / ')
}

fe6.on('load', async ()=> {
  console.log('onload')
  fe6.route(/#(.*)/, async function(m) {
    let path=m[1]
    console.log('path=', path)
    fe6.one('#header').innerHTML = path2html(path)
    let r = await fetch(path)
    var html
    if (path.endsWith('.meta.json')) {
      var folder = path.substr(0, path.length-'.meta.json'.length)
      var fList = await r.json()
      var rows = []
      for (let f of fList) {
        var name = f.isDirectory ? f.name+'/.meta.json' : f.name
        // font-awesome 的顏色設定請參考 -- https://fontawesome.com/how-to-use/on-the-web/referencing-icons/basic-use
        var icon = f.isDirectory ? `<i class="far fa-folder-open"></i>` : `<i class="far fa-file-alt"></i>`
        rows.push(`<tr><td><a href="#${folder}${name}">${f.name}</a></td><td>${icon}</td></tr>`)
      }
      html = `<table class="table"><tr><th>File</th><th>Type</th></tr>${rows.join('\n')}</table>`
    } else if (r.type.indexOf('image')>=0) {
      html = `<img src="${path}"/>`
    } else {
      let text = await r.text()
      if (path.endsWith(".md")) {
        html = md6.toHtml(text)
      } else {
        html = `<pre>${fe6.escape(text)}</pre>`
      }
    }
    var node = fe6.one('#main')
    // MathJax 參考 -- http://docs.mathjax.org/en/latest/web/typeset.html
    MathJax.typesetClear([node])
    node.innerHTML = html
    MathJax.typesetPromise([node]).then(() => {});
  })
  fe6.start(fe6.hash())
})

/*
    let r = await fetch(path)
    let type = r.headers.get("Content-Type") || ''
    console.log('r=', r)
    console.log('type=', type)
    var html = ''
    if (r.status != 200) {
      html = `Error: status = ${r.status}`
    } else if (type.indexOf('markdown')>=0) {
      let text = await r.text()
      html = md6.toHtml(text)
    } else if (type.indexOf('json')>=0) {
      var fList = await r.json()
      console.log('fList=', fList)
      var rows = []
      for (let f of fList) {
        var name = f.isDirectory ? f.name+'/' : f.name 
        rows.push(`<tr><td><a href="#${path}${name}">${name}</a></td></tr>`)
      }
      html = `<table><tr><th>File</th></tr>${rows.join('\n')}</table>`
    } else if (type.indexOf('image')>=0) {
      html = `<img src="${path}"/>`
    } else {
      let text = await r.text()
      html = `<pre>${fe6.escape(text)}</pre>`
    }
*/