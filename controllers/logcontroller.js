let router = require('express').Router();
let sequelize = require('../db');
let User = sequelize.import('../models/user');
let Log = sequelize.import('../models/log');

// Log.sync({force:true})

router.get('/', function (req, res){
    let userid = req.user.id;

    Log.findAll({where: {owner: userid}})
        .then(
            function findAllSuccess(data){
                res.json(data);
            },
            function findAllError(err){
                res.send(500, err.message);
            }
        )
})

router.post('/', function (req, res){
    let planetName = req.body.log.planetName;
    let desc = req.body.log.description;
    let hab = req.body.log.habitable;
    let owner = req.user.id;
    let image = req.body.log.image;

    Log
    .create({
        planetName: planetName,
        description: desc,
        habitable: hab,
        image: image,
        owner: owner
    })
    .then(
        function createSuccess(logdata){
            res.json({
                logdata: logdata
            })
        },
        function createError(err){
            res.send(500, err.message);
        }
    )
})

router.get('/:id', function(req, res){
    let data = req.params.id;
    let userid = req.user.id;

    Log
        .findOne({
            where: {id: data, owner: userid}
        }).then(
            function findOneSuccess(data){
                res.json(data);
            },
            function findOneError(err){
                res.send(500, err.message);
            }
        )
})

router.put('/:id', function(req, res){
    let updatePlanetName = req.params.PlanetName;
    let updateHabitable = req.body.log.habitable;
    let updateDesc = req.body.log.description;
    let updatedImage = req.body.log.image;
    // let updateRes = req.body.log.result;
    let updateOwner = req.user.id;

    Log
        .update({
            planetName: updatePlanetName,
            habitable: updateHabitable,
            description: updateDesc,
            image: updatedImage,
            owner: updateOwner
        }, {where: {id: req.params.id}})
        .then(
            function updateSuccess(){
                res.json({
                    planetName: updatePlanetName,
                    habitable: updateHabitable,
                    description: updateDesc,
                    image: updatedImage,
                    owner: updateOwner
                })
            }, 
            function updateError(err){
                res.send(500, err.message);
            }
        )
})

router.delete('/:id', function (req, res){
    let data = req.params.id;
    let userId = req.user.id;

    Log 
        .destroy({
            where: {id: data, owner: userId}
        })
        .then(
            function deleteLogSuccess(){
                res.send("the log be in Davy Jone's locker");
            },
            function deleteLogError(err){
                res.send(500, err.message);
            }
        )
})

module.exports = router;