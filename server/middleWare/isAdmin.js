const User = require('../models/User')

module.exports = (req, res, next)=> {
    User.findById(req.userId)
        .then((user)=>{
            if(!user.isAdmin){
                const error = new Error('Not Authorized on this operation')
                error.statusCode = 403
                throw error  
            }
            next()
        })
        .catch(err=>{
            if(!err.statusCode){
              err.statusCode = 500
            }
            next(err)   //passed to next middleware to handle this. Plz see app.js for more info.
        })
}