//coleccion de usuario
var mongoose = require('mongoose');

var Usuario = mongoose.Schema({

	_id: {type: String, required: true},
	nombre: {type: String, required: true},
	apellidop: {type: String, required: true},
	apellidom: {type: String, required: true},
	curp: {type: String, required: true},
	email: {type: String, required: true},
	rfc: {type: String, required: true},
	sexo: {type: String, required: true},
	password: {type: String, required: true},
	tipo: {type: String, required: true},
	privilegio: {type: String, required: true},
	cmensajes : {type: String, required: true},
	ctema : {type: String, required: true}
	/**
	 * 1.- GRANJERO
	 * 2.- GESTOR
	 * 3.- ADMINISTRADOR
	 */

	/**
	 *variables que se encriptan:
	 *
	 *curp
	 *email
	 *rfc
	 *password
	 *
	 */

});

module.exports = mongoose.model('usuario', Usuario);
