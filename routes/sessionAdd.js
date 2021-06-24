const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Vaccinator = require('../model/vaccinatorSchema')
const Session = require('../model/sessionSchema')

// session instance
router.post('/addSession', async(req,res) => {
    const session = new Session({
        centerId : req.body.centerId,
        date : req.body.date,
        availableCapacity : req.body.availableCapacity,
        availableCapacityDose1 : req.body.availableCapacityDose1,
        availableCapacityDose2 : req.body.availableCapacityDose2,
        // walkIn : req.body.walkIn,
        minAgeLimit : req.body.minAgeLimit,
        vaccine : req.body.vaccine,
        slots : req.body.slots 
    });

    session.save((err,results) => {
        if(err){
            res.status(500).send({message: err.message})
        }
        else{
            res.status(200).send({message: "Successful", id:session._id})
        }
    })
})

router.get('/allSessions', async(req,res) => {
    try{
        let session = []
        const vaccinator = await Vaccinator.find()
        if(vaccinator.length === 0){
            res.send('No Vaccinators found.')
        }
        else{
            let promises =  vaccinator.map(async(vaccinator)=>{
                // console.log(vaccinator.centerId)
                let session = await Session.find({centerId: vaccinator.centerId})
                let sessions = session;
                let app = vaccinator._doc;
                vaccinator = {...app, sessions}
                return vaccinator;
            });
        
            centers = await Promise.all(promises);
            res.send(centers)
        }
    }
    catch(err){
        console.log(err);
        res.send.status(500).send({message: err.message})
    }
})

// router.get('/:id', async(req,res) => {
//     var session = await Session.findById(req.params.id);
//     res.send(session)
// })

//get session by session id
router.get('/:id', async(req,res) => {
    try{
        var session = await Session.findById(req.params.id);
        res.status(200).send(session)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
});



//get session by centerID
router.get('/', async(req,res) => {
    var sessions = await Session.find().where('centerId').equals(req.query.centerId);
    res.status(200).send(sessions)
});



module.exports = router