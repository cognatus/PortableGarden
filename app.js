
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var app = express();
var user = require('./routes/user');
var http = require('http').createServer(app);
var path = require('path');
var mongoose = require('mongoose');
var fs = require('fs');
var io = require('socket.io')(http);

/**
 * Variables de las colecciones de mongo
 */

 var usuario = require('./moduls/Usuario');
 var sensor = require('./moduls/Sensor');
 var semilla = require('./moduls/Semilla');
 var sala = require('./moduls/Sala');
 var mensaje = require('./moduls/Mensaje');
 var reporte = require('./moduls/Reporte');


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('charts', __dirname + '/public/charts');
app.use(express.cookieParser('sabemos todo sobre ti'));
app.use(express.session());
app.use(express.favicon());
app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + "/public/charts" }));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//en caso de error 404
app.use(function(req, res, next) {
	res.status(404).render('err_404', { title: 'Ups, algo esta mal .-.',
							  datos:  req.session.datos,
							  url: req.session.url });
});

//en caso de error 500
app.use(function(req, res, next) {
	res.status(500).render('err_404', { title: 'Ups, algo esta mal .-.',
							  datos:  req.session.datos,
							  url: req.session.url });
});

//Conexión a Mongoose.
mongoose.connect('mongodb://D1360/ecoduino', function(error){

	if(error){

		throw error; 

	}else{

		console.log('Estas super bato crazy party mirrey loco conectado a MongoDB');

	}
});

//manda las colecciones a routes
routes.constructor(usuario, sensor, semilla, sala, mensaje, reporte);

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

/**
 * Chat
 */

 var chatsini = io.of('/chatsini').on('connection', function (socket){

 	socket.on('join', function(data){
 		socket.room = data.id;
 		socket.join(data.id);
 		console.log('YAY!!! si conecto :D')

 	})

 	socket.on('cambiarsala', function(data){
		socket.leave(socket.room);
		socket.room = data.id;
		socket.join(data.id);
 		console.log('YAY!!! si cambio :D')
		console.log(socket.room)
	})

	socket.on('mensaje', function(data){

		console.log(socket.room)
		socket.in(socket.room).emit('chat', {

                mensaje: data.mensaje,
                hora: data.hora,
                minuto: data.minuto,
                hap: data.hap,
                emisor: data.emisor

            });

	});

 });

 var listarChat = function(req, res){

 	var auxdata = [];
 	var flag = 'chido';

	usuario.find({}, function(error, documento){
		if(error){
			res.send('Error.');
		}else{
			sala.find({},function(error2, documento2){
				if(error2){
					console.log('error dude!!!! D:')
					res.send('Error.');
				}else{
					for (var i = 0; i < documento2.length; i++) {
						for (var j = 0; j < documento.length; j++) {
							if((documento2[i].user == documento[j]._id && 
								documento2[i].user2 == req.session.datos[0]._id) 
								|| (documento2[i].user2 == documento[j]._id && 
									documento2[i].user == req.session.datos[0]._id)){

								auxdata.push( { id: documento2[i]._id, 
												dest: documento[j].nombre, 
												destapp: documento[j].apellidop, 
												iddest: documento[j]._id,
												mensajes: [],
												ultimo: '',
												emisor: '',
												flag: ''} )

							}
						}
					}
					mensaje.find({},function(error3, documento3){
						if(error3){
							console.log('error3 dude!!!! D:')
							res.send('Error.');
						}else{
							for (var i = 0; i < documento3.length; i++) {
								for (var j = 0; j < auxdata.length; j++) {
									if (auxdata[j].id == documento3[i].sala) {
										auxdata[j].mensajes = documento3[i].mensajes
										if(documento3[i].mensajes[documento3[i].mensajes.length-1] != undefined){
											auxdata[j].ultimo = documento3[i].mensajes[documento3[i].mensajes.length-1].mensaje
											auxdata[j].emisor = documento3[i].mensajes[documento3[i].mensajes.length-1].emisor
										}
									}else{
									}
								}
							}
							req.session.chido = 'nope'
							res.send(auxdata);
						}
					})
				}
			})
			
		}
	})

 }

 var guardarMsg = function(req, res){

 	var mensajeee = req.query.mensaje;

	mensaje.update(
		{ sala: req.query.id },
		{ $addToSet: { mensajes: {
				emisor: req.query.emisor,
				mensaje: mensajeee,
				hora: req.query.hora,
				minuto: req.query.minuto,
				hap: req.query.hap
				} 
			} 
		}, function(error, documento){
			if(error){
				console.log('error dude!!!! D:')
			}else{
				console.log(documento)
			}
	});
 
 }
 var listarMsg = function(req, res){

	mensaje.find({sala: req.query.sala},function(error, documento){
		if(error){
			console.log('error3 dude!!!! D:')
			res.send('Error.');
		}else{
			console.log(documento)
			res.send(documento);
		}
	})
				

 }

 var cargarInfo2 = function(req, res){

 	req.session.chido = req.query.id;
 	console.log(req.session.chido)
	res.send(req.session.chido);

 }

