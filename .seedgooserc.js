module.exports = {
    modelBaseDirectory: 'app_api/database/models',      //model directory   //UPDATEDmodelBaseDirectory: 'app_server/database/models',
    models: ["*.js", "!db.js"],                         //model matcher
    data: 'data',                                       //data directory
    db: 'mongodb://localhost:27017/travlr'              //database connection
};
