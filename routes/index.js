
/**
 *variables universales
 */

var usuario;
var sensor;
var semilla;
var sala;
var mensaje;
var reporte;
var fs = require('fs');
var crypto = require('crypto'),
	algorithm = 'aes-256-ctr',
	password = 'd6F3Efeq';
//inicializamos cosas de base de datos
exports.constructor = function(usuarioo, sensorr, semillaa, salaa, mensajee, reportee){
	usuario = usuarioo;
	sensor = sensorr;
	semilla= semillaa;
	sala = salaa;
	mensaje = mensajee;
	reporte = reportee
};

/**
 *Funciones para el cifrado
 */

 function encrypt(text){
	var cipher = crypto.createCipher(algorithm,password)
	var crypted = cipher.update(text,'utf8','hex')
	crypted += cipher.final('hex');
	return crypted;
 }
 
 function decrypt(text){
	var decipher = crypto.createDecipher(algorithm,password)
	var dec = decipher.update(text,'hex','utf8')
	dec += decipher.final('utf8');
	return dec;
 }

/*
 * GET
 */

exports.index = function(req, res){

	req.session.url = '/';
	req.session.chido = 'nope';

	if(req.session.datos == undefined){

		res.render('index', { title: 'Portable Garden - Inicio',
						datos:  req.session.datos });

	}else{

		sensor.find({}, function(err, documento){

	 		if(err){
	 			console.log('ERRROOOOOOORR!!!!!!')
	 			console.log(err)
	 		}else{
	 			req.session.semillaPrimer = documento[0];
	 		}

	 	})

		res.render('principal', { title: 'Portable Garden',
							datos:  req.session.datos,
							semillaPrimer:  req.session.semillaPrimer});
	
	}
};

exports.principal = function(req, res){

	req.session.url = '/principal';

	res.render('principal', { title: 'Portable Garden - Inicio',
  							datos:  req.session.datos });
};

exports.userperfil = function(req, res){

	req.session.url = '/userperfil';

	res.render('userperfil', { title: 'Portable Garden - Perfil',
  							datos:  req.session.datos });
};

exports.settings = function(req, res){

	req.session.url = '/settings';

	res.render('settings', { title: 'Portable Garden - Configuración',
  						   datos:  req.session.datos });
};

exports.webcam = function(req, res){

	req.session.url = '/webcam';

	res.render('webcam', { title: 'Portable Garden - Webcam',
  						 datos:  req.session.datos });
};

exports.users_control = function(req, res){

	req.session.url = '/users_control';

	res.render('users_control', { title: 'Portable Garden - Control de Usuarios',
  								datos:  req.session.datos });
};

exports.reports = function(req, res){

	req.session.url = '/reports';

	res.render('reports', { title: 'Portable Garden - Reportes',
  						  datos:  req.session.datos });
};

exports.messaging = function(req, res){

	req.session.url = '/messaging';

	res.render('messaging', { title: 'Portable Garden - Mensajería',
  							datos:  req.session.datos,
  							elegido: req.session.chido });
};

exports.stats = function(req, res){

	req.session.url = '/stats';

	res.render('stats', { title: 'Portable Garden - Condiciones',
  						datos:  req.session.datos });
};

exports.seeds = function(req, res){

	req.session.url = '/seeds';

	res.render('seeds', { title: 'Portable Garden - Semillas',
						datos:  req.session.datos });
};

exports.error = function(req, res){
	res.render('error', { title: 'Ups, algo esta mal .-.',
						texto: 'Muy seguramente hubo un error con los datos que ingresaste, intenta de nuevo :D',
						datos:  req.session.datos,
						url: req.session.url });
};

exports.cerrar = function(req, res){

	req.session.error = false;
	req.session.datos = null;
	datos: req.session.datos
	req.session.url = '/';
	req.session.chido = 'nope';

	res.redirect('/');
};



/**
 *POST
 */

exports.inicia = function(req, res){
	
	usuario.find({ _id: req.body.iniciouser }, function(error, documento){
		if( error || documento[0] == undefined ){

			req.session.error = true;

			res.redirect('/error');

		}else{
			var passd = decrypt(documento[0].password)

			if(req.body.iniciopass == passd){ 

				req.session.datos = documento;
				req.session.datos[0].curp = decrypt(req.session.datos[0].curp);
				req.session.datos[0].email = decrypt(req.session.datos[0].email);
				req.session.datos[0].rfc = decrypt(req.session.datos[0].rfc);
				req.session.datos[0].password = decrypt(req.session.datos[0].password);
				req.session.error = false;
				req.session.url = '/principal';
				req.session.chido = 'nope';

				res.redirect('/principal');

			}else{

				console.log('no reconoce contra')

				req.session.error = true;

				res.redirect('/error');

			}
		}
	});
}

