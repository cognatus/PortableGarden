//coleccion de mensaje
var mongoose = require('mongoose');

var Reporte = mongoose.Schema({

	user: {type: String, required: true},
	titulo: {type: String, required: true},
	contenido: {type: String, required: true},
	dia: {type: String, required: true},
	mes: {type: String, required: true},
	year: {type: String, required: true},
	hora: {type: String, required: true},
	minuto: {type: String, required: true},
	segundo: {type: String, required: true},
	hap: {type: String, required: true},
	nameLuz: {type: String, required: true},
	nameTemp: {type: String, required: true},
	nameHum: {type: String, required: true}
	
});

module.exports = mongoose.model('reporte', Reporte);

/*Esto es aun un prototipo, 
esta a prueba y puede que 
se cambie*/