const mongoose = require('mongoose')

const vaccinatorSchema = new mongoose.Schema({
    // centerId : {
    //     type: mongoose.Types.ObjectId,
    //     default: this._id
    // },
    centerId: String,
    phno: {
        type: String
    },
    name: {
        type: String
    },
    address:  {
        type: String
        // required:true
    },
    state:{
        type: String
        // required:true
    },
    district : {
        type: String
        // required:true
    },
    block: {
        type: String
        // required:true
    },
    pincode: {
        type: String,
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    from : {
        type: String
    },
    to : {
        type: String
    },
    feeType: {
        type: String,
        enum: [ 'Free', 'Paid' ]
    }

})

vaccinatorSchema.virtual('VaccinatorId').get(function() {
    return this._id;
});



module.exports = mongoose.model('Vaccinator', vaccinatorSchema)