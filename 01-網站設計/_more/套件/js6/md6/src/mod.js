import C from './compiler.js'
import G from './generator.js'
const M = {}
export default M

M.parse = function (md) {
  return C.compile(md, G.treeGen)
}

M.newHtmlRender = function (options) {
  return new G.HtmlGenerator(options)
}

const defaultHtmlRender = M.newHtmlRender({})

M.toHtml = function (md) {
  return defaultHtmlRender.render(md)
}

/*
class MD6 {
  constructor(options) {
    this.options = options
  }
  gen(node) {} // 真正的節點轉換函數。
  render(md) { // 把 md 轉換成輸出 (ex: parseTree, html, tex, ...)
    return C.compile(md, function(node) {
      this.gen(node)
    })
  }
}

class HtmlRender extends MD6 {
  gen(node) {
    if (node.type == null) return node
    return this[node.type](node)
  }
  // inline
  text(x) { return x.body }
  code2(x) { return `<code>${x.body}</code>` }
  code1(x) { return `<code>${x.body}</code>` }
  star2(x) { return `<strong>${rs(x.body)}</strong>` }
  star1(x) { return `<strong>${rs(x.body)}</strong>` }
  under2(x) { return `<em>${rs(x.body)}</em>` }
  under1(x) { return `<em>${rs(x.body)}</em>` }
  url(x) { return `<a href="${x.body}">${x.body}</em>` }
  math1(x) { return `<span class="math inline">${x.body}</span>` }
  math(x) { return `<p><span class="math display">\n${x.body}\n</span></p>` }
  link(x) { return `<a href="${x.href}" alt="${x.alt}">${x.text}</a>` }
  // block
  blocks(x) { return x.childs.join('\n') }
  header(x) { return `<h${x.level}>${x.childs.join('')}</h${x.level}>` }
  line(x) { return `${x.childs.join('')}` }
  empty(x) { return `<p></p>\n`.repeat(x.count-1) }
  code(x) { return `<pre><code class="${x.lang}">${x.body}\n</code></pre>`}
  mark(x) { return `<blockquote>${x.childs.join('\n')}\n</blockquote>` }
  tabBlock(x) { return `<pre>${x.childs.join('\n')}\n</pre>` }
  image(x) { return `<img src="${x.href}" alt="${x.alt}">${rs(x.title)}</img>` }
  hline(x) { return '<hr>' }
  ref(x) { return '' }
  paragraph(x) { return `<p>${x.childs.join('\n')}</p>` }
  list(x) { return `${'    '.repeat(x.level)}<${x.listType}>\n${x.childs.join('\n')}\n${'    '.repeat(x.level)}</${x.listType}>`}
  li(x) { return `${'    '.repeat(x.level+1)}<li>${x.childs.join('')}</li>` }
  table(x) {
    let len = x.childs.length, list=[]
    for (let ri=0; ri<len; ri++) {
      let row = x.childs[ri]
      let rowHtml = ''
      switch (ri) {
        case 0: rowHtml = `<tr><th>${row.replace(/\|/g, '</th><th>')}</th></tr>`; break;
        case 1: rowHtml = ''; break
        default: rowHtml = `<tr><td>${row.replace(/\|/g, '</td><td>')}</td></tr>`; break;
      }
      list.push(rowHtml)
    }
    return `<table>\n${list.join('\n')}\n</table>`
  }
}

M.render = function (options) {
  let g = G.htmlGenerator(options)
  return new MD6(g)
}

M.parser = function () {
  let g = G.treeGenerator()
  return new MD6(g)
}
*/
/*
M.htmlRender = function (options) {
  let render = G.htmlRender(options)
}

class MD6 {
  constructor(options) {
    this.options = options
  }

  toHtml(md, options={}) {
    let html = C.compile(md, G.htmlRender, options)
    return (options.standalone) ? `${htmlHeader}${html}${htmlTail}` : html
  }

  parse(md) {
    return C.compile(md, G.treeGenerator)
  }
}
*/

/*
const M = module.exports = {}

M.toHtml = function (md, options={}) {
  let html = C.compile(md, G.htmlRender, options)
  return (options.standalone) ? `${htmlHeader}${html}${htmlTail}` : html
}

M.parse = function (md) {
  return C.compile(md, G.treeGenerator)
}
*/
/*
let htmlHeader = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="" xml:lang="">
<head>
  <meta charset="utf-8" />
  <meta name="generator" content="md6" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
  <title>math</title>
  <style>
      code{white-space: pre-wrap;}
      span.smallcaps{font-variant: small-caps;}
      span.underline{text-decoration: underline;}
      div.column{display: inline-block; vertical-align: top; width: 50%;}
  </style>
  <!-- katex -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.js"></script>
  <script>document.addEventListener("DOMContentLoaded", function () {
    var mathElements = document.getElementsByClassName("math");
    for (var i = 0; i < mathElements.length; i++) {
      var texText = mathElements[i].firstChild;
      if (mathElements[i].tagName == "SPAN") { katex.render(texText.data, mathElements[i], { displayMode: mathElements[i].classList.contains("display"), throwOnError: false } );
    }}});</script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"/>
  <!-- highlight.js -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/highlight.min.js"></script>
  <script>hljs.initHighlightingOnLoad();</script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/styles/vs.min.css"/>
  <!--[if lt IE 9]>
    <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv-printshiv.min.js"></script>
  <![endif]-->
</head>
<body>
`

let htmlTail = `
</body>
</html>
`
*/