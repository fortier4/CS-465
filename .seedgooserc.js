module.exports = {
    modelBaseDirectory: 'app_server/database/models',   //model directory
    models: ["*.js", "!db.js"],                         //model matcher
    data: 'data',                                       //data directory
    db: 'mongodb://localhost:27017/travlr'              //database connection
};
