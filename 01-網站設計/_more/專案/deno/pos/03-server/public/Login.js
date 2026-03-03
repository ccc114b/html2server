const Login = {}

Login.html = `
<div><input type="text" name="user" placeholder="User"/></div>
<BR/>
<div><input type="password" name="password" placeholder="Password"/></div>
<BR/>
<button onclick="Login.login()">登入</button>
`

Login.start = function () {
  Ui.show(Login.html)
}

