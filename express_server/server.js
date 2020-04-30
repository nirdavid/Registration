const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const passwordHash = require('./src/password/Password');
const utils = require('./src/utils/Utils');
const user = require('./src/user/User');
const candidate = require('./src/candidate/Candidate');
const token = require('./src/token/Token');
const dotenv = require("dotenv");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//console.log(require('crypto').randomBytes(64).toString('hex'));

// get config vars
dotenv.config();

// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);

	app.post('/api/auth/signup', function(req, res) {
		const {username, password} = req.body;
		if (!utils.isValidRequestData(res, req.body)) {
			return;
		}
		passwordHash.hashPassword(password).then(function(hash) {
			user.storeUserInDB(res, {...req.body, password: hash}, () => utils.returnAccessToken(res, username));
		}).catch((err) => utils.returnBadRequest(res, err.message));
	});

	app.post('/api/auth/signin', function (req, res) {
		const {username, password} = req.body;
		if (!utils.isValidRequestData(res, req.body)) {
			return;
		}
		const onUserFound = (userRow) => {
			passwordHash.comparePassword(password, userRow.password).then(function(result) {
				if (result == true) {
					utils.returnAccessToken(res, username)
				} else {
					utils.returnBadRequest(res, 'Incorrect password');
				}
			}).catch((err) => utils.returnBadRequest(res, err.message));
		};
		user.getUserByName(res, req.body, onUserFound);
	});

	app.get("/api/candidates", token.authenticateToken, (req, res) => {
		candidate.getAllCandidates(res);
	});
});
