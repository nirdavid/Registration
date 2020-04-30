const token = require('../token/Token');

module.exports = {
    returnBadRequest: function(res, err) {
        res.status(400).json({"success": "false", "msg": err});
    },

    returnAccessToken: function(res, username) {
        res.json({
            "success": "true",
            "token": token.generateAccessToken({username}),
        })
    },

    isValidRequestData: function(res, reqData) {
        const errors = [];
        for (let [key, value] of Object.entries(reqData)) {
            if (!value) {
                errors.push(`No ${key} specified`);
            }
        }
        if (errors.length) {
            utils.returnBadRequest(res, errors.join(","));
            return false;
        }
        return true;
    }
};