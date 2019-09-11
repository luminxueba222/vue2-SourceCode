let express = require('express')
let path = require('path')
console.log(express,path,'expre22222222222222222222222222222222222222222222222222ss');
let app = express()
app.get('/api/user',(req,res)=>{
    res.json({name:"xialinhui"})
})
app.listen(3000)