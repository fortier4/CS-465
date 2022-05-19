//Connor Fortier

//use built in node js file system component with fs.readFileSync() method
//to retrieve data just created
var fs = require('fs');

var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

//get travel view
const travel = (req, res) => {
    res.render('travel', { title: 'Travlr Getaways', trips });  //pass trip data to hbs view
};

module.exports = {
    travel
};
