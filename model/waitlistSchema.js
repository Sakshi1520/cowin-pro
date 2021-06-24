const mongoose = require('mongoose')

const waitListSchema = new mongoose.Schema({
    sessionId : String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('WaitList', waitListSchema)