window.onhashchange = async function () {
    var tokens = window.location.hash.split('/')
    switch (tokens[0]) {
      case '#shop': Shop.start(); break
      case '#pos': Pos.start(); break 
      case '#setting': Setting.start(); break 
      case '#report': Report.start(); break 
      case '#login': Login.start(); break 
      case '#signup': Signup.start(); break
      case '#logout': Logout.start(); break
      case '#home': Home.start(); break 
      case '#market': Market.start(); break 
      default: Ui.goto('#shop'); break
    }
}

window.onload = function () {
    window.onhashchange()
}