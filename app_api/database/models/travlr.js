//Connor Fortier
//Week Four Assignment
//CS 465

//declare and initialize new mongoose object
const mongoose = require('mongoose');

//define trip schema(based on clients given wireframe)
const tripSchema = new mongoose.Schema({
code: {type: String, required: true, index: true },
name: {type: String, required: true, index: true},
length: {type: String, required: true},
start: {type: Date, required: true},
resort: {type: String, required: true},
perPerson: {type: String, required: true},
image: {type: String, required: true},
description: {type: String, required: true}
});

//call model method- not used
//mongoose.model('trips', tripSchema);


//updated given code
// mongoose.model("trips", tripSchema);
module.exports = mongoose.model("trips", tripSchema);

