//Connor Fortier

//use built in node js file system component with fs.readFileSync() method
//to retrieve data just created
//var fs = require('fs');

//var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

//UPDATED
//import request module to make HTTP requests
const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
}

//get travel view
//const travel = (req, res) => {
//    res.render('travel', { title: 'Travlr Getaways', trips });  //pass trip data to hbs view
//};

//UPDATED 6/6/2022
//internal method for processing response from API and render travel view
const renderTravelList = (rec, res, responseBody) => {
    let message = null;
    let pageTitle = process.env.npm_package_description + " Travel";
  
    if (!(responseBody instanceof Array)) {
        message = "API lookup error";
        responseBody = [];
    }
    else {
        if (!responseBody.length) {
            message = "No trips exist in database";
        }
    }
    res.render("travel", {
        title: pageTitle,
        trips: responseBody,
        message,
    });
};
  
//get travel list
const travelList = (req, res) => {
    const path = "/api/trips";
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: "GET",
        json: {},
    };
  
    console.info(" >> travelcontroller.travelList calling" + requestOptions.url);
    request(requestOptions, (err, { statusCode }, body) => {
        if (err) {
            console.error(err);
        }
        renderTravelList(req, res, body);
    });
};

module.exports = {
    travelList  //UPDATED to export new list - was "travel"
};
