//make db connection

//import mongoose
const mongoose = require('mongoose')

//connection
mongoose.connect('mongodb://localhost:27017/Reminder',{
    useNewUrlParser:true
})

//db model

const User = mongoose.model('User',{
    name: String,
    userid: String,
    password: Number,
    event : []

})

module.exports={
    User
}