/**
 * La parte que va a guardar las graficas para el reporte
 */
 var upload = function(req, res){

	console.log('entro chido a los reportes')
 	var aux = true;
 	var datechida = new Date();
	var dd = datechida.getDate();
	var mm = datechida.getMonth()+1;
	var yyyy = datechida.getFullYear();
	var hora = datechida.getHours();
	var minuto = datechida.getMinutes();
	var segundo = datechida.getSeconds();
	var hap = 'AM';
		
	str_hora = new String(hora);
	if(str_hora > 12){
		hora = hora - 12;
		hap = 'PM';
	}

	str_minuto = new String(minuto);
	if (str_minuto.length == 1) {
		minuto = '0' + minuto;
	}

	str_segundo = new String(segundo);
	if (str_segundo.length == 1) {
		segundo = '0' + segundo;
	}

	if(dd<10) {
		dd='0'+dd
	} 

	if(mm<10) {
		mm='0'+mm
	} 

	datechida = dd+mm+yyyy+hora+minuto+segundo+hap;
	
	var fileLuz = req.files.luz;
	var fileTemp = req.files.temp;
	var fileHum = req.files.hum;
	var  nameLuz = req.session.datos[0]._id+"luz"+datechida;
	var  nameTemp = req.session.datos[0]._id+"temp"+datechida;
	var  nameHum = req.session.datos[0]._id+"hum"+datechida;
	var  lugarLuz = (__dirname + "/public/charts/" + nameLuz + ".jpg");
	var  lugarTemp = (__dirname + "/public/charts/" + nameTemp + ".jpg");
	var  lugarHum = (__dirname + "/public/charts/" + nameHum + ".jpg");

	fs.rename(fileLuz.path, lugarLuz, function(err){
		if(err) res.send(err);
		aux = false;
	});

	fs.rename(fileTemp.path, lugarTemp, function(err){
		if(err) res.send(err);
		aux = false;
	});

	fs.rename(fileHum.path, lugarHum, function(err){
		if(err) res.send(err);
		aux = false;
	});

	if(aux){
		var basesini=new reporte({
			user: req.session.datos[0]._id,
			titulo: req.body.titulo,
			contenido: req.body.contenido,
			dia: dd,
			mes: mm,
			year: yyyy,
			hora: hora,
			minuto: minuto,
			segundo: segundo,
			hap: hap,
			nameLuz: nameLuz,
			nameTemp: nameTemp,
			nameHum: nameHum
		});
		basesini.save(function(error, documento){
			if(error){
				console.log(error);
			}else{
				console.log(chido)
			}
		})
	}

 };
var cargarReports = function(req, res){
	
	reporte.find({user: req.query.id},function(error, documento){
		if(error){
			console.log('error dude!!!! D:')
			res.send('Error.');
		}else{
			res.send(documento);
		}
	})
}

var borrarReporte = function(req, res){
	
	reporte.remove({_id: req.query.id},function(error, documento){
		if(error){
			console.log('error dude!!!! D:')
			res.send('Error.');
		}else{
			res.redirect('/reports');
		}
	})
}

 /**
 * La parte de la foto de perfil
 */
 var profile = function(req, res){

	var fileImage = req.files.imagen;
	var  nameImage = req.session.datos[0]._id;
	var  lugarImage = (__dirname + "/public/profile/" + nameImage + ".jpg");

	fs.rename(fileImage.path, lugarImage, function(err){
		if(err) res.send("Ocurrio un error al intentar subir la imagen");
	});

	res.redirect('/userperfil');

 };

