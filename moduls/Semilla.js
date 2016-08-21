//coleccion de semillas
var mongoose = require('mongoose');

var semilla = mongoose.Schema({

	lote: {type: String, required: true},
	semilla: {type: String, required: true},
	especie: {type: String, required: true},
	genero: {type: String, required: true},
	clase: {type: String, required: true},
	familia: {type: String, required: true},
	orden: {type: String, required: true},
	pH: {type: String, required: true},
	ciclov: {type: String, required: true},
	siembra: {type: String, required: true},
	temperatura: {type: String, required: true},
	iluminacion: {type: String, required: true},
	humedad: {type: String, required: true}

		/*
			lote
			semilla
			especie
			genero
			clase
			familia
			orden
			pH
			ciclov
			siembra
			temperatura
			iluminacion
			humedad
		*/
});

module.exports = mongoose.model('semilla', semilla);
