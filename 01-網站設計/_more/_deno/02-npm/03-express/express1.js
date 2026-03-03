// import * as express from "npm:express"
import express from "npm:express"
// const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

console.log('server run at http://localhost:3000')
app.listen(3000)