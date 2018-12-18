const mongoConnect = require('../util/database')
const getDb = require('../util/database').getDb

class User {
  constructor(username,email,password){
    this.username = username
    this.email = email
    this.password = password
  }
  save(){
    const db = getDb()
    return db.collection('users').insertOne(this)
    .then((result)=>{
      // console.log(result)
    })
    .catch(err=>{
      console.log(err)
    })
  }
}
module.exports = User

// const bcrypt = require('bcryptjs')


// async function hashPassword (User, options) {
  
//   const SALT_FACTOR = 8

//   if (!User.changed('password')) {
//     return
//   }
//   const genSalt = await bcrypt.genSalt(SALT_FACTOR)
//   const hash = await bcrypt.hash(User.password, genSalt)
//   User.setDataValue('password', hash)
// }



// module.exports = (sequelize, DataTypes) => {
//     const User = sequelize.define('User', {
//       email: {
//         type: DataTypes.STRING,
//         unique: true
//       },
//       password: DataTypes.STRING
//     }, {
//       hooks: {
//         // beforeCreate: hashPassword,
//         // beforeUpdate: hashPassword,
//         beforeSave: hashPassword
//       }
//     })
//     User.prototype.comparePassword = function (password) {
//       // return bcrypt.compareAsync(password, this.password)
//       return bcrypt.compare(password, this.password)
//     }
  
//     User.associate = function (models) {
//     }  
//     return User
//   }
