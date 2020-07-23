
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, required: true },

    password: { type: String, required: true },

    events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],

    motorbike: { type: Schema.Types.ObjectId, ref: 'Moto' },

    comments: [{
        event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
        date: { type: Date, default: Date.now },
        text: { type: String, maxlength: 200 }
    }]
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)
module.exports = User