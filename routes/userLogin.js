const express = require('express')
require('dotenv').config()
const router = express.Router()
const User = require('../model/userSchema')

var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
const client = require('twilio')(accountSid, authToken)

// send OTP to the user
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
    .catch(err => res.status(500).json({message: err.message}))
})

// Verify OTP given by user
// Save in db if new user
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
            // console.log("approved bitch")

            User.findOne({phno: data.to}, async function(err, user){
                if(err) {
                  console.log(err);
                }
            // console.log(data)

                var message;
                if(user) {
                    console.log(user)
                    res.status(200).send({isValidOTP:true , isRegisteredUser: true, _id:user._id})
                    // message = "user exists";
                    // console.log(message)
                } 
                else {
                    message= "user doesn't exist";
                    console.log(message)
                    const user = new User({
                        phno: data.to
                    });
                    user.save(function (err, results) {
                        // console.log(results._id);
                        res.status(200).send({isValidOTP:true , isRegisteredUser: false, _id:results._id})
                    });
                }
            });
        }
        else{
            res.status(200).send({isValidOTP:false})
        }
    })
})

//View all users
router.get('/allUsers', async (req,res) => {
    try{
        const users = await User.find()
        res.json(users)
    }
    catch(err){
        res.status(500).json({ message: err.message})
    }
})

// get user by id
router.get('/:id', async(req,res) => {
    var user = await User.findById(req.params.id);
    res.status(200).send(user)
})

// register new user
router.post('/register', async(req,res) => {

        console.log("HI")
        console.log(req.body)
        // console.log(req.query.id)
        let update = {
            photoIdType: req.body.photoIdType,
            photoIdNumber: req.body.photoIdNumber,
            name : req.body.name,
            gender : req.body.gender,
            birthYear : req.body.birthYear
        }
        
        await User.findByIdAndUpdate(req.body.id, update,{new: true}, function(err,docs){
            if (err){
                console.log(err)
                res.status(500).send({message: err.message})

            }
            else{
                // console.log("Updated User : ", docs);
                res.status(200).send(docs)
            }
        })
 
})

module.exports = router