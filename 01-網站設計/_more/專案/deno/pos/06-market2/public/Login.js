const Login = {}

Login.html = `
<h1>登入</h1>
<div><input type="text" id="User" placeholder="User"/></div>
<BR/>
<div><input type="password" id="Password" placeholder="Password"/></div>
<BR/>
<button onclick="Login.login()">登入</button>
<BR/><BR/>
還沒有帳號的話，請先 <a href="#signup">註冊！</a>
`

Login.start = function () {
  Ui.show(Login.html)
}

Login.login = async function() {
  let user = Ui.id('User').value
  let password = Ui.id('Password').value
  let success = await Server.login(user, password)
  if (!success) {
    alert("登入失敗！請重新輸入正確的帳號密碼")
  } else {
    alert("登入成功")
    Cache.set("user", user)
    Ui.goto('#shop')
  }
}