/**
 * La parte de la foto de portada
 */
 var profile_back = function(req, res){

	var fileImage = req.files.imagen;
	var  nameImage = req.session.datos[0]._id;
	var  lugarImage = (__dirname + "/public/profile_back/" + nameImage + ".jpg");

	fs.rename(fileImage.path, lugarImage, function(err){
		if(err) res.send("Ocurrio un error al intentar subir la imagen");
	});

	res.redirect('/userperfil');

 };

/**
* Funciones para comprobar el tipo de usuario
*/

 //cualquier sesion
 function login(req, res, next){

	if( req.session.datos ){

		next();

	}else{

		res.render('error', { title: 'Ups, algo esta mal .-.',
							  datos:  req.session.datos,
							  texto: 'Al parecer no ha iniciado sesión, presione el siguiente boton para iniciar sesion :D',
							  url: '/' });

	}

 }

 //sin iniciar sesion
 function loginN(req, res, next){

	if( !req.session.datos ){

		next();

	}else{

		res.render('error', { title: 'Ups, algo esta mal .-.',
							  datos:  req.session.datos,
							  texto: 'Hey! Ya iniciaste sesión! No puedes volver a hacerlo :p',
							  url: req.session.url });

	}
 }

 //solo granjero
 function loginG(req, res, next){

	var aux = req.session.datos;

	if( !aux ){

		res.render('error', { title: 'Ups, algo esta mal .-.',
							  datos:  req.session.datos,
							  texto: 'Lo sentimos, pero solo los usuarios de tipo Administrador tienen permitia esta seccion :/',
							  url: req.session.url });
	
	}else if( aux[0].privilegio == 1 ){

		next();

	}else{
		
		res.render('error', { title: 'Ups, algo esta mal .-.',
							  datos:  req.session.datos,
							  texto: 'Lo sentimos, pero solo los usuarios de tipo Granjero tienen permitia esta seccion :/',
							  url: req.session.url });

	}
 }

 //solo gestor semillas(o como se llame el segundo usuario)
 function loginS(req, res, next){

	var aux = req.session.datos;

	if( !aux ){

		res.render('error', { title: 'Ups, algo esta mal .-.',
							  datos:  req.session.datos,
							  texto: 'Lo sentimos, pero solo los usuarios de tipo Administrador tienen permitia esta seccion :/',
							  url: req.session.url });
	
	}else if( aux[0].privilegio == 2 ){

		next();

	}else{
		
		res.render('error', { title: 'Ups, algo esta mal .-.',
							  datos:  req.session.datos,
							  texto: 'Lo sentimos, pero solo los usuarios de tipo Gestor tienen permitia esta seccion :/',
							  url: req.session.url });

	}
 }

 //solo administrador
 function loginA(req, res, next){

	var aux = req.session.datos;

	if( !aux ){

		res.render('error', { title: 'Ups, algo esta mal .-.',
							  datos:  req.session.datos,
							  texto: 'Lo sentimos, pero solo los usuarios de tipo Administrador tienen permitia esta seccion :/',
							  url: req.session.url });
	
	}else if( aux[0].privilegio == 3 ){

		next();

	}else{
		
		res.render('error', { title: 'Ups, algo esta mal .-.',
							  datos:  req.session.datos,
							  texto: 'Lo sentimos, pero solo los usuarios de tipo Administrador tienen permitia esta seccion :/',
							  url: req.session.url });

	}
 }

 //solo para errores
 function error(req, res, next){

	var aux = req.session.error;

	if( aux ){

		next();

	}else{

		res.redirect(req.session.url);
		
	}
 }

//metodos get
app.get('/', routes.index);
app.get('/principal', login, routes.principal);
app.get('/userperfil', login, routes.userperfil);
app.get('/settings', login, routes.settings);
app.get('/webcam', login, routes.webcam);
app.get('/users_control', loginA, routes.users_control);
app.get('/stats', loginS, routes.stats);
app.get('/seeds', loginG, routes.seeds);
app.get('/reports', loginA, routes.reports);
app.get('/messaging', login, routes.messaging);
app.get('/cerrar', login, routes.cerrar);
app.get('/error', error, routes.error);
//app.get('/users', user.list);

