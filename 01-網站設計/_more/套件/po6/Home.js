const Home = {}

Home.html = `
<h2>文學式 POS 系統</h2>

<p>這是一個《很像電子書》的購物商店系統，您可以在這裡使用下列服務：</p>

<table>
<tr><th>服務</th><th>流程</th></tr>
<tr>
  <td>基本</td>
  <td>
    <a href="#signup">註冊</a> / 
    <a href="#login">登入</a> / 
    <a href="#logout">登出</a> / 
    <a href="#my">我的專區</a>
  </td>
</tr>
<tr>
  <td>開店</td>
  <td>
    請到 <a href="#my">我的專區</a> 新增商店後，開始使用 <a href="#pos">POS</a> 購物系統！ 
  </td>
</tr>
<tr>
  <td>購物</td>
  <td>
    請 <a href="#login">登入</a> 後 <a href="#market">逛商場購物</a> 然後在 <a href="#cart">購物車</a> 結帳！ 
  </td>
</tr>
</table>
`

Home.start = function () {
  Model.init()
  fe6.ui.show(Home.html)
}

window.addEventListener('load', ()=> {
  console.log('onload')
  fe6.router
    .route(/#home/, Home.start)
    .route(/#signup/, Signup.start)
    .route(/#login/, Login.start)
    .route(/#logout/, Logout.start)
    .route(/#market/, Market.start)
    .route(/#pos/, Pos.start)
    .route(/#cart/, Cart.start)
    .route(/#shop\/([^\/]*)/, (m)=>{ let id=decodeURI(m[1]); Shop.start(id)})
    .route(/#user\/([^\/]*)/, (m)=>{ let id=decodeURI(m[1]); User.start(id)})
    .route(/#my/, ()=>{
      let user = Model._user
      if (user == null) {
        alert('您尚未登入！')
      } else {
        fe6.router.go(`#user/${user.id}`)
      }
    })
    .default(()=>fe6.router.go('#home'))
     // .route(/#setting/, Setting.start)
  window.addEventListener('hashchange', fe6.router.onhash)
  fe6.router.onhash()
})

// 提示訊息無法自訂，但其他動作可以執行，因為有駭客問題：
// https://dev.to/chromiumdev/sure-you-want-to-leavebrowser-beforeunload-event-4eg5

window.addEventListener('beforeunload', function() {
  console.log('onbeforeunload')
  Model.saveLocal()
  // return 'xxxAre you sure you want to leave?'
})
