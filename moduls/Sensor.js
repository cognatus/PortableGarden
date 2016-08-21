//coleccion de los sensores
var mongoose = require('mongoose');

var Sensor = mongoose.Schema({

	humedad: {type: String, required: true},
	temperatura: {type: String, required: true},
	luz: {type: String, required: true},
	piso: {type: String, required: true},
	dia: {type: String, required: true},
	mes: {type: String, required: true},
	year: {type: String, required: true},
	hora: {type: String, required: true},
	minuto: {type: String, required: true},
	segundo: {type: String, required: true},
	hap: {type: String, required: true}


});

module.exports = mongoose.model('sensor', Sensor);
