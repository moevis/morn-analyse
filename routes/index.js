var sql = require('./../utils/db');

var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {

	sql.oneOrNone('select * from views where ip = $1', req.ip).then(function(data) {
		var times = 1;
		if (data) {
			times = data.times;
			sql.none('UPDATE views SET times = times + 1 WHERE ip = $1', [req.ip]);
		} else {
			sql.none('INSERT INT views(ip, times) VALUES($1, $2)', [req.ip, 1]);
		}
		res.json({
			views: times
		});

	});

});

module.exports = router;
