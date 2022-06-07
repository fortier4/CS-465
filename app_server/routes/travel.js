//Connor Fortier

const express = require('express');
const router = express.Router();
const controller= require('../controllers/travel');

/* get home page. */
//router.get('/', controller.travel);

//UPDATED 6/6/2022
//get home page with new controller for travel list data
router.get('/', controller.travelList);

module.exports = router;
