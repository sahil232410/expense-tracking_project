const express = require('express');
const methodOverride = require( 'method-override');
const { connectdb } = require('./db');
const session = require('express-session');
const router = require('./route/userRoute');
const brouter = require('./route/expenseRoute');


const app=express()


connectdb()

app.use(session({
    secret:"hghgsd",
    resave:false,
    saveUninitialized:false
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use(methodOverride("_method"))

app.set("view engine","ejs")

app.use("/",router)
app.use("/",brouter)



app.listen(4000,()=>{
    console.log("running....");
    
})