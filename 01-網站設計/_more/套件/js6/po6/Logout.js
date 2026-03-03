const Logout = {}

Logout.html = `
<h1>登出</h1>
<form>
  <p>請按下列按鈕登出！</p>
  <p><input type="submit" onclick="Logout.logout()" value="登出"></p>
</form>
`

Logout.start = function () {
  fe6.ui.show(Logout.html)
}

Logout.logout = function () {
  Model.logout()
  fe6.router.go(`#login`)
}
