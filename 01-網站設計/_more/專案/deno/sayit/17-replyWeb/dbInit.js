import * as db from './db.js'

let users = [
    ["sayit","ccc313534", "sayit@gmail.com"],
    ["ccc", "ccc313534", "ccc@gmail.com"],
    ["tim", "ccc313534", "tim@gmail.com"],
    ["jack","ccc313534", "jack@gmail.com"],
    ["deno","ccc313534", "deno@gmail.com"],
]

let follows = [
    ['jack', 'tim'],
    ['jack', 'ccc'],
    ['tim', 'ccc'],
    ['ccc', 'tim'],
    ['ccc', 'deno'],
]

let msgs = [
    ["sayit", "sayit", "歡迎加入 sayit !", [
        {user:'sayit',msg:'這是個社交網路平台，用 deno 寫的！'},
        {user:'sayit',msg:'資料庫目前先用 sqlite'},
        {user:'sayit',msg:'採用最簡單的設計風格'},
        {user:'sayit',msg:'設計想法和 Twitter 有點像！'},
    ], Date.parse('2019/01/01 00:00:00 GMT')],
    ["sayit", "deno", "歡迎 @deno 加入 sayit !", [], Date.parse('2019/01/02 09:00:00 GMT')],
    ["sayit", "tim", "歡迎 @tim 加入 sayit !", [], Date.parse('2022/10/10 09:00:00 GMT')],
    ["sayit", "ccc", "歡迎 @ccc 加入 sayit !", [], Date.parse('2022/10/10 09:01:00 GMT')],
    ["sayit", "jack", "歡迎 @jack 加入 sayit !", [], Date.parse('2022/10/10 10:00:00 GMT')],
    ["ccc", "ccc", "我是陳鍾誠，有朋友看到我的貼文嗎？", [
        {user:'tim',msg:'有，我看到了！我是提姆！'},
    ], Date.parse('2022/10/16 10:10:00 GMT')],
    ["tim", "tim", "我想學程式，該學甚麼語言呢？", [
        {user:'ccc',msg:'如果沒有特定目標，學 Python 是比較好的選擇！'},
        {user:'ccc',msg:'如果想做網站，應該學 JavaScript + deno'},
        {user:'ccc',msg:'如果想做手機 APP，可以學 Dart + Flutter'},
    ], Date.parse('2022/10/16 10:15:00 GMT')],
    ["tim", "ccc", "請問學 C/C++ 有甚麼好處？", [
        {user:'ccc',msg:'速度很快'},
        {user:'ccc',msg:'學習 C 有助於看清底層，像是組合語言、計算機結構、系統程式等等'},
        {user:'tim',msg:'就我所知，學習 C++ 對參加程式競賽也很有幫助！'},
    ], Date.parse('2022/10/16 10:20:00 GMT')],
    ["ccc", "ccc", "好像兩年沒寫過十分鐘系列了\n今天來介紹 Lambda Calculus\nhttps://www.slideshare.net/ccckmit/calculus-253542231", [
        {user:'tim',msg:'老師之後可以考慮把各種 turing complete 的計算模型都拿來寫一遍 XD'},
    ], Date.parse('2022/10/16 10:30:00 GMT')],
    ["tim", "tim", "俄烏戰爭現在情況如何？", [
        {user:'ccc',msg:'自從克里米亞的橋斷了之後，俄國就開始報復性飛彈攻擊'},
        {user:'ccc',msg:'希望烏克蘭人民都平安！'},
        {user:'tim',msg:'對阿！'},
    ], Date.parse('2022/10/16 10:40:00 GMT')],
    ["tim", "tim","deno 真的不錯用，有人也在用 deno 嗎？",  [
        {user:'ccc',msg:'有阿！我有在用！'},
        {user:'ccc',msg:'比 node.js 好用很多'},
        {user:'tim',msg:'是阿，簡單清楚，沒有太多包袱遺產 ...'},
    ], Date.parse('2022/10/16 11:01:00 GMT')],
    ["ccc", "ccc","對於那些 1990 年就寫過視窗程式的人，如果你想重新開始寫程式，特別是網站。那麼，你只要知道：", [
        {user:'ccc',msg:'1. 視窗換成瀏覽器'},
        {user:'ccc',msg:'2. Visual Basic 換成 JavaScript'},
        {user:'ccc',msg:'3. dBase 換成 sqlite'},
        {user:'ccc',msg:'4. Visual Studio 換成 deno + Veisual Studio Code + Chrome 瀏覽器'},
        {user:'ccc',msg:'5. 微軟函式庫換成 JavaScript 標準函式庫+deno 函式庫 + 開放原始碼社群寫的一大堆套件'},
        {user:'ccc',msg:'而且，那些拖拉就可以設計畫面的 IDE，通常我們不用了，而是直接寫 HTML+CSS 去處理 ...\n其實，技術的世界雖然一直改變，但核心觀念總是大同小異的 ...'},
    ]],
    ["deno", "deno", "Deno 1.26 Release Notes", [
        {user:'deno',msg:'Deno 1.26 adds Cache Web API; improves permission system, experimental npm support, Node.js compatibility; ships with TypeScript 4.8, and more.'},
    ], Date.parse('2022/09/29 12:01:00 GMT')],
    ["deno", "deno", "Fresh 1.1 - automatic JSX, plugins, DevTools, and more", [
        {user:'deno',msg:'This release makes Fresh even more powerful with automatic JSX, plugins, DevTools integration and more.'},
    ], Date.parse('2022/09/27 12:01:00 GMT')],
    ["deno", "deno", "How to Build an E-commerce Site with a Perfect Lighthouse Score", [
        {user:'deno',msg:'This tutorial will show you how to optimize for performance with SSR and islands, as well as deploying to the edge.'},
    ], Date.parse('2022/08/30 12:01:00 GMT')],
    ["deno", "deno", "Deno 1.25 Release Notes", [
        {user:'deno',msg:'Deno 1.25 adds the `deno init` subcommand, experimental support for importing npm packages, a new faster web server, and performance improvements to the FFI.'},
    ], Date.parse('2022/08/25 12:01:00 GMT')],
    ["deno", "deno", "Roll your own JavaScript runtime", [
        {user:'deno',msg:'A walk-through of creating a CLI that executes JavaScript files.'},
    ], Date.parse('2022/07/29 12:01:00 GMT')],
    ["deno", "deno", "Deno 1.24 Release Notes", [
        {user:'deno',msg:'Deno 1.24 improves performance of transpiling and type-checking, adds unhandledrejection and beforeunload events, adds import.meta.resolve() API, and more'},
    ], Date.parse('2022/07/21 12:01:00 GMT')],
]

