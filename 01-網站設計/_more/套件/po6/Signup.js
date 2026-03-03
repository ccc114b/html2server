const Signup = {}

Signup.html = `
<h1>註冊</h1>
<form action="/signup" method="post">
  <p><input type="text" placeholder="帳號" name="username"></p>
  <p><input type="password" placeholder="密碼" name="password"></p>
  <p><input type="text" placeholder="信箱" name="email"></p>
  <p><input type="submit" value="註冊"></p>
</form>
`

Signup.start = function () {
  fe6.ui.show(Signup.html)
}
