
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, maxlength: 200 },
    location: {
        city: { type: String, default: 'Madrid' },
        coordinates: [Number] 
    },
    image_url: { type: String },
    date: { type: Date, default: Date.now, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
    joinedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
        user: { type: String },
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        date: { type: Date, default: Date.now },
        text: { type: String, maxlength: 200 }
    }]
    
}, {
    timestamps: true
})

const Event = mongoose.model('Event', eventSchema)
module.exports = Event