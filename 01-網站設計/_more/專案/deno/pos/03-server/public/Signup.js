const Signup = {}

Signup.html = `
<div><input type="text" name="email" placeholder="Email"/></div>
<BR/>
<div><input type="text" name="user" placeholder="User"/></div>
<BR/>
<div><input type="password" name="password" placeholder="Password"/></div>
<BR/>
<button onclick="Signup.signup()">登入</button>
`

Signup.start = function () {
  Ui.show(Signup.html)
}

