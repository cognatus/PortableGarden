//coleccion de sala
var mongoose = require('mongoose');

var Sala = mongoose.Schema({

	user: {type: String, required: true},
	user2: {type: String, required: true}

});

module.exports = mongoose.model('sala', Sala);

/*Esto es aun un prototipo, 
esta a prueba y puede que 
se cambie*/