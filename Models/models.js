const mongoose = require('mongoose')

var scheme = new mongoose.Schema({
    longitude:{
        type:String,
    },
    latitude:{
        type: String,
    }
})


var register = mongoose.model("MapMatch",scheme)

module.exports = {register}
