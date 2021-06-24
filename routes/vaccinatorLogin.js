const express = require('express')
require('dotenv').config()
const router = express.Router()
const mongoose = require('mongoose')
const Vaccinator = require('../model/vaccinatorSchema')

var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
const client = require('twilio')(accountSid, authToken)

// send OTP to the vaccinator
router.get('/login', (req,res) => {
    client
    .verify
    .services(process.env.TWILIO_SERVICE_SID)
    .verifications
    .create({
        to: `+91${req.query.phno}`,
        channel: 'sms'
    })
    .then((data) => {
        res.status(200).send(data)
    })
})

// Verify OTP given by vaccinator
// Save in db if new vaccinator
router.post('/verify', (req,res) => {
    client
    .verify
    .services(process.env.TWILIO_SERVICE_SID)
    .verificationChecks
    .create({
        to: `+91${req.query.phno}`,
        code: req.query.code
    })
    .then((data) => {
        if(data.status === 'approved'){
            console.log("approved bitch")

            Vaccinator.findOne({phno: data.to}, async function(err, vaccinator){
                if(err) {
                  console.log(err);
                }
            // console.log(data)

                var message,vid;
                if(vaccinator) {
                    console.log(vaccinator)
                    res.status(200).send({isValidOTP:true , isRegisteredVaccinator: true, _id: vaccinator._id})
                    // message = "vaccinator exists";
                    // console.log(message)
                } 
                else {
                    message= "vaccinator doesn't exist";
                    console.log(message)
                    let _id = mongoose.Types.ObjectId()
                    const vaccinator = new Vaccinator({
                        phno: data.to,
                        _id,
                        centerId: _id
                    });
                    vaccinator.save(function (err, results) {
                        if(err){
                            res.status(500).send({message: err.message})
                        }
                        else{
                            vid = results._id
                            // console.log(results._id);
                            res.status(200).send({isValidOTP:true , isRegisteredVaccinator: false, _id: vid})
                        }
                    });
                }
            });
        }
        else{
            res.status(200).send({isValidOTP:false})
        }
    })
})

//View all vaccinators
router.get('/allVaccinators', async (req,res) => {
    try{
        const vaccinators = await Vaccinator.find()
        res.json(vaccinators)
    }
    catch(err){
        res.status(500).json({ message: err.message})
    }
})

// get vaccinator by id
router.get('/:id', async(req,res) => {
    var vaccinator = await Vaccinator.findById(req.params.id);
    res.status(200).send(vaccinator)
})

// register new vaccinator
router.post('/register', async(req,res) => {
//  console.log(req.query)
console.log(req.query.id)
console.log("HI")
console.log(req.body)
// console.log(req.query.id)
let update = {
    centerId: req.body.centerId,
    name: req.body.name,
    address: req.body.address,
    state : req.body.state,
    district : req.body.district,
    block : req.body.block,
    pincode : req.body.pincode,
    latitude : req.body.latitude,
    longitude : req.body.longitude,
    from : req.body.from,
    to : req.body.to,
    feeType : req.body.feeType
}

await Vaccinator.findByIdAndUpdate(req.query.id, update,{new: true}, function(err,docs){
    if (err){
        console.log(err)
        res.status(500).send({message: err.message})

    }
    else{
        // console.log("Updated Vaccinator : ", docs);
        res.status(200).send(docs)
    }
})
})

module.exports = router