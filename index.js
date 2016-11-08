var express = require('express');
var morgan = require('morgan');
var app = express();

// Rutas requeridas
// rutas
var curRouter = require("./routes/cursos-router");
var estRouter = require("./routes/estudiantes-router");
var matRouter = require("./routes/matricula-router");
// Configuracion para recibir archivos desde la pagina
var multer = require('multer');

// Configurar carpeta temporal donde se guardaran las imágenes
app.use(multer({
	dest : './uploads/'
}).single('fileName'));

app.use(morgan('dev'));

// soporte para codificar json
var bodyParser = require('body-parser');
app.use(bodyParser.json());
// soporte para decodificar las url
app.use(bodyParser.urlencoded({
	extended : true
}));

app.use(express.static(__dirname + '/public'));

// Configurar las rutas en archivos separados
app.use('/servicios/cursos', curRouter);
app.use('/servicios/estudiantes', estRouter);
app.use('/servicios/matricula', matRouter);

// //////////////////////////////////
var hostname = 'localhost';
var port = 3000;

app.listen(port, hostname, function() {
	console.log('Servidor corriendo en http://' + hostname + ':' + port + '/');
});
