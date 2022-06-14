const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const tripSchema=new Schema({
    destination: String,
    airfare: Number,
    lodging: Number,
    attractions: Number,
    food: Number
})

const Trip=mongoose.model('Trips', tripSchema);

module.exports=Trip;