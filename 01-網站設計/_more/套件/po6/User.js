const User = {}

User.html = `
<h2>我的資料</h2>
<table>
  <thead><tr><th>欄位</th><th>內容</th></tr></thead>
  <tbody>
    <tr><td>帳號</td><td><input id="userId" type="text" value=""/></td></tr>
    <tr><td>密碼</td><td><input id="userPassword" type="password" value=""/></td></tr>
    <tr><td>姓名</td><td><input id="userName" type="text" value=""/></td></tr>
    <tr><td>信箱</td><td><input id="userEmail" type="text" value=""/></td></tr>
    <tr><td>電話</td><td><input id="userTel" type="text" value=""/></td></tr>
  </tbody>
</table>

<h2>我的商店</h2>
<div id="myshops"></div>
`

User.start = function (id) {
  var user = Model._user = Model.loadUser(id)
  /* var user = Model._user
  if (user == null) {
    alert('您尚未登入，請先登入！')
    fe6.router.go('#login')
  }
  */
  fe6.ui.show(User.html)
  fe6.ui.id('userId').value = user.id
  fe6.ui.id('userPassword').value = user.password
  fe6.ui.id('userName').value = user.name
  fe6.ui.id('userEmail').value = user.email
  fe6.ui.id('userTel').value = user.tel
  fe6.tb.attachTo('#myshops', {
    id: 'shopTable',
    fields: ["id"],
    titles: ["商店代號"],
    types: ["string"],
    templates: ["<a href='#shop/<%=cell%>'><%=cell%></a>"],
    records: user.shops,
    editable:false,
  })
}