exports.agrega = function(req, res){

	var privilegioo;

	switch(req.query.Tipo){
		
		case "Gestor de Semillas":
			privilegioo = 1;
		break;
		
		case "Gestor de Condiciones":
		    privilegioo = 2;
		break;
		
		case "Administrador":
		    privilegioo = 2;
		break;
	}

	var curpc = encrypt(req.query.CURP)
	var emailc = encrypt(req.query.Email)
	var rfcc = encrypt(req.query.RFC)
	var passwordc = encrypt(req.query.Contraseña)

	var basesoni = new usuario({
			_id: req.query.Id,
			nombre: req.query.Nombre,
			apellidop: req.query.Apellidop,
			apellidom: req.query.Apellidom,
			curp: curpc,
			email: emailc,
			rfc: rfcc,
			sexo: req.query.Sexo,
			password: passwordc,
			tipo: req.query.Tipo,
			privilegio: privilegioo,
			cmensajes: 'rgb(76, 175, 80)',
			ctema: 'off'
		});
	basesoni.save(function(error, documento){
		if(error){
			res.send(error);
			console.log(error)
		}else{

			usuario.find({}, function(error2, documento2){
				for(var i = 0; i < documento2.length; i++){
					if(documento2[i]._id != documento._id){
						var basesoni = new sala({
								user: documento._id,
								user2: documento2[i]._id
							});
						basesoni.save(function(error3, documento3){
							if(error3){
								res.send(error3);
							}else{
								var basesini=new mensaje({
									sala: documento3._id
								});
								basesini.save(function(error3, documento3){
									if(error3){
										console.log(error3);
									}else{
										var readableStream = fs.createReadStream('/Users/Diego/Documents/PortableGarden/public/images/notif_usericon.jpg');
										var writableStream = fs.createWriteStream('/Users/Diego/Documents/PortableGarden/public/profile/'+req.query.Id+'.jpg');

										readableStream.pipe(writableStream, {end: false});

										var readableStream2 = fs.createReadStream('/Users/Diego/Documents/PortableGarden/public/images/user_back2.jpg');
										var writableStream2 = fs.createWriteStream('/Users/Diego/Documents/PortableGarden/public/profile_back/'+req.query.Id+'.jpg');

										readableStream2.pipe(writableStream2, {end: false});
										res.send('YAY');
									}
								})
							}
						});
					}
				}
			})
		}
	});

}

exports.agregaSem = function(req, res){


	var basesoni = new semilla({
			lote: req.body.lote,
			semilla: req.body.semilla,
			especie: req.body.especie,
			genero: req.body.genero,
			clase: req.body.clase,
			familia: req.body.familia,
			orden: req.body.orden,
			pH: req.body.pH,
			ciclov: req.body.ciclov,
			siembra: req.body.siembra,
			temperatura: req.body.temperatura,
			iluminacion: req.body.iluminacion,
			humedad: req.body.humedad
		});
	basesoni.save(function(error, documento){
		if(error){
			res.send(error);
			console.log(error)
		}else{
			res.send(documento);
			res.redirect('/seeds');
		}
	});

}

exports.listarSemillas = function(req, res){

	semilla.find({lote: req.query.lote}, function(error, documento){
		if(error){
			res.send('Error.');
		}else{
			res.send(documento);
		}
	})

};

exports.borrarSemilla = function(req, res){

	semilla.remove({lote: req.query.lote, semilla: req.query.semiillas}, function(error, documento){
		if(error){
			res.send('Error.');
			console.log(error)
		}else{
			console.log(documento)
			res.send(documento);
		}
	})
};

exports.borrarUser = function(req, res){

	usuario.remove({_id: req.query.id}, function(error, documento){
		if(error){
			res.send('Error.');
			console.log(error)
		}else{
			sala.find({$or: [{user: req.query.id}, {user2: req.query.id}]}, function(error2, documento2){
				if(error2){
					console.log(error2)
				}else{
					for (var i = 0; i < documento2.length; i++) {
						console.log(documento2[i]._id)
						sala.remove({_id: documento2[i]._id}, function(error3, documento3){
							if(error3){
								res.send('Error.');
								console.log(error3)
							}
						})	
						mensaje.remove({sala: documento2[i]._id}, function(error4, documento4){
							if(error4){
								res.send('Error.');
								console.log(error4)
							}
						})
					}
					console.log('YAY')
					res.redirect('/users_control')
				}
			})
		}
	})

};

