const mongoose = require('mongoose')

const vaccineFeeListSchema = new mongoose.Schema({
    vaccine: String,
    fee: Number
})

vaccineFeeListSchema.virtual('vaccineFeeListId').get(function() {
    return this._id;
});

module.exports = mongoose.model('VaccineFeeList', vaccineFeeListSchema)