require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 4005,
    SECRET_KEY: process.env.SECRET_KEY,
}