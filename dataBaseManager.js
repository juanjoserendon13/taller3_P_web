/**
 * New node file
 */
// importamos el modulo mysql
var mysql = require("mysql");

// indicamos a donde debemos conectarnos
var pool;

module.exports.getPool = function() {
	if (pool == null) {
		pool = mysql
				.createPool({
					connectionLimit : 100,
					host : "programacion-web-test.cejfwltsp021.sa-east-1.rds.amazonaws.com",
					user : "14112013",
					password : "14112013",
					database : "14112013",
					debug : false
				});
	}
	return pool;
};
