const Signup = {}

Signup.html = `
<h1>註冊</h1>
<div><input type="text" id="email" placeholder="Email"/></div>
<BR/>
<div><input type="text" id="user" placeholder="User"/></div>
<BR/>
<div><input type="password" id="password" placeholder="Password"/></div>
<BR/>
<div><input type="password" id="password2" placeholder="Password Again"/></div>
<BR/>
<button onclick="Signup.signup()">註冊</button>
`

Signup.start = function () {
  Ui.show(Signup.html)
}

Signup.signup = async function() {
  let password1 = Ui.id('password').value
  let password2 = Ui.id('password2').value
  if (password1 != password2) {
    alert("錯誤，密碼兩次打得不一樣！")
    return
  }
  let success = await Server.signup({
    user:Ui.id('user').value, 
    password: Ui.id('password').value,
    email: Ui.id('email').value
  })
  if (!success) {
    alert("註冊失敗！")
  } else {
    alert("註冊成功")
    Ui.goto('#shop')
  }
}
