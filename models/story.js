const mongoose = require('mongoose')

const calendarSchema = new mongoose.Schema({
    title : {
        type : String,
    },
    content : {
        type : String,
        required : true
    },
    img : {
        type : String,
        required : true
    },
    createAt : {
        type : Date,
        default : Date.now
    },
  
})



module.exports = mongoose.model('story' , calendarSchema)