
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, required: true },

    password: { type: String, required: true },

    events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],

    userMotorbike: { type: Schema.Types.ObjectId, ref: 'Moto' }
    
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)
module.exports = User