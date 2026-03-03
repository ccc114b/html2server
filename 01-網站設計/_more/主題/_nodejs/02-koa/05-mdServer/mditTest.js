var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();
var result = md.render('# markdown-it rulezz!\n## subtitle\n [YouTube](http://tw.youtube.com)\n');
console.log('result=', result)