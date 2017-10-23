const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/MyRideApp', {
    useMongoClient: true
}).then(() => {
    console.log('Mongo connected');
}, error => {
    console.log('Error connecting to Mongo', error);
});

module.exports = mongoose;