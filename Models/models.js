const mongoose = require('mongoose')

var scheme = new mongoose.Schema({
    longitude:{
        type:String,
    },
    latitude:{
        type: String,
    },
    timestamp:{
        type:Object
    }
})


var register = mongoose.model("MapMatch",scheme)

module.exports = {register}
