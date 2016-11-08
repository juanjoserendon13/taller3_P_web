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
				pool.query('SELECT * FROM T2y3_appnotas_estudiantes WHERE id_estudiante=?',	dato, function(err, rows) {
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

exports.getCurAll = function(dato, done) {

	pool.getConnection(function(err, connection) {
				if (err) {

					return done(err);
				}

				console.log('connected as id ' + connection.threadId);

				var sql = "SELECT c.nombre AS Materia, e.nombres, e.apellidos,m.nota_obtenida,e.semestre,c.periodo FROM T2y3_appnotas_estudiantes e,T2y3_appnotas_matricula m,T2y3_appnotas_cursos c WHERE e.id_estudiante=? and m.id_estudiante=e.id_estudiante and c.id_curso=m.id_curso";

				pool.query(sql, dato, function(err, rows) {

					connection.release();
					if (err) {
						console.log(err);

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

exports.newEst = function(dato, done) {

	pool.getConnection(function(err, connection) {
		if (err) {
			return done(err);
		}

		console.log('connected as id ' + connection.threadId);
		pool.query('INSERT INTO T2y3_appnotas_estudiantes SET ?', dato,
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

exports.getEstudiantes = function(dato, done) {

	pool.getConnection(function(err, connection) {
				if (err) {
					return done(err);
				}

				console.log('connected as id ' + connection.threadId);
				var sql = 'SELECT e.nombres,e.apellidos FROM T2y3_appnotas_cursos c, T2y3_appnotas_estudiantes e, T2y3_appnotas_matricula m WHERE m.id_curso=? and  c.id_curso=m.id_curso and m.id_estudiante=e.id_estudiante';
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

		pool.query('INSERT INTO T2y3_appnotas_cursos SET ? ', dato, function(
				err, result) {
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

//obtener todos los estudiantes
exports.allEstudiantes = function(dato, done) {

	pool.getConnection(function(err, connection) {
		if (err) {
			return done(err);
		}

		console.log('connected as id ' + connection.threadId);
		var sql = 'SELECT e.nombres, e.apellidos, e.id_estudiante FROM T2y3_appnotas_estudiantes e';
		pool.query(sql, dato, function(err, rows) {
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