var V = module.exports = {}

V.layout = function (ctx, title, content) {
  const user = ctx.session.user
  return `
  <html>
  <head>
    <title>${title}</title>
    <style>
      body {
        padding: 80px;
        font: 16px Helvetica, Arial;
      }
  
      h1 {
        font-size: 2em;
      }
  
      h2 {
        font-size: 1.2em;
      }
  
      #posts {
        margin: 0;
        padding: 0;
      }
  
      #posts li {
        margin: 40px 0;
        padding: 0;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        list-style: none;
      }
  
      #posts li:last-child {
        border-bottom: none;
      }
  
      textarea {
        width: 500px;
        height: 300px;
      }
  
      input[type=text], input[type=password],
      textarea {
        border: 1px solid #eee;
        border-top-color: #ddd;
        border-left-color: #ddd;
        border-radius: 2px;
        padding: 15px;
        font-size: .8em;
      }
  
      input[type=text], input[type=password] {
        width: 500px;
      }
    </style>
  </head>
  <body>
    <div style="float:right">
    <a href="/">Home</a> / 
    ${user == null
        ? '<a href="/login">Login</a>'
        : '<a href="/user/' + user.name + '">' + user.name + '</a> / <a href="/post/new">Post</a> / <a href="/logout">Logout</a>'}
    </div>
    <section id="content">
      ${content}
    </section>
  </body>
  </html>
  `
}

V.list = function (ctx, posts) {
  let list = []
  for (let post of posts) {
    list.push(`
    <li>
      <h2><a href="/post/${post._id}">${ post.title }</a> -- by: <a href="/user/${post.user.name}">${post.user.name}</a></h2>
    </li>
    `)
  }
  let content = `
  <h1>Posts</h1>
  <p>There are <strong>${posts.length}</strong> posts!</p>
  <ul id="posts">
    ${list.join('\n')}
  </ul>
  `
  return V.layout(ctx, 'Posts', content)
}

V.new = function (ctx) {
  return V.layout(ctx, 'New Post', `
  <h1>New Post</h1>
  <p>Create a new post.</p>
  <form action="/post" method="post">
    <p><input type="text" placeholder="Title" name="title"></p>
    <p><textarea placeholder="Contents" name="body"></textarea></p>
    <p><input type="submit" value="Create"></p>
  </form>
  `)
}

V.show = function (ctx, post) {
  return V.layout(ctx, post.title, `
    <h1>${post.title}</h1>
    <p>${post.body}</p>
  `)
}

V.signup = function (ctx) {
  return V.layout(ctx, 'Signup', `
  <h1>Signup</h1>
  <form action="/signup" method="post">
    <p><input type="text" placeholder="Name" name="name"></p>
    <p><input type="password" placeholder="Password" name="password"></p>
    <p><input type="submit" value="Signup"></p>
  </form>
  <p>${ctx.session.msg}</p>
  `)
}

V.login = function (ctx) {
  return V.layout(ctx, 'Login', `
  <h1>Login</h1>
  <form action="/login" method="post">
    <p><input type="text" placeholder="Name" name="name"></p>
    <p><input type="password" placeholder="Password" name="password"></p>
    <p><input type="submit" value="Login"></p>
  </form>
  <p>${ctx.session.msg}</p>
  <p>If you are not member ? Please <a href="/signup">Signup</a> !</p>
  `)
}
