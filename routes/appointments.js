const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Session = require('../model/sessionSchema')
const Appointment = require('../model/appointmentSchema')
const User = require('../model/userSchema')

// session instance
router.post('/addAppointment', (req, res) => {
    var appointment = new Appointment({
        centerId: req.body.centerId,
        sessionId: req.body.sessionId,
        slot: req.body.slot,
        userId: req.body.userId,
        dose: req.body.dose,
        date: req.body.date
    });
    // appointment.user.push(req.body.userId)
    appointment.save(async (err, results) => {
        if (err) {
            res.status(500).send({
                message: err.message
            })
        } else {
            //reduce total number of appointments
            let session = await Session.findById(req.body.sessionId)
            let availableCapacity = session.availableCapacity
            let availableCapacityDose1 = session.availableCapacityDose1
            let availableCapacityDose2 = session.availableCapacityDose2
            let date = session.date
            let vaccine = session.vaccine

            if (req.body.dose == 1) {
                await Session.findByIdAndUpdate(req.body.sessionId, {
                    availableCapacityDose1: availableCapacityDose1 - 1,
                    availableCapacity: availableCapacity - 1
                }, {
                    new: true
                }, function (err, docs) {
                    if (err) {
                        console.log(err)
                        res.status(200).send({
                            message: err.message
                        })

                    } else {
                        console.log("Updated Session : ", docs);
                        // res.send(docs)
                    }
                })

                await User.findByIdAndUpdate(req.body.userId, {
                    appointmentId: appointment._id,
                    vaccine: vaccine,
                    dose1Date: date
                }, {
                    new: true
                }, function (err, docs) {
                    if (err) {
                        console.log(err)
                        // res.status(200).send({message: err.message})
                    } else {
                        console.log("Updated Session : ", docs);
                        // res.send(docs)
                    }
                })
            } else if (req.body.dose == 2) {
                await Session.findByIdAndUpdate(req.body.sessionId, {
                    availableCapacityDose2: availableCapacityDose2 - 1,
                    availableCapacity: availableCapacity - 1
                }, {
                    new: true
                }, function (err, docs) {
                    if (err) {
                        console.log(err)
                        res.status(500).send({
                            message: err.message
                        })

                    } else {
                        console.log("Updated Session : ", docs);
                        // res.send(docs)
                    }
                })
            }

            res.status(200).send(appointment)
        }
    })
})

router.get('/getByCenter/', async(req, res) => {
    // var app = await Appointment.find().where('centerId'.equals(req.body.centerId))
    
    let users = []
    let appointment = await Appointment.find({centerId:req.body.centerId, date:req.body.date });

    if(appointment.length === 0){
        res.send('No appointments found.')
    }
    else{
        let promises =  appointment.map(async(appointment)=>{
            let user =await  User.find({appointmentId: appointment._id})
            let finalUser = user[0];
            let app = appointment._doc;
            appointment = {...app, ...finalUser._doc}
            return appointment;
        });
    
        users = await Promise.all(promises);
        res.status(200).send({users})
    }


    // let appointment = await Appointment.find({centerId:req.query.centerId },async  function(err, appointment) 
    // {
    //     if (err)
    //     {
    //         // res.send("No appointment id found");
    //     }
    //     else{
    //         appointment.forEach(async function (appointment){
    //             await User.find({appointmentId: appointment.id}, function(err, user){
    //                 if(err){
    //                     // res.send(err)                        
    //                 }
    //                 else{
    //                     users.push(user[0])
    //                 }
    //             });
    //             console.log(users);
    //         })
    //     }

    // });
    //console.log("USERS:: ", users);
    // res.send({users})
})

router.post('/cancel',async(req,res) => {
        let update = {
            isCancelled : true    
        }
        
        await Appointment.findByIdAndUpdate(req.body.appointmentId, update,{new: true}, function(err,docs){
            if (err){
                console.log(err)
                res.status(200).send({message: err.message})

            }
            else{
                console.log("Updated User : ", docs);
                res.send(docs)
            }
        })
 
})

// router.get('/getByCenter', async (req, res) => {
//     console.log(typeof req.query.centerId)

//     // let app1 = await User.findOne({
//     //     _id: "60d0d35bc394384b3852ada2"
//     // });
//     //console.log("app1", app1);
//     let app = await Appointment.aggregate([{
//             $match: {
//                 centerId: req.query.centerId
//             }
//         },
//         {
//             $lookup: {
//                 from: "User",
//                 let: {
//                     appointmentId: "$_id",
//                     userId: "$userId"
//                 },
//                 pipeline: [{
//                         $match: {
//                             $expr: {
//                                 $and: [{
//                                     $eq: ["$appointmentId", "$$appointmentId"]
//                                 }]
//                             }
//                         }
//                     },
//                     {
//                         $project: {
//                             _id: 1,
//                             phno: 1
//                         }
//                     }
//                 ],
//                 as: "userData"
//             }
//         }


//     ])
//     console.log(app)
//     res.send(app)
// })


module.exports = router