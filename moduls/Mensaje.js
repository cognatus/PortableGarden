//coleccion de mensaje
var mongoose = require('mongoose');

var Mensaje = mongoose.Schema({

	sala: {type: String, required: true},
	mensajes: [{
				emisor: {type: String, required: true},
				mensaje: {type: String, required: true},
				hora: {type: String, required: true},
				minuto: {type: String, required: true},
				hap: {type: String, required: true}
	}]
	

});

module.exports = mongoose.model('mensaje', Mensaje);

/*Esto es aun un prototipo, 
esta a prueba y puede que 
se cambie*/