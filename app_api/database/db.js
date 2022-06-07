//Connor Fortier
//Week Four Assignment
//CS 465

const mongoose = require("mongoose");
//BELOW CODE COMMENTED OUT TEMPORARILY FOR ERROR TESTING
//let dbURI = 'mongodb://localhost/Loc8r';//may need to update, different than code in guide
//let dbURI = 'mongodb://${host}/travlr';
//if (process.env.NODE_ENV === 'production') {
//  dbURI = process.env.MONGODB_URI;
//}
//mongoose.connect(dbURI);

//UPDATED
//*******
const host = process.env.DB_HOST || "127.0.0.1";
const dbURI = `mongodb://${host}/travlr`;
const readLine = require("readline");

//avoid current server discovery and monitoring engine is depreciated
mongoose.set("useUnifiedTopology", true);

const connect = () => {
  setTimeout(
    () =>
      mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
      }),
    1000
  );
};

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close( () => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

// For nodemon restarts                                 
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});

//updated code
connect();

//mongoose schema
require('./models/travlr'); //updated
//require('/travlr');
//require('./locations');