const mongoose = require('mongoose')

var scheme = new mongoose.Schema({
    longitude:{
        type:Object,
    },
    latitude:{
        type: Object,
    },
    timestamp:{
        type:Object
    }
})


var register = mongoose.model("MapMatch",scheme)

module.exports = {register}
