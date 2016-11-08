/**
 * New node file
 */
var express = require('express');
var bodyParser = require('body-parser');
var curController = require('../controllers/cursos-controller');
var fs = require('fs');
var url = require('url');
var curRouter = express.Router();

module.exports = (function() {

	curRouter.use(bodyParser.json());

	// OBTENER TODOS LOS CURSOS
	curRouter.route('/').get(function(req, res, next) {
		curController.getAll(function(error, result) {
			if (!error && result.length > 0) {
				res.json(result);
			}else{
				res.status(404).send("No se puede encontrar el recurso solicitado.");
			}
		});

	});

	curRouter.route('/:id_curso').get(function(req, res, next) {

		curController.getOne(req.params.id_curso, function(error, result) {

			if (!error && result.length > 0) {
				res.json(result);
			}else{
				res.status(404).send("No se puede encontrar el recurso solicitado.");
			}

		});

	});
	// OBTENER TODOS LOS CURSOS EN UN PERIODO DETERMINADO
	curRouter.route('/periodo/:periodo').get(
			function(req, res, next) {

				console.log("periodo: " + req.params.periodo);
				// console.log("periodo: " + req.query.dato);

				curController.getAllPeriodo(req.params.periodo, function(error,
						result) {

					if (!error && result.length > 0) {
						res.json(result);
					} else {
						res.status(404).send("El periodo no contiene cursos. Indique otro periodo.");
					}

				});

			});
	// OBTENER LOS ESTUDIANTES DE UN CURSO DETERMINADO
	curRouter.route('/:id_curso/estudiantes').get(
			function(req, res, next) {
				console.log("id_curso: " + req.params.id_curso);

				curController.getEstudiantes(req.params.id_curso, function(
						error, result) {

					if (!error && result.length > 0) {
						res.json(result);
					}else{
						res.status(404).send("No hay estudiantes matriculados.");
					}

				});

			});
	// AGREGAR UN NUEVO CURSO
	curRouter.route('/').post(function(req, res, next) {

		curController.addCurso(req.body, function(error, result) {

			if (!error) {
				console.log("entra al end");
				
				res.status(201).send("Recurso creado exitosamente.");
			}else{
				res.status(400).send("La sintaxis de la petición no es correcta.");
			}
//				console.log(!error);
		});

	});
	// OBTENER TODOS LOS CURSOS
	curRouter.route('/all').get(function(req, res, next) {

		curController.cursosAll(function(error, result) {

			if (!error && result.length > 0) {
				res.json(result);
			}else{
				res.status(404).send("No se puede encontrar el recurso solicitado.");
			}
//				console.log(!error);
		});

	});
	return curRouter;
})();