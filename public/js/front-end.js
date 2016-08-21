var aplicacion = angular.module('aplicacion', []);

aplicacion.controller('users-data', function($scope, $http) {

    $scope.elegido = [];
    $scope.users = [];
    $scope._id = '';
    $scope.nombre = '';
    $scope.apellidop = '';
    $scope.apellidom = '';
    $scope.curp = '';
    $scope.email = '';
    $scope.rfc = '';
    $scope.sexo = 'Hombre';
    $scope.password = '';
    $scope.tipo = 'Gestor de Semillas';
    $scope.Sexo2 = 'Hombre';
    $scope.Tipo2 = 'Gestor de Semillas';

    $scope.cargarUsers = function(datos){
        $http({
            method: 'POST', 
            url: '/listarUsuarios'
        }).
        success(function(data) {
            if(typeof(data) == 'object'){
                $scope.users = data;
                for(var i = 0; i < $scope.users.length; i++){
                    if(datos == $scope.users[i]._id){
                        $scope.users.splice(i, 1);
                    }
                }
                $scope.elegido = $scope.users[0];
            }else{
                alert('Error al intentar recuperar los usuarios.');
            }
        }).
        error(function() {
            alert('Error al intentar borrar al usuario');
        });
    };

    $scope.guardarUser = function(){
        if(validaNuevoUser($scope.Id2,$scope.Nombre2,$scope.Apellidop2,$scope.Apellidom2,$scope.CURP2,$scope.Email2,$scope.RFC2,$scope.Contrasenia2)){
            $http({
                method: 'POST', 
                url: '/agrega',
                params: {
                    Id: $scope.Id2,
                    Nombre: $scope.Nombre2,
                    Apellidop: $scope.Apellidop2,
                    Apellidom: $scope.Apellidom2,
                    CURP: $scope.CURP2,
                    Email: $scope.Email2,
                    RFC: $scope.RFC2,
                    Sexo: $scope.Sexo2,
                    Contraseña: $scope.Contrasenia2,
                    Tipo: $scope.Tipo2
                }
            }).
            success(function(data) {
                location.reload();
            }).
            error(function() {
            });
        }
    };

    $scope.borrarUser = function(user){
        $http({
            method: 'POST', 
            url: '/borrarUser',
            params: {
                id: user._id
            }
        }).
        success(function(data) {
            location.reload();
        }).
        error(function(err) {
            alert('no borro .-.');
            location.reload();
        });
    };

    $scope.cargarInfo = function(user){

        $scope.elegido = user;
        console.log($scope.elegido)

        var win = $(window).width();
          if(win < 673){
            $('#back_button').css('display' , 'block');
            $('#back_button2').css('display' , 'block');
            $('#back_button3').css('display' , 'block');
            $('#back_button4').css('display' , 'block');
            $('#back_button5').css('display' , 'block');
            $('#grid_move').animate({left : '-100%'}, 400);
            $('#grid_move2').animate({left : '-100%'}, 400);
            $('#grid_move3').animate({left : '-100%'}, 400);
            $('#grid_move4').animate({left : '-100%'}, 400);
            $('#grid_move5').animate({left : '-100%'}, 400);
          }

    };

    $scope.modificarFulano = function(user){

        $http({
            method: 'POST', 
            url: '/modificarFulano',
            params: {
                id: user._id,
                nombre: user.nombre,
                apellidop: user.apellidop,
                apellidom: user.apellidom,
                curp: user.curp,
                email: user.email,
                rfc: user.rfc,
                sexo: user.sexo,
                password: user.password,
                tipo: user.tipo,
                privilegio: user.privilegio,
                id2: $scope._id,
                nombre2: $scope.nombre,
                apellidop2: $scope.apellidop,
                apellidom2: $scope.apellidom,
                curp2: $scope.curp,
                email2: $scope.email,
                rfc2: $scope.rfc,
                sexo2: $scope.sexo,
                password2: $scope.password,
                tipo2: $scope.tipo
            }
        }).
        success(function(data) {
            if(typeof(data) == 'object'){
                $scope.cargarUsers();
                console.log("Debe de entrar aqui"+data)
                $scope._id = '';
                $scope.nombre = '';
                $scope.apellidop = '';
                $scope.apellidom = '';
                $scope.curp = '';
                $scope.email = '';
                $scope.rfc = '';
                $scope.sexo = 'Hombre';
                $scope.password = '';
                $scope.tipo = 'Gestor de Semillas';
            }else{
                alert(data);
            }
        }).
        error(function(error) {
            $scope.cargarUsers();
        });
    };

});