try {
    await Deno.remove('say.db')
    console.log('remove say.db')
} catch (e) {
}
await db.open()
await db.clear()

for (let [user, pass, email] of users) {
    await db.userAdd({user, pass, email})
}
for (let [follower, user] of follows) {
    await db.followAdd(follower, user)
}
let mid = null
for (let [ufrom, uto, msg, replys, time] of msgs) {
    mid = await db.msgAdd({ufrom, uto, msg, replys, time})
    // console.log('r=', r)
}
console.log('users=', await db.userList())
console.log('followTo(ccc)=', await db.followTo('ccc'))
console.log('followBy(jack)=', await db.followBy('jack'))
console.log('msgBy(tim)=', await db.msgBy('tim'))
console.log('msgBy(deno)=', await db.msgBy('deno'))
console.log('msgBy(ccc)=', await db.msgBy('ccc'))
console.log('msgTo(ccc)=', await db.msgTo('ccc'))
console.log('msgFollow(tim)=', await db.msgFollow('tim'))
console.log('msgFollow(ccc)=', await db.msgFollow('ccc'))
console.log(`msgGet(${mid})=`, await db.msgGet(mid))
console.log('msgKey(JavaScript)=', await db.msgKey('JavaScript'))
await db.replyAdd({mid, msg:'reply add test', user:'tim'})
await db.close()
