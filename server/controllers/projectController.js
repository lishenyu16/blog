const Project = require('../models/Project')

module.exports = {
    getProjects(req,res,next){
        Project.find()
            .then(projects=>{
                res.status(201).json(projects)
            })
            .catch(err=>{
                if(!err.statusCode){
                  err.statusCode = 500
                }
                next(err)   //passed to next middleware to handle this. Plz see app.js for more info.
            })
    },
    getSingleProject(req,res,next){
        const projectId = req.body.projectId
        Project.findById(projectId)
            .then(project=>{
                if(!project){
                    const error = new Error('Could not find this project')
                    error. statusCode = 404
                    throw error  //this will exit this block and reach to out-most catch block and pass this error to it.
                }
                res.status(201).json(project)
            })
            .catch(err=>{
                if(!err.statusCode){
                  err.statusCode = 500
                }
                next(err)   //passed to next middleware to handle this. Plz see app.js for more info.
            })

    },
    addProject(req,res,next){
        const title = req.body.title;
        const youtubeId = req.body.youtubeId;
        const desc = req.body.desc;
        const srcUrl = req.body.srcUrl;

        const project = new Project({
            title:title,
            youtubeId:youtubeId,
            desc:desc,
            srcUrl:srcUrl
        })

        project.save()
            .then(result=>{
                res.status(201).json({
                    message:"project is added",
                    project:result
                })
            })
            .catch(err=>{
                if(!err.statusCode){
                  err.statusCode = 500
                }
                next(err)   //passed to next middleware to handle this. Plz see app.js for more info.
            })
    },
    deleteProject(req,res,next){
        console.log("projectId: ", req.params.projectId)
        Project.findById(req.params.projectId)
            .then((project)=>{
                if(!project){
                    const error = new Error('Could not find project to delete')
                    error.statusCode = 404
                    throw error  //this will exit this block and reach to out-most catch block and pass this error to it.
                }
                return Project.findByIdAndRemove(req.params.projectId)
            })
            .then(result=>{
                console.log(result)
                res.status(200).json({
                    message:'Project is deleted!'
                })
            })
            .catch(err=>{
                if(!err.statusCode){
                    err.statusCode = 500
                }
                next(err)   //passed to next middleware to handle this. Plz see app.js for more info.
            })
    }
}