// ================== uu6: Useful Utility ========================
export function dateToString(date) {
  return date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()
}

export function timeToString(date) {
  return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
export function guid() {
  var s4 = function() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