exports.listarUsuarios = function(req, res){

	usuario.find({}, function(error, documento){
		if(error){
			res.send('Error.');
		}else{

			//Primera vez que se ejecute el programa en compu nueva
	
			/*var aux = 1;

			for (var i = 0; i < documento.length; i++) {
				for (var j = aux; j < documento.length; j++) {
					var basesoni = new sala({
							user: documento[i]._id,
							user2: documento[j]._id
						});
					basesoni.save(function(error2, documento2){
						if(error2){
							res.send(error2);
							console.log('la cagaste guardando a '+i+' '+j)
						}else{
							var basesini=new mensaje({
								sala: documento2._id
							});
							basesini.save(function(error3, documento3){
								if(error3){
									console.log(error3);
								}else{
								}
							});
						}
					});
				}
				aux++;
			};*/

			for (var i = 0; i < documento.length; i++) {
				documento[i].curp = decrypt(documento[i].curp);
				documento[i].email = decrypt(documento[i].email);
				documento[i].rfc = decrypt(documento[i].rfc);
				documento[i].password = decrypt(documento[i].password);
			};
			res.send(documento);
		}
	})

};

exports.modificarcurp = function(req, res){


	var nombree = req.body.curp;
	nombree = encrypt(nombree);

	usuario.update({_id: req.session.datos[0]._id},{
		$set:{

			curp: nombree
				
			}
		}, function(error, documento){
			if(error){
				res.send('Error.');
			}else{
				res.redirect('/settings');
				req.session.datos[0].curp = req.body.curp;
				console.log(documento)
			}	
	});

};

exports.modificarrfc = function(req, res){


	var nombree = req.body.rfc;
	nombree = encrypt(nombree);

	usuario.update({_id: req.session.datos[0]._id},{
		$set:{

			rfc: nombree
				
			}
		}, function(error, documento){
			if(error){
				res.send('Error.');
			}else{
				res.redirect('/settings');
				req.session.datos[0].rfc = req.body.rfc;
				console.log(documento)
			}	
	});

};

exports.modificaremail = function(req, res){


	var nombree = req.body.email;
	nombree = encrypt(nombree);

	usuario.update({_id: req.session.datos[0]._id},{
		$set:{

			email: nombree
				
			}
		}, function(error, documento){
			if(error){
				res.send('Error.');
			}else{
				res.redirect('/settings');
				req.session.datos[0].email = req.body.email;
				console.log(documento)
			}	
	});

};

exports.modificarsexo = function(req, res){


	var nombree = req.body.sexo;

	usuario.update({_id: req.session.datos[0]._id},{
		$set:{

			sexo: nombree
				
			}
		}, function(error, documento){
			if(error){
				res.send('Error.');
			}else{
				res.redirect('/settings');
				req.session.datos[0].sexo = req.body.sexo;
				console.log(documento)
			}	
	});

};

exports.modificarnombre = function(req, res){


	var nombree = req.body.nombre;

	usuario.update({_id: req.session.datos[0]._id},{
		$set:{

			nombre: nombree
				
			}
		}, function(error, documento){
			if(error){
				res.send('Error.');
			}else{
				res.redirect('/settings');
				req.session.datos[0].nombre = req.body.nombre;
				console.log(documento)
			}	
	});

};

exports.modificarapellidop = function(req, res){


	var nombree = req.body.apellidop;

	usuario.update({_id: req.session.datos[0]._id},{
		$set:{

			apellidop: nombree
				
			}
		}, function(error, documento){
			if(error){
				res.send('Error.');
			}else{
				res.redirect('/settings');
				req.session.datos[0].apellidop = req.body.apellidop;
				console.log(documento)
			}	
	});

};

exports.modificarapellidom = function(req, res){


	var nombree = req.body.apellidom;

	console.log(nombree)
	console.log(req.session.datos[0]._id)
	usuario.update({_id: req.session.datos[0]._id},{
		$set:{

			apellidom: nombree
				
			}
		}, function(error, documento){
			if(error){
				res.send('Error.');
			}else{
				res.redirect('/settings');
				req.session.datos[0].apellidom = req.body.apellidom;
				console.log(documento)
			}	
	});

};

exports.modificarpassword = function(req, res){


	var nombree = req.body.password;
	nombree = encrypt(nombree);

	usuario.update({_id: req.session.datos[0]._id},{
		$set:{

			password: nombree
				
			}
		}, function(error, documento){
			if(error){
				res.send('Error.');
			}else{
				res.redirect('/settings');
				req.session.datos[0].password = req.body.password;
				console.log(documento)
			}	
	});

};

