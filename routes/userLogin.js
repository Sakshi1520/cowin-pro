const express = require('express')
require('dotenv').config()
const router = express.Router()
const User = require('../model/userSchema')

var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
const client = require('twilio')(accountSid, authToken)

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
            var resSend = {
                'isValidOTP': false,
                'isRegisteredUser' : false
            }
            User.findOne({phno: data.to}, async function(err, user){
                if(err) {
                  console.log(err);
                }
            // console.log(req.body.phno)
            // console.log(data)

                var message;
                if(user) {
                    console.log(user)
                    res.status(200).send({isValidOTP:true , isRegisteredUser: true})
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
                        console.log(results._id);
                    });
                    res.status(200).send({isValidOTP:true , isRegisteredUser: false})

                }
            });
        }
        else{
            res.status(200).send({isValidOTP:false})
        }
    })
})

router.get('/', async (req,res) => {
    try{
        const users = await User.find()
        res.json(users)
    }
    catch(err){
        res.status(500).json({ message: err.message})
    }
})

module.exports = router