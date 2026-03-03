window.onhashchange = async function () {
    var tokens = window.location.hash.split('/')
    switch (tokens[0]) {
      case '#shop':
        let shop = (tokens[1] == null)?null:decodeURIComponent(tokens[1])
        console.log('shop=', shop)
        Shop.start(shop);
        break
      case '#pos': Pos.start(); break 
      case '#setting': Setting.start(); break 
      case '#report': Report.start(); break 
      case '#cart': Cart.start(); break 
      case '#report': Report.start(); break 
      case '#login': Login.start(); break 
      case '#signup': Signup.start(); break
      case '#logout': Logout.start(); break
      case '#home': Home.start(); break 
      case '#market': Market.start(); break 
      default: Ui.goto('#home'); break
    }
}

window.onload = function () {
    window.onhashchange()
}