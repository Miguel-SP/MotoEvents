
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, required: true },

    password: { type: String, required: true },

    events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],

    userMotorbike: { type: Schema.Types.ObjectId, ref: 'Moto' },

<<<<<<< HEAD
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
=======
    friends:[{ type: Schema.Types.ObjectId, ref: 'User' }]
>>>>>>> bbf8457279a77a12362bb74df617599e105e71d5
    
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)
module.exports = User