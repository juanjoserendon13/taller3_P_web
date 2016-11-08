/**
 * New node file
 */
var express = require('express');
var bodyParser = require('body-parser');
var estController = require('../controllers/estudiantes-controller');
var fs = require('fs');
var url = require('url');
var estRouter = express.Router();

module.exports = (function() {

	estRouter.use(bodyParser.json());

	// OBTENER UN ESTUDIANTE
	estRouter.route('/:id_estudiante').get(function(req, res, next) {
		estController.getOne(req.params.id_estudiante, function(error, result) {
			if (!error && result.length > 0) {
				res.json(result);
			}else{
				res.status(404).send("No se puede encontrar el recurso solicitado.");
			}
		});
	});


	// OBTENER TODOS LOS CURSOS DE UN ESTUDIANTE
	estRouter.route('/:id_estudiante/cursos').get(function(req, res, next) {

	
		estController.getCurAll(req.params.id_estudiante, function(error, result) {

			if (!error && result.length > 0) {
				res.json(result);
			}else{
				res.status(404).send("No se puede encontrar el recurso solicitado.");
			}

		});

	});
	// CREAR UN ESTUDIANTE
	estRouter.route('/').post(function(req, res, next) {			

				estController.newEst(req.body, function(error, result) {

					if (!error) {
						
						res.status(201).send("Recurso creado exitosamente. "+"Id"+result);
						
					}else{
						res.status(400).send("La sintaxis de la petición no es correcta.");
					}

				});

			});
	// OBTENER TODOS LOS ESTUDIANTES
	estRouter.route('/').get(function(req, res, next) {			

		estController.allEstudiantes(null, function(error, result) {

			if (!error && result.length > 0) {
				res.json(result);
			}else{
				res.status(404).send("No se puede encontrar el recurso gg.");
				
				
			}

		});

	});
	
	return estRouter;
})();