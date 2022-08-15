const mongoose = require('mongoose');


const reminderSchema = new mongoose.Schema({
    medication:String,
    description:String,
    selectedDate:String,
    selectedTime:String,
    userId:String,
    

})



module.exports = mongoose.model("reminder" ,reminderSchema)