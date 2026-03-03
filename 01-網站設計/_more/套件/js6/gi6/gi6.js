import md6 from '../md6/md6.js'

function path2html(path) {
  if (!path.startsWith('/')) return path
  const dpath = decodeURIComponent(path)
  const parts = dpath.split('/')
  const len = parts.length
  const links = [`<a href="#/">Root</a>`]
  const ppath = []
  for (let i = 1; i < len; i++) {
    ppath.push(parts[i])
    links.push(`<a href="#/${ppath.join('/')}">${parts[i]}</a>`)
  }
  return links.join(' / ')
}

fe6.on('load', ()=> {
  console.log('onload')
  fe6.router
    .route(/#(.*)/, async function(m) {
      let path=decodeURI(m[1])
      console.log('path=', path)
      fe6.ui.one('#header').innerHTML = path2html(path)
      let r = await window.fetch(path)
      // let post = await r.json()
      var text = await r.text()
      var html
      if (path.endsWith('.md')) {
        html = md6.toHtml(text)
      } else {
        html = `<pre>${fe6.escape(text)}</pre>`
      }
      console.log('html=', html)
      var node = fe6.ui.one('#main')
      // MathJax 參考 -- http://docs.mathjax.org/en/latest/web/typeset.html
      MathJax.typesetClear([node])
      node.innerHTML = html
      MathJax.typesetPromise([node]).then(() => {
        // the new content is has been typeset
        // console.log('MatjJax : typesetPromise called!')
      });
    })
    .default(()=>{})

  fe6.router.on()
  fe6.router.onhash()
})
