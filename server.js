const express = require('express')
const app = express()
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const PORT = process.env.PORT || 3000


app.use(express.static('public'))


app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

app.get('/', (re, res) => {
    res.render('home')
})

app.get('/cart' ,(re,res)=>{
    res.render('customers/cart') 
})

app.get('/login',(re,res)=>{
    res.render('auth/login')
})

app.get('/register',(re,res)=>{
    res.render('auth/register')
})

app.listen(PORT, (re, res) => {
    console.log('server started')
})