const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient


let _db;
const mongoConnect = (callback)=>{
    MongoClient.connect('mongodb+srv://@blogs-8dtiv.mongodb.net/blogs?retryWrites=true')
    .then(client=>{
        _db = client.db()
        callback()
    })
    .catch(err=>{
        console.log(err)
        throw err
    })
}

const getDb = ()=>{
    if (_db){
        return _db
    }
    throw 'NO DB FOUND'
}

// module.exports = mongoConnect
exports.mongoConnect = mongoConnect
exports.getDb = getDb