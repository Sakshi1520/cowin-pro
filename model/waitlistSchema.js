const mongoose = require('mongoose')

const waitListSchema = new mongoose.Schema({
    centerId : String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('WaitList', waitListSchema)