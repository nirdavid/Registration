const bcrypt = require('bcryptjs');

const saltRounds = 10; //the cost of processing the data

module.exports = {
    hashPassword: (plaintextPassword) => bcrypt.hash(plaintextPassword, saltRounds),
    comparePassword: (plaintextPassword, hash) => bcrypt.compare(plaintextPassword, hash)
};