exports.modificarFulano = function(req, res){

	var idd = (req.query.id2 == '') ? req.query.id : req.query.id2;
	var nombree = (req.query.nombre2 == '') ? req.query.nombre : req.query.nombre2;
	var apellidopp = (req.query.apellidop2 == '') ? req.query.apellidop : req.query.apellidop2;
	var	apellidomm = (req.query.apellidom2 == '') ? req.query.apellidom : req.query.apellidom2;
	var curpp = (req.query.curp2 == '') ? req.query.curp : req.query.curp2;
	var emaill = (req.query.email2 == '') ? req.query.email : req.query.email2;
	var rfcc = (req.query.rfc2 == '') ? req.query.rfc : req.query.rfc2;
	var sexoo = (req.query.sexo2 == '') ? req.query.sexo : req.query.sexo2;
	var passwordd = (req.query.password2 == '') ? req.query.password : req.query.password2;
	var tipoo = (req.query.tipo2 == '') ? req.query.tipo : req.query.tipo2;
	var privilegioo;

	curpp = encrypt(curpp);
	emaill = encrypt(emaill);
	rfcc = encrypt(rfcc);
	passwordd = encrypt(passwordd);


	console.log(req.query.id2)

	switch(tipoo){
		
		case "Gestor de Semillas":
			privilegioo = 1;
		break;
		
		case "Gestor de Condiciones":
		    privilegioo = 2;
		break;
		
		case "Administrador":
		    privilegioo = 2;
		break;
	}

	usuario.update({_id: req.query.id},{
		$set:{

			_id: idd,
			nombre: nombree,
			apellidop: apellidopp,
			apellidom: apellidomm,
			curp: curpp,
			email: emaill,
			rfc: rfcc,
			sexo: sexoo,
			password: passwordd,
			tipo: tipoo,
			privilegio: privilegioo
				
			}
		}, function(error, documento){
			if(error){
				res.send('Error.');
			}else{
				res.send(documento);
				console.log(documento)
			}	
	});

};

//colorsitos bonitos :3

exports.colorMSG = function(req, res){


	var color = req.body.coloresta;

	console.log(color)
	console.log(req.session.datos[0]._id)
	usuario.update({_id: req.session.datos[0]._id},{
		$set:{

			cmensajes: color
				
			}
		}, function(error, documento){
			if(error){
				res.send('Error.');
			}else{
				res.redirect('/settings');
				req.session.datos[0].cmensajes = req.body.coloresta;
				console.log(documento)
			}	
	});

};

exports.colorTema = function(req, res){


	var color = req.body.theme;

	console.log(color)
	console.log(req.session.datos[0]._id)
	if(color == undefined){
		color = 'off';
	}
	usuario.update({_id: req.session.datos[0]._id},{
		$set:{

			ctema: color
				
			}
		}, function(error, documento){
			if(error){
				res.send('Error.');
			}else{
				res.redirect('/settings');
				req.session.datos[0].ctema = color;
				console.log(documento)
			}	
	});

};

//esto se ejecuta la primera vez que se corre el programa en otra compu
/*
exports.primera = function(req, res){

	var curpc = encrypt("BADD110313HCMLNS09")
	var emailc = encrypt("granjero@granjero.com")
	var rfcc = encrypt("CUPU800825569")
	var passwordc = encrypt("bebexitodelflow123")

	var basesoni = new usuario({
			_id: "2015010001",
			nombre: "Granjero",
			apellidop: "Mexicano",
			apellidom: "de Ixtepan",
			curp: curpc,
			email: emailc,
			rfc: rfcc,
			sexo: "Macho Alfa",
			password: passwordc,
			tipo: "Gestor de Semillas",
			privilegio: 1
		});
	basesoni.save(function(error, documento){
		if(error){
			res.send(error);
			console.log(error)
		}else{
			res.send(documento);
			res.redirect('/');
		}
	});

	var curpc2 = encrypt("BADD110313HCMLNS08")
	var emailc2 = encrypt("gestor@gestor.com")
	var rfcc2 = encrypt("CUPU800825568")
	var passwordc2 = encrypt("bebexitodelflow123")

	var basesoni2 = new usuario({
			_id: "2015020001",
			nombre: "Gestor",
			apellidop: "Mexicanotl",
			apellidom: "de Ixtepantl",
			curp: curpc2,
			email: emailc2,
			rfc: rfcc2,
			sexo: "Macho Alfa",
			password: passwordc2,
			tipo: "Gestor de Condiciones",
			privilegio: 2
		});
	basesoni2.save(function(error, documento){
		if(error){
			res.send(error);
			console.log(error)
		}else{
			res.send(documento);
			res.redirect('/');
		}
	});

	var curpc3 = encrypt("BADD110313HCMLNS07")
	var emailc3 = encrypt("admin@admin.com")
	var rfcc3 = encrypt("CUPU800825567")
	var passwordc3 = encrypt("bebexitodelflow123")

	var basesoni3 = new usuario({
			_id: "2015030001",
			nombre: "Admin",
			apellidop: "Mexicanotltl",
			apellidom: "de Ixtepantltl",
			curp: curpc3,
			email: emailc3,
			rfc: rfcc3,
			sexo: "Macho Alfa",
			password: passwordc3,
			tipo: "Administrador",
			privilegio: 3
		});
	basesoni3.save(function(error, documento){
		if(error){
			res.send(error);
			console.log(error)
		}else{
			res.send(documento);
			res.redirect('/');
		}
	});
}*/