aplicacion.controller('seeds-data', function($scope, $http) {

    $scope.seeds = [];

    $scope.cargarLote = function(elote){
        $http({
            method: 'POST', 
            url: '/listarSemillas',
            params: {

                lote: elote

            }
        }).
        success(function(data) {
            if(typeof(data) == 'object'){
                $scope.seeds = data;
            }else{
                alert('Error al intentar recuperar las semiillas.');
            }
        }).
        error(function() {
            alert('Error al intentar recuperar las semiillas.');
        });
    };

    $scope.eliminarSemilla = function(elote, semillaa){

        $http({
            method: 'POST', 
            url: '/borrarSemilla',
            params: {

                lote: elote,
                semiillas: semillaa

            }
        }).
        success(function(data) {
            if(typeof(data) == 'object'){
                $scope.cargarLote(1);
            }else{
                alert('Error al intentar borrar las semiilla.');
            }
        }).
        error(function() {
            $scope.cargarLote(1);
        });
    };

});

aplicacion.controller('arduino-write', function($scope, $http) {

    var socket = io('http://192.168.5.27:3000/');
    $scope.luz = 'f';
    $scope.ventiladores = 'f';
    $scope.bomba = 'f';
    $scope.cortina = 'f';
    $scope.piso = 1;
    var checkLuz = document.getElementById("condition-1");
    var checkBomba = document.getElementById("condition-2");
    var checkVentiladores = document.getElementById("condition-3");
    var checkCortina = document.getElementById("condition-4");

    socket.on('sensor1', function(data){
        if($scope.piso == 1){
            $('#luz').text(data.luz +' Lux');
            $('#temp').text(data.temperatura +' °C');
            $('#humd').text(data.humedad +' HR');
        }
    })
    socket.on('sensor2', function(data){
        if($scope.piso == 2){
            $('#luz').text(data.luz +' Lux');
            $('#temp').text(data.temperatura +' °C');
            $('#humd').text(data.humedad +' HR');
        }
    })

    $scope.cambiar = function(piso){

        checkLuz.checked = false;
        checkBomba.checked = false;
        checkVentiladores.checked = false;
        checkCortina.checked = false;

        socket.emit('apagarPiso', $scope.piso)
        $scope.piso = piso;

    }

    $scope.activarLuz = function(){

        if($scope.luz == 't'){

            $scope.luz = 'f';

        }else{
            
            $scope.luz = 't'
            
        }
        socket.emit('write', 'l', $scope.piso, $scope.luz)



    }

    $scope.activarBomba = function(){
        
        if($scope.bomba == 't'){

            $scope.bomba = 'f';

        }else{

            $scope.bomba = 't'

        }

        socket.emit('write', 'b', $scope.piso, $scope.bomba)

    }

    $scope.activarVentiladores = function(){
        
        if($scope.ventiladores == 't'){

            $scope.ventiladores = 'f';

        }else{

            $scope.ventiladores = 't'

        }

        socket.emit('write', 'v', $scope.piso, $scope.ventiladores)

    }

    $scope.activarCortina = function(){

        if($scope.cortina == 't'){

            $scope.cortina = 'f';

        }else{

            $scope.cortina = 't'

        }

        socket.emit('write', 'c', $scope.piso, $scope.cortina)
        
    }


});

