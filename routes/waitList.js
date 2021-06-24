const express = require('express')
require('dotenv').config()
const router = express.Router()
const User = require('../model/userSchema')
const WaitList = require('../model/waitlistSchema')
const Appointment = require('../model/appointmentSchema')
const Session = require('../model/sessionSchema')

var accountSid = process.env.SMS_TWILIO_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.SMS_TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
const client = require('twilio')(accountSid, authToken)

// send OTP to the user
router.get('/sendAlert', async(req,res) => {
    
    let waitlist = await WaitList.find({sessionId:req.body.id});
    if(waitlist.length === 0){
        res.send('No appointments found.')
    }
    else{
    console.log(waitlist);

        let promises =  waitlist.map(async(waitlist)=>{
            let user =await  User.findById(waitlist.userId)
            
            // console.log("USERR::",waitlist.userId)
            let finalUser = user;
            let wait = waitlist._doc;
            
            waitlist = {...user._doc}
            return waitlist.phno;
        });
    
        
        users = await Promise.all(promises);
        // console.log(users)
        res.send(users)

        // Promise.all(
        //     users.map(usercell => {
        //       return client.messages.create({
        //         to: usercell,
        //         from: process.env.TWILIO_PHONE_NUMBER,
        //         body: "A new vaccine slot has been added. Kindly book an appointment to get vaccinated!"
        //       });
        //     })
        //   )
        //     .then(messages => {
        //         message = "Message sent successfully"
        //         console.log('Messages sent!');
        //         res.status(200).send(message)
        //     })
        //     .catch(err => res.status(500).send({message:err.message}));

      
    }
})

router.post('/add', (req,res) => {
    const waitList = new WaitList({
        userId: req.body.userId,
        sessionId : req.body.sessionId
    })

    waitList.save((err,results) => {
        if(err){
            res.status(200).send({message:err.message})
        }
        else{
            res.status(200).send(results)
        }
    })
})




module.exports = router