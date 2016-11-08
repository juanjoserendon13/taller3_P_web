/**
 * New node file
 */
var express = require('express');
var bodyParser = require('body-parser');
var matController = require('../controllers/matricula-controller');
var fs = require('fs');
var url = require('url');
var matRouter = express.Router();

module.exports = (function() {

	matRouter.use(bodyParser.json());

	// MATRICULAR ESTUDIANTE EN UN CURSO
	matRouter.route('/').post(function(req, res, next) {
		matController.newMat(req.body, function(error, result) {
			if (!error) {
				res.status(201).send("Recurso creado exitosamente.");
			}else{
				res.status(400).send("El estudiante ya se encuentra en este curso.");
			}
		});
	});


	// ACTUALIZA NOTA DE UN ESTUDIANTE
	matRouter.route('/').put(function(req, res, next) {

	
		matController.updateMat(req.body, function(error, result) {

			if (!error) {
				res.json(result);
			}else{
				res.status(400).send("Ocurrio un error al procesar la solicitud");
			}

		});

	});
	
	
	return matRouter;
})();