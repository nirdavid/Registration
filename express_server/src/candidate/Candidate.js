const db = require("../db/database");

module.exports = {
    getAllCandidates: function(res) {
        const sql = "SELECT * FROM candidate";
        const params = [];
        db.all(sql, params, (err, rows) => {
            if (err) {
                utils.returnBadRequest(res, err.message);
                return;
            }
            res.json({
                "success": "true",
                "candidates": rows,
            })
        });
    },
};