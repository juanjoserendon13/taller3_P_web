/**
 * New node file
 */
var dataBase = require('../dataBaseManager');
var pool = dataBase.getPool();

// CONSULTA DE DATOS
exports.getOne = function(dato, done) {

	pool.getConnection(function(err, connection) {
		if (err) {
			return done(err);
		}

		console.log('connected as id ' + connection.threadId);
		pool.query('SELECT * FROM T2y3_appnotas_cursos WHERE id_curso=?', dato,
				function(err, rows) {
					connection.release();
					if (err) {
						return done(err);
					} else {

						console.log(rows);
						done(null, rows);

					}
				});
		connection.on('error', function(err) {
			return done(err);
		});
	});
};

exports.getAll = function(done) {

	pool.getConnection(function(err, connection) {
		if (err) {

			return done(err);
		}

		console.log('connected as id ' + connection.threadId);

		pool.query('SELECT * FROM T2y3_appnotas_cursos', function(err, rows) {

			connection.release();
			if (err) {
				console.log(err);

				return done(err);
			} else {

				console.log(rows);

				done(null, rows);
			}
		});

		connection.on('error', function(err) {
			return done(err);
		});
	});

};

exports.getAllPeriodo = function(dato, done) {

	pool.getConnection(function(err, connection) {
		if (err) {
			return done(err);
		}

		console.log('connected as id ' + connection.threadId);
		pool.query('SELECT * FROM T2y3_appnotas_cursos WHERE periodo=?', dato,
				function(err, rows) {
					connection.release();
					if (err) {
						return done(err);
					} else {

						console.log(rows);
						done(null, rows);

					}
				});
//		connection.on('error', function(err) {
//			return done(err);
//		});
	});
};

exports.getEstudiantes = function(dato, done) {

	pool.getConnection(function(err, connection) {
				if (err) {
					return done(err);
				}

				console.log('connected as id ' + connection.threadId);
				var sql = 'SELECT e.nombres,e.apellidos, m.nota_obtenida, m.id_estudiante FROM T2y3_appnotas_cursos c, T2y3_appnotas_estudiantes e, T2y3_appnotas_matricula m WHERE m.id_curso=? and  c.id_curso=m.id_curso and m.id_estudiante=e.id_estudiante';
				pool.query(sql, dato, function(err, rows) {
					connection.release();
					if (err) {
						return done(err);
					} else {

						console.log(rows);
						done(null, rows);

					}
				});
//				connection.on('error', function(err) {
//					return done(err);
//				});
			});
};
// INSERCION DE DATOS
exports.addCurso = function(dato, done) {

	pool.getConnection(function(err, connection) {
		if (err) {
			return done(err);
		}

		console.log('connected as id ' + connection.threadId);

		pool.query('INSERT INTO T2y3_appnotas_cursos SET ? ', dato, function(err, result) {
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
	// OBTENER TODOS LOS CURSOS
	exports.cursosAll = function(dato, done) {

		pool.getConnection(function(err, connection) {
			if (err) {
				return done(err);
			}

			console.log('connected as id ' + connection.threadId);

			pool.query('SELECT c.nombre	FROM T2y3_appnotas_cursos c', function(err, result) {
				connection.release();
				if (err) {
					return done(err);
				} else {

					console.log(result);
					done(null, result);

				}
			});
//			connection.on('error', function(err) {
//				return done(err);
//			});
		});
};