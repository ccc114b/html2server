const Login = {}

Login.html = `
<h1>登入</h1>
<div><input type="text" id="User" placeholder="User"/></div>
<BR/>
<div><input type="password" id="Password" placeholder="Password"/></div>
<BR/>
<button onclick="Login.login()">登入</button>
`

Login.start = function () {
  Ui.show(Login.html)
}

Login.login = async function() {
  let success = await Server.login(Ui.id('User').value, Ui.id('Password').value)
  if (!success) {
    alert("登入失敗！請重新輸入正確的帳號密碼")
  } else {
    alert("登入成功")
    Ui.goto('#shop')
  }
}