//metodos post
//app.post('/primera', routes.primera);//esto se ejecuta la primera vez que se corre el programa en otra compu
app.post('/inicia', loginN, routes.inicia);
app.post('/listarUsuarios', login, routes.listarUsuarios);
app.post('/listarSemillas', routes.listarSemillas);
app.post('/modificarFulano', loginA, routes.modificarFulano);
app.post('/modificarcurp', login, routes.modificarcurp);
app.post('/modificarrfc', login, routes.modificarrfc);
app.post('/modificaremail', login, routes.modificaremail);
app.post('/modificarsexo', login, routes.modificarsexo);
app.post('/modificarnombre', login, routes.modificarnombre);
app.post('/modificarapellidop', login, routes.modificarapellidop);
app.post('/modificarapellidom', login, routes.modificarapellidom);
app.post('/modificarpassword', login, routes.modificarpassword);
app.post('/agrega', loginA, routes.agrega);
app.post('/borrarUser', loginA, routes.borrarUser);
app.post('/borrarSemilla', loginG, routes.borrarSemilla);
app.post('/agregaSem', loginG, routes.agregaSem);
app.post('/upload', loginA, upload);
app.post('/profile', login, profile);
app.post('/profile_back', login, profile_back);
app.post('/listarChat', login, listarChat);
app.post('/guardarMsg', login, guardarMsg);
app.post('/listarMsg', login, listarMsg);
app.post('/cargarReports', loginA, cargarReports);
app.post('/borrarReporte', loginA, borrarReporte);
app.post('/cargarInfo2', login, cargarInfo2);
app.post('/colorMSG', login, routes.colorMSG);
app.post('/colorTema', login, routes.colorTema);

/**
 * Arduino Stuff
 */

 var SerialPort = require("serialport").SerialPort
 //var serialPort = new SerialPort("COM5", {baudrate:9600}, false);
 var serialPortWrite = new SerialPort("COM5", {baudrate:5000}, false);
 
 serialPortWrite.open(function (err, results){
	if(err){
		console.log('Error');
		console.log(err);
	}else{
		console.log('SerialPort 5000 to Write is open in COM5');
	}
 })

 var incio = io.sockets.on('connection', function (socket){

 	console.log('conecto')

 	socket.on('apagarPiso', function (piso){
		serialPortWrite.write('d' + piso, function() {
			console.log('apagar '+piso);
		});
	 });

	socket.on('write', function (cosa, piso, condicion){
		serialPortWrite.write(cosa + piso + condicion +'\r', function() {
			console.log(cosa+' '+piso+' '+condicion+' ')
		});
	});

	socket.on('plox', function (irrevlevante){//es tan irrelevante que no se escribir irrelevante
		sensor.find({piso: 1}, function (error,documento){
			if (error) {
				console.log('Error');
				console.log(error);
			}else{
				socket.emit('sensor1', documento[documento.length-1]);
				socket.emit('hum', documento[documento.length-1].humedad);
				socket.emit('temp', documento[documento.length-1].temperatura);
				socket.emit('luz', documento[documento.length-1].luz);
			};
		});
		
		sensor.find({piso: 2}, function (error,documento){
			if (error) {
				console.log('Error');
				console.log(error);
			}else{
				socket.emit('sensor2', documento[documento.length-1]);
				socket.emit('hum2', documento[documento.length-1].humedad);
				socket.emit('temp2', documento[documento.length-1].temperatura);
				socket.emit('luz2', documento[documento.length-1].luz);
			};
		});
	})
	 
	
	socket.on('sacaCharts', function (aux){
		sensor.find({piso: 1, year: aux[0], mes: aux[1], dia: aux[2]}, function (error,documento){
			if (error) {
				console.log('Error');
				console.log(error);
			}else{
				socket.emit('humt23', documento);
				socket.emit('tempt23', documento);
				socket.emit('luzt23', documento);
			};
		});
		
		sensor.find({piso: 2, year: aux[0], mes: aux[1], dia: aux[2]}, function (error,documento){
			if (error) {
				console.log('Error');
				console.log(error);
			}else{
				socket.emit('hum22', documento);
				socket.emit('temp22', documento);
				socket.emit('luz22', documento);
			};
		});		
	});

	socket.on('disconnect', function() {
			// leave the room
			console.log('adios')
		});

 });

//start the server
http.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
