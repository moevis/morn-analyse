var sql = require('./../utils/db');

var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {

  sql.oneOrNone('select * from views where ip = $1', req.ip).then(function(data) {
  	var times = 1;
  	if (data) {
  		times++;
  		sql.none('update views set times = times + 1 where ip = $1', [req.ip]);
  	} else {
  		sql.none('insert into views(ip, times) values($1, $2)', [req.ip, 1]);
  	}

  	res.json({
  		views: times
  	});
  	
  });

});

module.exports = router;
