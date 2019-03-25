const Visit = require('../models/Visit')

module.exports = {
  addVisit(req,res,next){
    const ip = req.body.ip;
    const city = req.body.city;
    const region = req.body.region;
    const country = req.body.country;
    const time = req.body.time;

    const visit = new Visit({
      ip:ip,
      city:city,
      region:region,
      country:country,
      time:time
    })
    if(ip!='162.228.76.16'){
      visit.save()
        .then(result=>{
          res.status(201).json({
            message:"visitor record is added",
            visit:result
          })
        })
        .catch(err=>{
          console.log(err)
        })
    }

  }
}