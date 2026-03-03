const ok = require('assert').ok
const md8 = require('../src/index')

const exp = '\int_0^{\infty} f(x) dx'

describe('Math', function() {
  describe('pandoc syntax', function() {
    it('embedded math', function() {
      let html = md8.toHtml('# math \nembedded math: $'+exp+'$ formula !')
      console.log('html=', html)
      ok(html.indexOf('\\(') > 0)
    })
    it('blocked math', function() {
      let html = md8.toHtml('# math \n$$\n'+exp+'\n$$\n end !')
      console.log('html=', html)
      ok(html.indexOf('\\[') > 0)
    })
  })
  describe('gitlab syntax', function() {
    it('embedded math', function() {
      let html = md8.toHtml('# math \nembedded math: $`'+exp+'`$ formula !')
      console.log('html=', html)
      ok(html.indexOf('\\(') > 0)
    })
    it('blocked math', function() {
      let html = md8.toHtml('# math \n```math\n'+exp+'\n```\n end !')
      console.log('html=', html)
      ok(html.indexOf('\\[') > 0)
    })
  })
})