aplicacion.controller('reports', function($scope, $http) {

    /*$('.report_namedisp span').hover(function(){
        $(this).text('Eliminar');
    },
    function(){
        $(this).text('X');
    });*/

    $scope.cargarReports = function(id){
        $http({
            method: 'POST', 
            url: '/cargarReports',
            params: {
                id: id
            }
        }).
        success(function(data) {
            $scope.reports = data;
            $scope.elegido = data[0]; 
        }).
        error(function() {
        });
    };

    $scope.cargarInfo = function(report, id){

        $scope.elegido = report;

    }

    $scope.borrarReporte = function(report, id){

        $http({
            method: 'POST', 
            url: '/borrarReporte',
            params: {
                id: report._id
            }
        }).
        success(function(data) {
            location.reload();
        }).
        error(function(err) {
            alert('no borro .-.');
            location.reload();
        });
    };

});

aplicacion.controller('menu', function($scope, $http, $document) {
    
    $scope.cargarUsers2 = function(datos){
        
        $http({
            method: 'POST', 
            url: '/listarChat'
        }).
        success(function(data2) {
            $scope.users = data2;      
            for (var i = 0; i < $scope.users.length; i++) {
                if($scope.users[i].emisor == ''){
                    $scope.users[i].emisor == '';
                }else if (datos == data2[i].mensajes[data2[i].mensajes.length-1].emisor) {
                    $scope.users[i].emisor = 'Tu: ';
                }else{
                    $scope.users[i].emisor = 'El: ';
                }
            };
        }).
        error(function() {
            alert('Error con lo de listarChat');
        });
    };

    $scope.cargarInfo2 = function(datos){
        
        $http({
            method: 'POST', 
            url: '/cargarInfo2',
            params: {
                id: datos.iddest
            }
        }).
        success(function(data){
            location.href = 'http://192.168.5.27:3000/messaging';
        }).
        error(function(){

        });
    };
});


