const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    phno: {
        type: Number,
        required:true
    },
    name: {
        firstName: {
            type: String
            // required: true
        },
        lastName: String
    },
    birthYear:  {
        type: String
        // required:true
    },
    gender:{
        type: String
        // required:true
    },
    photoIdType : {
        type: String
        // required:true
    },
    photoIdNumber: {
        type: String
        // required:true
    },
    comorbidityIndicator: {
        type: String,
        // required:true,
        enum : ['Y', 'N']
    },
    vaccinationStatus:{
        type: String,
        enum : ['Not Vaccinated', 'Partially Vaccinated', 'Vaccinated']
    },
    vaccine: {
        type:String
    },
    dose1Date: {
        type: Date
    },
    dose2Date: {
        type: Date
    },
    appointments: {
        appointmentId: {type: mongoose.Schema.Types.ObjectId, ref: 'Appointment'}
    },
    dateCreated: {
        type: Date
    }


})

module.exports = mongoose.model('User', userSchema)