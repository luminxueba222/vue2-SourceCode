let express = require('express')
let app = express()
let dataObj =require('../src/mock/index')
const port = process.env.PORT ||3000;
app.get('/', (req, res) => {
  res.send(dataObj.list)

})
app.get('/api/login', (req, res) => {
  res.send(dataObj.loginData)
})
app.listen(port, () => {
  console.log(`serve running ${port}`);
})