aplicacion.controller('chat', function($scope, $http, $document) {

    var socket = io('http://192.168.5.27:3000/chatsini');
    $scope.mensaje = '';

    socket.on('chat', function(data){
        $("#message_cont").animate({ scrollTop: $("div.msm_supercont").height() }, 1000);
        var lastmsm = $('.message_inner:last-child').find('.msm_buown').length;
        var lastmsm_2 = $('.message_inner:last-child').find('.msm_buoth').length;
        if( lastmsm_2 > 0){
             $('.message_inner:last-child').append('<div class="msm_innercont">'+
                                '<div class="msm_buoth">'+
                                  '<div>'+
                                    data.mensaje +
                                    '<span>'+ data.hora + ':' + data.minuto +' '+ data.hap +'</span>'+
                                  '</div>'+
                                '</div>'+
                              '</div>');
          }else{
            $('div.msm_supercont').append('<div class="message_inner">'+
                            '<i class="riseblock"></i>'+
                            '<div class="msm_innercont">'+
                              '<div class="msm_buoth">'+
                                '<div>'+
                                  data.mensaje +
                                  '<span>'+ data.hora + ':' + data.minuto +' '+ data.hap +'</span>'+
                                '</div>'+
                              '</div>'+
                            '</div>'+
                          '</div>');
          }

    });

    $scope.cargarUsers = function(datos, chido){
        
        var bandera = true;

        $http({
            method: 'POST', 
            url: '/listarChat'
        }).
        success(function(data2) {
             console.log(chido)
            $('div.msm_supercont').empty();
            $scope.users = data2;    

            for (var i = 0; i < $scope.users.length; i++) {
                if ($scope.users[i].iddest == chido) {
                    socket.emit('join', data2[i]);      
                    $scope.elegido = data2[i]; 
                    bandera = false;
                }
            }

            if (bandera) {
                socket.emit('join', data2[0]);      
                $scope.elegido = data2[0]; 
            }

            for (var i = 0; i < $scope.users.length; i++) {
                if($scope.users[i].emisor == ''){
                    $scope.users[i].emisor == '';
                }else if (datos == data2[i].mensajes[data2[i].mensajes.length-1].emisor) {
                    $scope.users[i].emisor = 'Tu: ';
                }else{
                    $scope.users[i].emisor = 'El: ';
                }
            };
            for(var i=0; i < $scope.elegido.mensajes.length; i++){
                chido = $scope.elegido.mensajes[i].mensaje;
                texto = chido.split('');

                especiales = new Array('<','>','/','=',':',';','(',')','+','-','*','#','$','%','&','?','[',']','{','}','"');
                normales = new Array('&#60;','&#62;','&#47;','&#61;','&#58;','&#59;','&#40;','&#41;','&#43;','&#45;',
                    '&#42;','&#35;','&#36;','&#37;','&#38;','&#63;','&#91;','&#93;','&#123;','&#125;','&#34;');         
               
                for ( x = 0; x < texto.length; x++ ){
               
                    for( j = 0; j < especiales.length; j++ ){                    
               
                        aux = especiales[j];
               
                        if( texto[x] == aux ){
               
                            //texto = texto.replace(texto[i], normales[j]);
                            //texto = texto.split(especiales[j]).join(normales[j]);
                            texto[x] = normales[j];
               
                        }
                    }
                }
               
                chido = texto.join('');
                $scope.elegido.mensajes[i].mensaje = chido;
            }
            for(var i=0; i < $scope.elegido.mensajes.length; i++){                    
                var lastmsm = $('.message_inner:last-child').find('.msm_buown').length;
                var lastmsm_2 = $('.message_inner:last-child').find('.msm_buoth').length;

                if($scope.elegido.mensajes[i].emisor == datos){
                    
                    if( lastmsm > 0){

                        $('.message_inner:last-child').append('<div class="msm_innercont">'+
                                        '<div class="msm_buown">'+
                                            '<div>'+
                                            $scope.elegido.mensajes[i].mensaje +
                                            '<span>'+ $scope.elegido.mensajes[i].hora + ':' + $scope.elegido.mensajes[i].minuto +' '+ $scope.elegido.mensajes[i].hap +'</span>'+
                                            '</div>'+
                                        '</div>'+
                                        '</div>');
                    }else{

                    $('div.msm_supercont').append('<div class="message_inner">'+
                                        '<i class="riseblock2"></i>'+
                                        '<div class="msm_innercont">'+
                                        '<div class="msm_buown">'+
                                            '<div>'+
                                            $scope.elegido.mensajes[i].mensaje +
                                            '<span>'+ $scope.elegido.mensajes[i].hora + ':' + $scope.elegido.mensajes[i].minuto +' '+ $scope.elegido.mensajes[i].hap +'</span>'+
                                            '</div>'+
                                        '</div>'+
                                        '</div>'+
                                    '</div>');
                    }
                }else{

                    if( lastmsm_2 > 0){

                        $('.message_inner:last-child').append('<div class="msm_innercont">'+
                                        '<div class="msm_buoth">'+
                                            '<div>'+
                                            $scope.elegido.mensajes[i].mensaje +
                                            '<span>'+ $scope.elegido.mensajes[i].hora + ':' + $scope.elegido.mensajes[i].minuto +' '+ $scope.elegido.mensajes[i].hap +'</span>'+
                                            '</div>'+
                                        '</div>'+
                                        '</div>');
                    }else{

                    $('div.msm_supercont').append('<div class="message_inner">'+
                                    '<i class="riseblock"></i>'+
                                    '<div class="msm_innercont">'+
                                        '<div class="msm_buoth">'+
                                        '<div>'+
                                            $scope.elegido.mensajes[i].mensaje +
                                            '<span>'+ $scope.elegido.mensajes[i].hora + ':' + $scope.elegido.mensajes[i].minuto +' '+ $scope.elegido.mensajes[i].hap +'</span>'+
                                        '</div>'+
                                        '</div>'+
                                    '</div>'+
                                    '</div>');
                    }
                }                
            }
            $("#message_cont").animate({ scrollTop: $("div.msm_supercont").height() }, 1000);
        }).
        error(function() {
            alert('Error con lo de listarChat');
        });
    };

    $scope.cargarInfo = function(user, dato){
        if(user.id != $scope.elegido.id){
            $http({
                    method: 'POST', 
                    url: '/listarMsg',
                    params: {
                        sala: user.id
                    }
                }).
                success(function(data) {
                    user.mensajes = data[0].mensajes;
                }).
                error(function(error) {
                });  
            var win = $(window).width();
            if(win < 673){
                $('#back_button').css('display' , 'block');
                $('#back_button2').css('display' , 'block');
                $('#back_button3').css('display' , 'block');
                $('#back_button3').css('display' , 'block');
                $('#grid_move').animate({left : '-100%'}, 400);
                $('#grid_move2').animate({left : '-100%'}, 400);
                $('#grid_move3').animate({left : '-100%'}, 400);
                $('#grid_move4').animate({left : '-100%'}, 400);
            }
            
            $scope.elegido = user;

            socket.emit('cambiarsala', user);  
            
            $('div.msm_supercont').empty();

            for(var i=0; i < user.mensajes.length; i++){              
                chido = user.mensajes[i].mensaje;
                texto = chido.split('');
                especiales = new Array('<','>','/','=',':',';','(',')','+','-','*','#','$','%','&','?','[',']','{','}','"');
                normales = new Array('&#60;','&#62;','&#47;','&#61;','&#58;','&#59;','&#40;','&#41;','&#43;','&#45;',
                    '&#42;','&#35;','&#36;','&#37;','&#38;','&#63;','&#91;','&#93;','&#123;','&#125;','&#34;');                        
                for ( x = 0; x < texto.length; x++ ){               
                    for( j = 0; j < especiales.length; j++ ){                                   
                        aux = especiales[j];               
                        if( texto[x] == aux ){               
                            //texto = texto.replace(texto[i], normales[j]);
                            //texto = texto.split(especiales[j]).join(normales[j]);
                            texto[x] = normales[j];               
                        }
                    }
                }               
                chido = texto.join('');
                user.mensajes[i].mensaje = chido;
            }

            for(var i=0; i < user.mensajes.length; i++){              
                var lastmsm = $('.message_inner:last-child').find('.msm_buown').length;
                var lastmsm_2 = $('.message_inner:last-child').find('.msm_buoth').length;
                if(user.mensajes[i].emisor == dato){
                    if( lastmsm > 0){
                        $('.message_inner:last-child').append('<div class="msm_innercont">'+
                                        '<div class="msm_buown">'+
                                            '<div>'+
                                            user.mensajes[i].mensaje +
                                            '<span>'+ user.mensajes[i].hora + ':' + user.mensajes[i].minuto +' '+ user.mensajes[i].hap +'</span>'+
                                            '</div>'+
                                        '</div>'+
                                        '</div>');
                    }else{
                    $('div.msm_supercont').append('<div class="message_inner">'+
                                        '<i class="riseblock2"></i>'+
                                        '<div class="msm_innercont">'+
                                        '<div class="msm_buown">'+
                                            '<div>'+
                                            user.mensajes[i].mensaje +
                                            '<span>'+ user.mensajes[i].hora + ':' + user.mensajes[i].minuto +' '+ user.mensajes[i].hap +'</span>'+
                                            '</div>'+
                                        '</div>'+
                                        '</div>'+
                                    '</div>');
                    }
                }else{
                    if( lastmsm_2 > 0){
                        $('.message_inner:last-child').append('<div class="msm_innercont">'+
                                        '<div class="msm_buoth">'+
                                            '<div>'+
                                            user.mensajes[i].mensaje +
                                            '<span>'+ user.mensajes[i].hora + ':' + user.mensajes[i].minuto +' '+ user.mensajes[i].hap +'</span>'+
                                            '</div>'+
                                        '</div>'+
                                        '</div>');
                    }else{
                    $('div.msm_supercont').append('<div class="message_inner">'+
                                    '<i class="riseblock"></i>'+
                                    '<div class="msm_innercont">'+
                                        '<div class="msm_buoth">'+
                                        '<div>'+
                                            user.mensajes[i].mensaje +
                                            '<span>'+ user.mensajes[i].hora + ':' + user.mensajes[i].minuto +' '+ user.mensajes[i].hap +'</span>'+
                                        '</div>'+
                                        '</div>'+
                                    '</div>'+
                                    '</div>');
                    }
                }                
            }
            $("#message_cont").animate({ scrollTop: $("div.msm_supercont").height() }, 1000);
        }   
    };

    $scope.enviar = function(emisor){

        var mensajeAux = '';

        if($scope.mensaje != ''){

                chido = document.getElementById('msm_value').value;
                mensajeAux = $scope.mensaje;
                texto = chido.split('');

                especiales = new Array('<','>','/','=',':',';','(',')','+','-','*','#','$','%','&','?','[',']','{','}','"');
                normales = new Array('&#60;','&#62;','&#47;','&#61;','&#58;','&#59;','&#40;','&#41;','&#43;','&#45;',
                    '&#42;','&#35;','&#36;','&#37;','&#38;','&#63;','&#91;','&#93;','&#123;','&#125;','&#34;');         
               
                for ( i = 0; i < texto.length; i++ ){
               
                    for( j = 0; j < especiales.length; j++ ){                    
               
                        aux = especiales[j];
               
                        if( texto[i] == aux ){
               
                            //texto = texto.replace(texto[i], normales[j]);
                            //texto = texto.split(especiales[j]).join(normales[j]);
                            texto[i] = normales[j];
               
                        }
                    }
                }
               
                chido = texto.join('');
                $scope.mensaje = chido;
        
                /*Aqui llamalas*/

                var tiempo = new Date();
                var hora = tiempo.getHours();
                var minuto = tiempo.getMinutes();
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
        
                socket.emit('mensaje', {
        
                    mensaje: $scope.mensaje,
                    hora: hora,
                    minuto: minuto,
                    hap: hap,
                    emisor: emisor
                    
                });

                var lastmsm = $('.message_inner:last-child').find('.msm_buown').length;
                var lastmsm_2 = $('.message_inner:last-child').find('.msm_buoth').length;
                if( lastmsm > 0){
                    $('.message_inner:last-child').append('<div class="msm_innercont">'+
                                        '<div class="msm_buown">'+
                                            '<div>'+
                                            $scope.mensaje +
                                            '<span>'+ hora + ':' + minuto +' '+ hap +'</span>'+
                                            '</div>'+
                                        '</div>'+
                                        '</div>');
                }else{
                    $('div.msm_supercont').append('<div class="message_inner">'+
                                    '<i class="riseblock2"></i>'+
                                    '<div class="msm_innercont">'+
                                    '<div class="msm_buown">'+
                                        '<div>'+
                                        $scope.mensaje +
                                        '<span>'+ hora + ':' + minuto +' '+ hap +'</span>'+
                                        '</div>'+
                                    '</div>'+
                                    '</div>'+
                                '</div>');
                }
                $http({
                    method: 'POST', 
                    url: '/guardarMsg',
                    params: {
        
                        mensaje: mensajeAux,
                        id: $scope.elegido.id,
                        emisor: emisor,
                        hora: hora,
                        minuto: minuto,
                        hap: hap,
        
                    }
                }).
                success(function(data) {
                    $scope.mensaje = '';
                    /*for (var i = 0; i < $scope.users.length; i++) {
                        if( item[i].id == $scope.elegido.id){
                            item[i].ultimo = $scope.elegido.mensajes[$scope.elegido.mensajes.length-1].mensaje;
                        }
                    }*/
                }).
                error(function(error) {
                });
                $scope.mensaje = '';

                $scope.cargarUsers2(emisor);
            }

    };

    $scope.cargarUsers2 = function(datos){
        
        $http({
            method: 'POST', 
            url: '/listarChat'
        }).
        success(function(data2) {
            $scope.users = data2;      
            for (var i = 0; i < $scope.users.length; i++) {
                if($scope.users[i].emisor == ''){
                    $scope.users[i].emisor == '';
                }else if (datos == data2[i].mensajes[data2[i].mensajes.length-1].emisor) {
                    $scope.users[i].emisor = 'Tu: ';
                }else{
                    $scope.users[i].emisor = 'El: ';
                }
            };
        }).
        error(function() {
            alert('Error con lo de listarChat');
        });
    };

});


