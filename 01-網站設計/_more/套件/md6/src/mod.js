import C from './compiler.js'
import G from './generator.js'

export function parse(md) {
  return C.compile(md, G.treeGen)
}

export function newHtmlRender(options) {
  return new G.HtmlGenerator(options)
}

export const defaultHtmlRender = newHtmlRender({})

export function toHtml(md) {
  return defaultHtmlRender.render(md)
}
