const Logout = {}

Logout.html = `
<h1>登出</h1>
<button onclick="Logout.logout()">登出</button>
`

Logout.start = function () {
  Ui.show(Logout.html)
}

Logout.logout = async function() {
  let success = await Server.logout()
  if (!success) {
    alert("登出失敗！您尚未登入過！")
  } else {
    alert("登出成功")
    Ui.goto('#shop')
  }
}
