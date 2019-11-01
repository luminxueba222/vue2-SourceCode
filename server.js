let express = require('express')
let app = express()
const port = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send("holle world")
})
app.listen(port, () => {
  console.log(`serve running ${port}`);

})