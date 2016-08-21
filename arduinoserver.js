
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
app.set('port', process.env.PORT || 6000);
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

//Conexión a Mongoose.
mongoose.connect('mongodb://localhost/ecoduino', function(error){

	if(error){

		throw error; 

	}else{

		console.log('Estas super conectado a MongoDB');

	}
});


// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

/**
 * Arduino Stuff
 */

 var SerialPort = require("serialport").SerialPort
 var serialPort = new SerialPort("COM3", {baudrate:9600}, false);
 
 serialPort.open(function (err, results) {

 	var piso = 1;

 	if(err){
		console.log('err ' + err);
 	}else{
 		console.log('SerialPort 9600 to Read is open in COM3');
 	}

	serialPort.on('data', function(data) {
		var test=data.toString();
		var temp=test.split(",");

		console.log('data received: ' + data + ' floor: '+ piso);
		console.log('dat0 received: ' + temp[0]);
		console.log('dat1 received: ' + temp[1]);
		console.log('dat2 received: ' + temp[2]);

		var date = [];
		var tiempo = new Date();

		var dd = tiempo.getDate();
		var mm = tiempo.getMonth()+1;
		var yyyy = tiempo.getFullYear();
		var hora = tiempo.getHours();
		var minuto = tiempo.getMinutes();
		var segundo = tiempo.getSeconds();
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

		date.push(	dd,
					mm,
					yyyy,
					hora,
					minuto,
					segundo)

		if(piso == 1){

			if((!isNaN(temp[0]) || !isNaN(temp[1]) || !isNaN(temp[2])) || (temp[0] != undefined || temp[1] != undefined || temp[2] != undefined)){
				
				var basesini=new sensor({
					humedad: temp[0],
					temperatura: temp[1],
					luz: temp[2],
					piso: piso.toString(),
					dia: dd,
					mes: mm,
					year: yyyy,
					hora: hora,
					minuto:	minuto,
					segundo: segundo,
					hap: hap
				});
				basesini.save(function(error, documento){
					if(error){
						console.log(error);
					}else{
						//console.log(documento);
					}
				});

			}
			data = [];
			temp = [];

			piso = 2;

		}else{

			if(!isNaN(temp[0]) && !isNaN(temp[1]) && !isNaN(temp[2])){			
								
				var basesini=new sensor({
					humedad: temp[0],
					temperatura: temp[1],
					luz: temp[2],
					piso: piso.toString(),
					dia: dd,
					mes: mm,
					year: yyyy,
					hora: hora,
					minuto:	minuto,
					segundo: segundo,
					hap: hap
				});
				basesini.save(function(error, documento){
					if(error){
						console.log(error);
					}else{
						//console.log(documento);
					}
				});

			}
			data = [];
			temp = [];
			piso = 1;
		}

	});
 });

//start the server
http.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
