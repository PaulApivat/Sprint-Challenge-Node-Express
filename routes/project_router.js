const express = require('express');
const router = express.Router();

const db = require('../data/helpers/projectModel')

//routes
router.get('/', (req , res) => {
    db.get()
    .then((projects) => {
        res.json(projects)
    })
    .catch(err => {
        res 
        .status(500)
        .json({error: "Project information could not be retrieved."})
    })
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    db.getProjectActions(id)
    .then((project) => {
        if(project){
            res.json(project);
        } else {
            res 
            .status(404)
            .json({message: "The project with the specified ID cannot be found."})
        }
    })
    .catch(err => {
        res 
        .status(500)
        .json({error: "Project's actions could not be retrieved."})
    })
})

router.post('/', (req, res) => {
    const project = req.body;
    console.log('project from body', project)

    if (project.name && project.description) {

        db.insert(project).then(idInfo => {
            db.get(idInfo.id).then(project => {
                res.status(201).json(project);
            });
        }).catch(err => {
            res 
            .status(500)
            .json({message: "failed to insert project in database"})
        });

    } else {
        //more specific error message
        res.status(400).json({message: "status 400: missing project name and description"})
    }
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    db.remove(id).then(count => {
        if (count){
            res.json({message: "successfully deleted project"})
        } else {
            res 
                .status(404)
                .json({message: "invalid id"})
        }
    }).catch(err => {
        res 
        .status(500)
        .json({message: "fail to delete project"})
    })
})

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const project = req.body;
    // combination of GET, POST, DELETE

    if (project.name) {

        db.update(id, project)
        .then(count => {
            if (count) {
                //200 successfully update
                db.get(id).then(project => {
                    res.json(project);
                });
            } else {
                //404 invalid id
                res 
                .status(404)
                .json({message: "invalid id"});
            }
        })
        .catch(err => {
            //500 catch-all, something else went wrong
            res 
            .status(500)
            .json({message: "something went wrong, fail to update project"})
        })

    } else {
        //400 error name is missing
        res.status(400).json({message: "status 400: missing project name"})
    }
})



module.exports = router;