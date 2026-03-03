const Login = {}

Login.html = `
<h1>登入</h1>
<form>
  <p><input type="text" placeholder="帳號" id="userId"></p>
  <p><input type="password" placeholder="密碼" id="userPassword"></p>
  <p><input type="button" onclick="Login.login()" value="登入"></p>
  <p>新使用者？ 請 <a href="#signup">創建新帳號 ！</a></p>
</form>
`

Login.start = function () {
  fe6.ui.show(Login.html)
}

Login.login = function () {
  var id = fe6.ui.id('userId').value
  var password = fe6.ui.id('userPassword').value
  if (Model.login(id, password)) {
    Model.saveLocal()
    fe6.router.go(`#user/${id}`)
  } else {
    alert('帳號或密碼錯誤！')
  }
}