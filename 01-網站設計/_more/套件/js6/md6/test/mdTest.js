const md = `
[PARC]:https://en.wikipedia.org/wiki/PARC_(company)

* [PARC]

* [ABC]


user | description
-----|-------------
ccc  | abc <br/> def

aaa http://misavo.com bbb
aaa <http://misavo.com> bbb

http://misavo.com

<script>
  window.location.href = 'http://misavo.com'
</script>


\`\`\`
<script>
  window.location.href = 'http://misavo.com'
</script>
\`\`\`
`

const ok = require('assert').ok
const md8 = require('../src/index')

describe('Math', function() {
  describe('inTable', function() {
    it('convert', function() {
      let html = md8.toHtml(md)
      console.log('html=', html)
      ok(html.indexOf('>PARC<') > 0)
    })
  })
})
