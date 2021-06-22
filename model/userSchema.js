const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    phno: {
        type: String,
        required:true
    },
    name: {
        type: String
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
        type: String
    },
    dose2Date: {
        type: String
    },
    appointmentId: {type: mongoose.Types.ObjectId, ref: 'Appointment'}

})

userSchema.virtual('userId').get(function() {
    return this._id;
});

module.exports = mongoose.model('User', userSchema)