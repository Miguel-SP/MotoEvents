
require('dotenv').config()
const mongoose = require('mongoose');
const Moto = require('./../models/Moto.model');


 

mongoose
    .connect(`${process.env.DB_REMOTE}`, { useNewUrlParser: true, useUnifiedTopology: true})
 
const motorbikes = [
    {   "brand": "Ducati",
        "model": "Panigale",
        "power": 214,
        "torque": 12.6,
        "displacement": 1100,
        "weight": 175,
        "price": 25500,
        "image_url": "https://a.mcdn.es/mnet_ft//DUCATI/Panigale_V4/32708MG.jpg/660x/"
    },
    {
        "brand": "Honda",
        "model": "CBR 650R",
        "power": 95,
        "torque": 6.5,
        "displacement": 649,
        "weight": 192,
        "price": 9150,
        "image_url": "https://a.mcdn.es/mnet_ft//HONDA/CBR_650_R/33845MG.jpg/660x/"
    },{
        "brand": "Kawasaki",
        "model": "Ninja ZX 10R",
        "power": 210,
        "torque": 11.6,
        "displacement": 998,
        "weight": 204,
        "price": 19375,
        "image_url": "https://a.mcdn.es/mnet_ft//KAWASAKI/ZX_10R/6242/30539MG.jpg/660x/"
    },{
        "brand": "Yamaha",
        "model": "R6",
        "power": 117,
        "torque": 8,
        "displacement": 599,
        "weight": 170,
        "price": 15850,
        "image_url": "https://a.mcdn.es/mnet_ft//YAMAHA/YZF_R6/31395MG.jpg/660x/"
    },{
        "brand": "Yamaha",
        "model": "MT-07",
        "power": 75,
        "torque": 6.9,
        "displacement": 689,
        "weight": 175,
        "price": 6800,
        "image_url": "https://a.mcdn.es/mnet_ft//YAMAHA/MT-07/5984/33106MG.jpg/660x/"
    },{
        "brand": "Suzuki",
        "model": "SV 650",
        "power": 76,
        "torque": 6.5,
        "displacement": 650,
        "weight": 197,
        "price": 6800,
        "image_url": "https://a.mcdn.es/mnet_ft//SUZUKI/SV_650/30302MG.jpg/660x/"
    },{
        "brand": "BMW",
        "model": "R NineT Scrambler",
        "power": 110,
        "torque": 12.1,
        "displacement": 1170,
        "weight": 204,
        "price": 14100,
        "image_url": "https://a.mcdn.es/mnet_ft//BMW/R_nineT/6425/31754MG.jpg/660x/"
    },{
        "brand": "KTM",
        "model": "790 Adventure R",
        "power": 95,
        "torque": 9,
        "displacement": 799,
        "weight": 189,
        "price": 13500,
        "image_url": "https://a.mcdn.es/mnet_ft//KTM/790/6747/34225MG.jpg/660x/"
    },{
        "brand": "HARLEY DAVIDSON",
        "model": "Sportster 883 Iron",
        "power": 52,
        "torque": 7,
        "displacement": 883,
        "weight": 260,
        "price": 9000,
        "image_url": "https://a.mcdn.es/mnet_ft//HARLEY_DAVIDSON/Sportster/4669/16614MG.jpg/660x/"
    },{
        "brand": "BMW ",
        "model": "R 1250 GS Adventure",
        "power": 136,
        "torque": 14.5,
        "displacement": 1254,
        "weight": 238,
        "price": 19950 ,
        "image_url": "https://a.mcdn.es/mnet_ft//BMW/R_1250_GS_Adventure/33787MG.jpg/660x/"
    }
]

Moto.create(motorbikes)
    .then(allTheMotorbikes => {
        console.log(`${allTheMotorbikes.length} motorbikes created!`)
        mongoose.connection.close();
    })
    .catch(err => console.log(`An error ocurred: ${err}`))