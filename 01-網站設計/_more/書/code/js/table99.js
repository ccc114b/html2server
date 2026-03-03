for (var i = 1; i <= 9; i++) {
    var row = "";
    for (var j = 1; j <= 9; j++) {
      row += i + " x " + j + " = " + i*j + "\t";
    }
    console.log(row);
}