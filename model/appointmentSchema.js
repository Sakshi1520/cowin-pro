const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    // centerId: {type: mongoose.Types.ObjectId, ref: 'Vaccinator'},
    centerId : String,
    sessionId: String,
    slot: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User'},
    dose: {
        type: Number,
        enum: [1,2]
    }
})

appointmentSchema.virtual('appointmentId').get(function() {
    return this._id;
});

module.exports = mongoose.model('Appointment', appointmentSchema)