//Validaciones

function validarInicio(){

    var checkOK = '1234567890' ;
    var checkStr = inicioform.iniciouser.value;
    var allValid = true;
    var checkOK2 = '1234567890' + 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz';
    var checkStr2 = inicioform.iniciopass.value;
    var allValid2 = true;

    if(checkStr.length < 9){
        $('#err_username').show();
        $('#err_username').html('<span>Usuario con 9 caracteres minimo</span>');
        return false;
    }

    else if(checkStr2.length < 6){
        $('#err_intipass').show();
        $('#err_intipass').html('<span>Contraseña con 6 caracteres minimo</span>');
        return false;
    }

    for (i = 0; i < checkStr.length; i++) {

        ch = checkStr.charAt(i);
        
        for (j = 0; j < checkOK.length; j++)

            if (ch == checkOK.charAt(j))

                break;


        if (j == checkOK.length) {

            allValid = false;
            break;

        }

    }

    for (i = 0; i < checkStr2.length; i++) {

        ch = checkStr2.charAt(i);
        
        for (j = 0; j < checkOK2.length; j++)

            if (ch == checkOK2.charAt(j))

                break;


        if (j == checkOK2.length) {

            allValid2 = false;
            break;

        }

    }

    if (!allValid) {

        $('#err_username').show();
        $('#err_username').html('<span>Solo Numeros y sin espacios en el Usuario</span>');
        return false;

    }

    else if (!allValid2) {

        $('#err_intipass').show();
        $('#err_intipass').html('<span>Solo Letras y Numeros en la Contraseña</span>');
        return false;

    }

    return true;

}

