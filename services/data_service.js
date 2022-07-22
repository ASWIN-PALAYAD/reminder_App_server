//import db
const db = require('./db')

//import jsonweb token
const jwt = require('jsonwebtoken')



//register
const register = (username, userid, password) =>{
    return db.User.findOne({
        userid
    }).then(user=>{
        if(user){
            return{
                status : false,
                message : "User already exist...please login",
                statusCode : 401
            }
        }else{
            //insert to db
            const newUser = new db.User({
                name:username,
                userid,
                password,
                event:[]

            })
            newUser.save()
            return{
                status : true,
                message : "Registered successfully",
                statusCode : 200
            }
        }
    })

}

const login = (userid,password)=>{
    return db.User.findOne({
        userid,password
    }).then(user=>{
        if(user){
            // console.log(user);
            loggedUser = user.name
            loggedUserId = userid
            //to create token 
            token = jwt.sign({
                //to stote userId inside inside the token
                loggedUserId : userid
            },'reminderkey123')
            return{
                status : true,
                message : "login successfully",
                statusCode : 200,
                loggedUser,
                loggedUserId,
                token
            }
        }else{
            return{
                status : false,
                message : "login failed...invalid credential",
                statusCode : 401
            }
        }
        
    })
}

const addEvent = (req,date,message)=>{
    let loggedUserId=req.loggedUserId
    console.log(loggedUserId);
    return db.User.findOne({
        userid:loggedUserId
    }).then(user=>{
        if(user){
            console.log(user);
            user.event.push({
                date : date,
                message : message
            })
            user.save()
            return{
                status : true,
                message : " new event is added",
                statusCode : 200
            }
        }
        else{
            return{
                status : false,
                message : "invalid credentials",
                statusCode : 401
            }
        }
    })
}

const getEvent = (req,loggedUserId)=>{
    return db.User.findOne({
        userid:loggedUserId
    }).then(user=>{
        if(user){
            console.log(user.event[0]);
            return{
                status : true,
                statusCode : 200,
                event : user.event
            }
        }
        else{
            return{
                status :false,
                statusCode : 401,
                message : "user doesnot exist"
            }
        }
    })

    }

    const removeEvent = (req,k)=>{
        let loggedUserId = req.loggedUserId
        // console.log(loggedUserId);

        return db.User.findOne({
            userid : loggedUserId
        }).then(user =>{
            if(user){
                console.log(user);
                user.event.splice(k,1)
            }
            user.save()
            return{
                status : true,
                message : " event is deletted",
                statusCode : 200
            }
            
        })



}


//export
module.exports={
    register,login,addEvent,getEvent,removeEvent
}
