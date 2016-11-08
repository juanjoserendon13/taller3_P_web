/**
 * New node file
 */
var dataBase = require('../dataBaseManager');
var pool = dataBase.getPool();

// ACTUALIZACION
exports.newMat = function(dato, done) {

	pool.getConnection(function(err, connection) {
		if (err) {
			return done(err);
		}

		console.log('connected as id ' + connection.threadId);
		pool.query('INSERT INTO T2y3_appnotas_matricula SET ?', dato,
				function(err, result) {
					connection.release();
					if (err) {
						return done(err);
					} else {

						console.log(result);
						done(null, result.insertId);

					}
				});
//		connection.on('error', function(err) {
//			return done(err);
//		});
	});
};

exports.updateMat = function(dato,done) {

	pool.getConnection(function(err, connection) {
		if (err) {
			return done(err);
		}

		console.log('connected as id ' + connection.threadId);
		
		console.log("datos de update: "+dato.nota+dato.id_curso+dato.id_estudiante);
		var sql='UPDATE T2y3_appnotas_matricula m SET m.nota_obtenida=? WHERE m.id_curso=? and m.id_estudiante=?;';
		pool.query(sql,[dato.nota,dato.id_curso,dato.id_estudiante], function(err, result) {

			connection.release();
			if (err) {
				console.log(err);

				return done(err);
			} else {

				console.log(result);

				done(null, result);
			}
		});

//		connection.on('error', function(err) {
//			return done(err);
//		});
	});

};