function validaNuevoUser(ido, nombreo, appo, apmo, curpo, emailo, rfco, passo){

    var validos1 = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz';
    var validos2 = '1234567890';
    var validos3 = '1234567890ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    var validos4 = '1234567890ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz_-$#!%&';

    var id = ido;
    var nombre = nombreo;
    var app = appo;
    var apm = apmo;
    var curp = curpo;
    var email = emailo;
    var rfc = rfco;
    var pass = passo;

    if(id.length < 8){
        alert('El id debe contener al menos 8 caracteres');
        return false;
    }

    if(nombre.length < 4){
        alert('El nombre debe contener al menos 4 caracteres');
        return false;
    }

    alert(apm)
    if(app.length < 4 || apm.length < 4){
        alert('Los apellidos deben contener al menos 4 caracteres');
        return false;
    }

    if(curp.length < 18){
        alert('El CURP debe contener al menos 18 caracteres');
        return false;
    }

    if(email.length < 7){
        alert('El email debe contener al menos 7 caracteres');
        return false;
    }
 
    if(rfc.length < 12){
        alert('El RFC debe contener al menos 12 caracteres');
        return false;
    }


    if(pass.length < 18){
        alert('La contraseña debe contener al menos 18 caracteres');
        return false;
    }

    for (i = 0; i < id.length; i++) {

        ch = id.charAt(i);
        
        for (j = 0; j < validos2.length; j++)

            if (ch == validos2.charAt(j))

                break;


        if (j == validos2.length) {

            allValid = false;
            break;

        }

    }

    if (!allValid) {

        alert('El id debe ser un numero');
        return false;

    }

    for (i = 0; i < nombre.length; i++) {

        ch = nombre.charAt(i);
        
        for (j = 0; j < validos1.length; j++)

            if (ch == validos1.charAt(j))

                break;


        if (j == validos1.length) {

            allValid2 = false;
            break;

        }

    }

    if (!allValid2) {

        alert('El nombre debe contener unicamente letras sin espacios');
        return false;

    }

    for (i = 0; i < curp.length; i++) {

        ch = curp.charAt(i);
        
        for (j = 0; j < validos3.length; j++)

            if (ch == validos3.charAt(j))

                break;


        if (j == validos3.length) {

            allValid3 = false;
            break;

        }

    }

    if (!allValid3) {

        alert('El curp debe contener unicamente letras mayusculas y numeros sin espacios');
        return false;

    }

    for (i = 0; i < rfc.length; i++) {

        ch = rfc.charAt(i);
        
        for (j = 0; j < validos3.length; j++)

            if (ch == validos3.charAt(j))

                break;


        if (j == validos3.length) {

            allValid4 = false;
            break;

        }

    }

    if (!allValid4) {

        alert('El RFC debe contener unicamente letras mayusculas y numeros sin espacios');
        return false;

    }

    for (i = 0; i < pass.length; i++) {

        ch = pass.charAt(i);
        
        for (j = 0; j < validos4.length; j++)

            if (ch == validos4.charAt(j))

                break;


        if (j == validos4.length) {

            allValid5 = false;
            break;

        }

    }

    if (!allValid5) {

        alert('Se encontro un caracter invalido en la contraseña');
        return false;

    }

    return true;

}

