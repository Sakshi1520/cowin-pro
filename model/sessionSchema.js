const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    // centerId: {type: mongoose.Types.ObjectId, ref: 'Vaccinator'},
    centerId : String,
    date: String,
    availableCapacity: Number,
    availableCapacityDose1 : Number,
    availableCapacityDose2 : Number,
    walkIn: {
        type: String,
        enum: [ 'Y', 'N' ]
    },
    minAgeLimit: Number,
    vaccine: String,
    slots: [String]
})

sessionSchema.virtual('sessionId').get(function() {
    return this._id;
});

module.exports = mongoose.model('Session', sessionSchema)