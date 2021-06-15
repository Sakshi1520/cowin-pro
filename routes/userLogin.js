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

router.get('/verify', (req,res) => {
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
            // User.findOne({phno: req.query.phno}, async function(err, user){
            //     if(err) {
            //       console.log(err);
            //     }
            //     var message;
            //     if(user) {
            //       console.log(user)
            //         message = "user exists";
            //         console.log(message)
            //     } else {
            //         message= "user doesn't exist";
            //         console.log(message)

            //         const user = new User({
            //             phno: data.to
            //         })
            //         try{
            //             const newUser =  await user.save()
            //             res.status(201).json(newUser)
            //         }
            //         catch(err){
            //             res.status(500).json({message:err.message})
            //         }
                
            //     }
            // });
        }
        res.status(200).send(data)

    })
})

signInUser = async (data) => {
console.log('aagaya')
    User.findOne({phno: data.to}, function(err, user){
        if(err) {
          console.log(err);
        }
        var message;
        if(user) {
            console.log(user)
            message = "user exists";
            console.log(message)
        } else {
            message= "user doesn't exist";
            console.log(message)
        }
    });

    const user = new User({
        phno: data.to
    })

    user.save(function(err) {
        console.log('this is the problem' + ' ' + err)
        if (err) {
            // return res.redirect('/failpage')
        }


        // req.logIn(user, function(err) {
        //     if (err) {
        //         console.log(err);
        //     }
        //     console.log('all looks good')
        //     // res.redirect('/results');
        // });
    });

}

router.get('/usercheck', function(req, res) {
    User.findOne({username: req.query.username}, function(err, user){
        if(err) {
          console.log(err);
        }
        var message;
        if(user) {
          console.log(user)
            message = "user exists";
            console.log(message)
        } else {
            message= "user doesn't exist";
            console.log(message)
        }
        res.json({message: message});
    });
});

module.exports = router