
//import express
const express = require('express')

//import cors
const cors = require('cors')

//import jsonweb token
const jwt = require('jsonwebtoken')

//import dataservice 
const dataService = require('./services/data_service')



//server app creation using express
const app = express()

//cores use in app
app.use(cors({
    origin:'http://localhost:4200'
}))

//parse json data
app.use(express.json())


//token verify
const jwtMiddleware = (req,res,next)=>{
    //to fetch token
    try{
        token =  req.headers['reminder-token']
        const data = jwt.verify(token, 'reminderkey123')
        req.loggedUserId= data.loggedUserId
        next()  

    }
    catch{
        res.status(401).json({
            status:false,
            statusCode:401,
            message:'please login'
        })
    }
}


//register API
app.post('/register',(req,res)=>{
    dataService.register(req.body.name,req.body.userid,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

//login API
app.post('/login',(req,res)=>{
    dataService.login(req.body.userid,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

//add event API
app.post('/addEvent',jwtMiddleware,(req,res)=>{
    dataService.addEvent(req,req.body.date,req.body.message)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

//GET EVENT API
app.post('/getEvent',jwtMiddleware,(req,res)=>{
    dataService.getEvent(req,req.loggedUserId)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

//removeEvent API
app.post('/removeEvent',jwtMiddleware,(req,res)=>{
    dataService.removeEvent(req,req.k)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})















//set up port number
app.listen(3000,()=>{
    console.log("server started at port number 3000");
})