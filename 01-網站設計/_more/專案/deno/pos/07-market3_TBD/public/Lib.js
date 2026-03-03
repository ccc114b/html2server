const Lib = {}

Lib.dateToString = function (date) {
  return date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()
}

Lib.timeToString = function (date) {
  return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

Lib.guid = function() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
