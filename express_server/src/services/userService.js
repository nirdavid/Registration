const db = require("../db/database");
const utils = require('../utils/Utils');

module.exports = {
    storeUserInDB: function(res, userData, onUserInsert) {
        const sql ='INSERT INTO user (username, email, password) VALUES (?,?,?)';
        const params =[userData.username, userData.email, userData.password];
        db.run(sql, params, function (err, result) {
            if (err) {
                utils.returnBadRequest(res, err.message);
                return;
            }
            onUserInsert();
        });
    },

    getUserByName: function(res, userData, onUserFound) {
        const sql = `SELECT * FROM user WHERE username = ?`;
        const params = [userData.username];
        db.get(sql, params, (err, userRow) => {
            if (err) {
                utils.returnBadRequest(res, err.message);
                return;
            }
            if (!userRow) {
                utils.returnBadRequest(res, 'User not found');
                return;
            }
            onUserFound(userRow);
        });
    }
};