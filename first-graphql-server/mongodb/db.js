const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/graphql');

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose;