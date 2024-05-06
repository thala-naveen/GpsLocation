var mongoose = require('mongoose')

mongoose.connect('mongodb+srv://Naveen:Zy3EcESQE4bt5p21@cluster0.draukki.mongodb.net/MapMatch')
    .then(() => console.log('Connected!'))
    .catch((err)=>console.log(err))