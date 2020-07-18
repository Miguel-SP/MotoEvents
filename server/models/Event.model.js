
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, maxlength: 200 },
    location: {type: String},
    image_url: { type: String},
    date: { type: Date, default: Date.now },
    created_by: { type: Schema.Types.ObjectId, ref: 'User' }
    
}, {
    timestamps: true
})

const Event = mongoose.model('Event', eventSchema)
module.exports = Event