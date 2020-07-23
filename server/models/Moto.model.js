
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const motoSchema = new Schema({
    brand: { type: String, required: true},
    model: { type: String, required: true },
    power: { type: Number, required: true},
    torque: { type: Number, required: true},
    displacement: { type: Number, required: true},
    weight: { type: Number, required: true},
    price: { type: Number, required: true},
    image_url: { type: String, required: true},
    
    
}, {
    timestamps: true
})

const Moto = mongoose.model('Moto', motoSchema)
module.exports = Moto