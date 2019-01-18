const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

//not used for now as it's buggy how to pass a user object
function jwtSignUser (user) {
    return jwt.sign(user, 'somereallylongsecret', {
      expiresIn: '1h'
    })
  }

module.exports = {
    register(req,res,next){
        User.findOne({email:req.body.email})
          .then((existingUser)=>{
            if(existingUser){
              const error = new Error('Email already in use')
              error.statusCode = 401
              throw error
            }
            bcrypt.hash(req.body.password, 8)
              .then((hashpassword)=>{
                const user = new User({
                  username:req.body.username,
                  email:req.body.email,
                  password:hashpassword,
                  isAdmin:false
                })
                return user.save()
              })
              .then((result)=>{
                res.status(200).json({userId:result._id, message:'User is created!'})
              })
              .catch(err => {
                if (!err.statusCode) {
                  err.statusCode = 500;
                }
                next(err);
              }); 
          })
          .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });      
    },
    login (req, res,next) {
      User.findOne({email:req.body.email})
        .then(user=>{
          if(user){
            //below the order really matters ! user's entered pw must put first
            bcrypt.compare(req.body.password,user.password)
              .then(domatch=>{
                if(domatch){
                  const token = jwtSignUser({email:user.email,userId:user._id,username:user.username,isAdmin:user.isAdmin})
                  res.status(200).json({ 
                    token: token, 
                    expirationDate:(new Date()).getTime() + 1000*60*60, //expired 1h later
                    username: user.username,
                    userId: user._id,
                    email:user.email,
                    isAdmin: user.isAdmin
                   });          
                }
                else{
                  return res.status(401).send({
                    error: 'Wrong password!'
                  })
                }
              })
              .catch(err=>{
                console.log(err)
              })
          }
          else{
            return res.status(401).send({
              error: 'A user with this email could not be found.'
            })
          }
        })
        .catch(err=>{
          if(!err.statusCode){
            err.statusCode = 500
          }
          next(err)   //passed to next middleware to handle this. Plz see app.js for more info.
        })
    },
    getProfile(req,res,next){
      res.status(200).send({username:req.session.user.username,userId:req.session.user._id,email:req.session.user.email})
    }
}