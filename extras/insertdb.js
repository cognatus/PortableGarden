/*
 *Esto hay que meterlo directo en consola de mongo
 *si es primera vez que se corre el proyecto
 *en la compu o se borran los datos
 * esto ya es inutil, se requiere que se encripten primero
 */

//insertar granjero
db.usuarios.insert({

	_id: "2015010001",
	nombre: "Granjero",
	apellidop: "Mexicano",
	apellidom: "de Ixtepan",
	curp: "BADD110313HCMLNS09",
	email: "granjero@granjero.com",
	rfc: "CUPU800825569",
	sexo: "Macho Alfa",
	password: "bebexitodelflow123",
	tipo: "Gestor de Semillas",
	privilegio: 1

})

//insertar gestor
db.usuarios.insert({

	_id: "2015020001",
	nombre: "Gestor",
	apellidop: "Mexicanotl",
	apellidom: "de Ixtepantl",
	curp: "BADD110313HCMLNS08",
	rfc: "CUPU800825568",
	email: "gestor@gestor.com",
	sexo: "Macho Alfa",
	password: "bebexitodelflow123",
	tipo: "Gestor de Condiciones",
	privilegio: 2

})

//insertar administrador
db.usuarios.insert({

	_id: "2015030001",
	nombre: "Admin",
	apellidop: "Mexicanotltl",
	apellidom: "de Ixtepantltl",
	curp: "BADD110313HCMLNS07",
	rfc: "CUPU800825567",
	email: "admin@admin.com",
	sexo: "Macho Alfa",
	password: "bebexitodelflow123",
	tipo: "Administrador",
	privilegio: 3

})

//insertar semilla
db.semillas.insert({

	lote: "1",
	semilla: "Chida",
	especie: "Chida",
	genero: "Chida",
	clase: "Chida",
	familia: "Chida",
	orden: "Chida",
	pH: "10",
	ciclov: "Chida",
	siembra: "Chida",
	temperatura: "10",
	iluminacion: "10",
	humedad: "10"

})

//NOTA: CORRER EL PROYECTO Y NO HACER NADA ANTES DE METER ESTO
//NOTA2: SI SE HACE UNA MODIFICACION A LA BASE DE DATOS TAMBIEN HAY QUE MODIFICAR ESTO