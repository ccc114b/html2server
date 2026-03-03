window.onhashchange = async function () {
    var tokens = window.location.hash.split('/')
    switch (tokens[0]) {
      case '#shop': Shop.start(); break
      case '#pos': Pos.start(); break 
      case '#setting': Setting.start(); break 
      case '#report': Report.start(); break 
      case '#login': Login.start(); break 
      case '#signup': Signup.start(); break 
      default: Shop.start(); break
    }
}

window.onload = function () {
    window.onhashchange()
}