const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

//not used for now as it's buggy how to pass a user object
function jwtSignUser (user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
      expiresIn: ONE_WEEK
    })
  }

module.exports = {
    register(req,res){
        // console.log(User)
        const user = new User(req.body.username,req.body.email,req.body.password)
        user.save().then((result)=>{
          res.send({username:user.username,email:user.email})
          // res.send({
          //   user:JSON.stringify(user),
          //   // token:jwtSignUser(JSON.stringify(user))
          // })
        })
        .catch(err=>{
          console.log("err to save: ", err)
          res.send({err:'Email already in use!'})
        })

        // User.create(req.body)
        // .then((user)=>{
        //     res.send({
        //         user:user.toJSON(),
        //         token:jwtSignUser(user.toJSON())
        //     })
        // })
        // .catch(err=>{
        //     res.send({err:'Email already in use!'})
        // })

    },
    async login (req, res) {
        try {
          const {email, password} = req.body
          const user = await User.findOne({
            where: {
              email: email
            }
          })
    
          if (!user) {
            return res.status(403).send({
              error: 'The login information was incorrect'
            })
          }
    
          const isPasswordValid = await user.comparePassword(password)
          if (!isPasswordValid) {
            return res.status(403).send({
              error: 'The login information was incorrect'
            })
          }
    
          const userJson = user.toJSON()
          res.send({
            user: userJson,
            token: jwtSignUser(userJson)
          })
        } catch (err) {
          res.status(500).send({
            error: 'An error has occured trying to log in'
          })
        }
    }
    // login(req,res,next){
    //     const {email,password} = req.body
    //     User.findOne({
    //         where:{
    //             email:email
    //         }
    //     })
    //     .then((user)=>{
    //         user.comparePassword(password)
    //         .then((result)=>{
    //             if(result){
    //                 return res.send({
    //                     user:user.toJSON(),
    //                     token:jwtSignUser(user.toJSON())
    //                 })
    //             }
    //             else{
    //                 res.status(403).send({
    //                     error:"The login info is incorrect!"
    //                 })
    //             }
    //         })

    //     })
    //     .catch((error)=>{
    //         return res.status(500).send({
    //             error:"An error has occured trying to log in!"
    //         })
    //     })
    //     // res.send({message:"good, I received ur login request!"})
    // }
 
}