function validarSemillas(){

    var validos1 = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz';
    var validos2 = '1234567890';

    var semilla = new_seedform.semilla.value;
    var especie = new_seedform.especie.value;
    var genero = new_seedform.genero.value;
    var clase = new_seedform.clase.value;
    var familia = new_seedform.familia.value;
    var orden = new_seedform.orden.value;
    var ph = new_seedform.pH.value;
    var ciclov = new_seedform.ciclov.value;
    var siembra = new_seedform.siembra.value;
    var temp = new_seedform.temperatura.value;
    var ilum = new_seedform.iluminacion.value;
    var humedad = new_seedform.humedad.value;

    var campos = new Array(semilla, especie, genero, clase, familia, orden, siembra);

    var validaLong = true;
    var allValid = true;

    for (i = 0; i < 7; i++) {
        if(campos[i].length < 5){
            validaLong = false;
            break;
        }
    }

    if(!validaLong){
        alert('Los campos: semilla, especie, genero, clase, familia, orden, siembra deben contener al menos 5 caracteres');
        return false;
    }

    for(n = 0; n < campos.length; n++){

        for (i = 0; i < campos[n].length; i++) {

            ch = campos[n].charAt(i);
        
            for (j = 0; j < validos1.length; j++)

                if (ch == validos1.charAt(j))

                    break;


            if (j == validos1.length) {

                allValid = false;
                break;

            }

        }

    }

    if (!allValid) {
        alert('Los campos: semilla, especie, genero, clase, familia, orden y siembra deben contener unicamente letras sin espacios')
        return false;
    }

    if( ph < 0 || ph > 14){
        alert('El PH no puede ser menor a 0 ni mayor a 14');
        return false;
    }

    if( temp < 0 || temp > 45){
        alert('La temperatura no puede ser menor a 0 ni mayor a 45');
        return false;
    }

    if( ilum < 0 || ilum > 20){
        alert('La iluminación no puede ser menor a 0 ni mayor a 20');
        return false;
    }

    if( humedad < 0 || humedad > 20){
        alert('La humedad no puede ser menor a 0 ni mayor a 20');
        return false;
    }

    return true;
}
