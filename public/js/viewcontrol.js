$(document).ready(function(){
        var win = $(window).width();
        var height = $(window).width();

        $('.time_graficcont').css( 'height' , $('.time_graficcont').width() * 0.70 ); 

        $('#init_logo').click(function(){
          $('.init_container').css('background-color' , '#212121');
          $('.init_container').css('color' , 'rgb(150,150,150)');
        });

        $('#init_pass').focus(function(){
          $('#init_icon2').css('background-image' , 'url("images/password_icon2.png")');
        });

        $('#init_pass').blur(function(){
          $('#init_icon2').css('background-image' , 'url("images/password_icon.png")');
        });

        $('#init_user').focus(function(){
          $('#init_icon1').css('background-image' , 'url("images/user_initicon2.png")');
        });

        $('#init_user').blur(function(){
          $('#init_icon1').css('background-image' , 'url("images/user_initicon.png")');
        });

        $('.messagenew_disp').click(function(){
          $('#new_message').show();
          $('.popup_blockdisplay').animate({left: '0'});
        });

        $('.usernew_disp').click(function(){
          $('#new_user').show();
          $('.popup_blockdisplay').animate({left: '0'});
        });

        $('.reportnew_disp').click(function(){
          $('#new_report').show();
          $('.popup_blockdisplay').animate({left: '0'});
        });

        $('.seedsnew_disp').click(function(){
          $('#new_seed').show();
          $('.popup_blockdisplay').animate({left: '0'});
        });

        $('#change_userpp').click(function(){
          $('#new_profilepicture').show();
          $('.popup_blockdisplay').animate({left: '0'});
        });

        $('#change_userbackground').click(function(){
          $('#new_profileback').show();
          $('.popup_blockdisplay').animate({left: '0'});
        });

        $('.user_icon2').click(function(){
          $('#profilepicture').show();
          $('.popup_blockdisplay').animate({left: '0'});
        });

        $('.usernew_disp, .messagenew_disp, .reportnew_disp, .seedsnew_disp, .user_icon2, #change_userbackground, #change_userpp').click(function(){
          $('body').css('overflow' , 'hidden');
        });

        $('.message_namedisp span').hover(function(){
          $(this).text('Eliminar');
        },
        function(){
          $(this).text('X');
        });

        $('.message_namedisp, .report_namedisp, .user_namedisp, .section_huert').click(function(){
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
        });

        $('.back_button').click(function(){
          var win = $(window).width();
          if(win < 673){
            $(this).css('display', 'none');
            $('#grid_move').animate({left : '0'}, 400);
            $('#grid_move2').animate({left : '0'}, 400);
            $('#grid_move3').animate({left : '0'}, 400);
            $('#grid_move4').animate({left : '0'}, 400);
            $('#grid_move5').animate({left : '0'}, 400);
          }
        });

        $('.messaging_optionmenu').click(function(){
          var userdisp = $('.display_msm');
          var pos = $(this).index();

            userdisp.hide();
            userdisp.eq(pos).show();
        });

        $('#theme').on('change', function(){
          $('#form_theme').submit();
        });

        $('#input_messagepop').click(function(){
          $('.name_spinnercont').slideToggle();
        });

        $('.spinner_item').click(function(){
          var name = $(this).find('span').text();
          $('.name_spinnercont').slideToggle();
          //$('#input_messagepop').val();
          alert(name);
        });

        var color = ['F44336' , 'E91E63' , '9C27B0' , '673AB7' , '3F51B5' , '2196F3' , '03A9F4' , 
          '00BCD4' , '009688' , '4CAF50' , '8BC34A' , 'CDDC39' , 'FFEB3B' , 'FFC107' , 'FF9800' , 
          'FF5722' , '795548' , '607D8B' ];

        $.each( color , function( i , val ){
          $('.color_msmpallete').append('<span style="background-color:#'+ val +'"></span>'); 
        });

        $('.color_msmpallete span').click(function(){
          var colorval = $(this).css('background-color');
          change_color(colorval);
        });

        function change_color(colorval){
          $('span.set_color').css('background-color' , colorval);
          $('#coloresta').val(colorval); 
        }

        var tiempo = new Date();
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
 
        $('.notification_title').click(function(){
              $('.notification_title').siblings('.notif_infocontainer').slideUp();
              $(this).siblings('.notif_infocontainer').slideDown();
            });

        $('.user_namedisp span').hover(function(){
          $(this).text('Eliminar');
        },
        function(){
          $(this).text('X');
        });

        if( $(window).width() > 672 ){
          $('.blockpage_container').css('height' , $(window).outerHeight() - 64 + 'px');  
        }
        else if ($(window).width() <= 672){
          $('.blockpage_container').css('height' , $(window).outerHeight() - 60 + 'px');
        }

        if( $(window).width() < 410 ){
          $('#app_title').show()
          $('#app_title').text('PG');  
        }

        if( $(window).width() > 672 ){
          $('.messagenamedisp_container').css('height' , $(window).outerHeight() - 192 + 'px');
          $('div.message_cont').css('height' , $(window).outerHeight() - 308 + 'px');
          $('div.report_cont').css('height' , $(window).outerHeight() - 394 + 'px');
          $('.reportnamedisp_container').css('height' , $(window).outerHeight() - 228 + 'px');
          $('.usernamedisp_container').css('height' , $(window).outerHeight() - 245 + 'px');
        }

        $('.close_grid span').click(function(){
          $('.popup_blockdisplay').animate({ left: - ($('.popup_blockdisplay').width() + 24)}, 500, function(){
             window.location.replace( window.location.href );
          });
        });

        $('.alert_submitcontainer .but2').click(function(){
          $('#alert_message').fadeOut(500);
          $('body').css('overflow' , 'auto');
        });

        $('#display_menu').click(function(){
          var win = $(window).width();
          $('.back_menu').css('display' , 'block');
          $('.menu_block').animate({left: '0'}, 500);
          if( win > 1080){
            $('.menu_block').css('left' , '0');
          }
        });

        $('#close_menu').click(function(){
          var win = $(window).width();
          $('.back_menu').css('display' , 'none');
          $('.menu_block').animate({left: '-280px'}, 500);
          if( win > 1080){
            $('.menu_block').css('left' , '0');
          }
        });

        /*$('.report_namedisp span').hover(function(){
          $(this).text('Eliminar');
        },
        function(){
          $(this).text('X');
        });*/

        $('.report_namedisp span').click(function(){
          $('#alert_message').show();
          $('popup_blockdisplay').animate({left: 0});
        });

        $('.message_namedisp span').click(function(){
          $('#alert_message').show();
          $('popup_blockdisplay').animate({left: 0});
        });

        $('.user_namedisp span').click(function(){
          $('#alert_message').show();
          $('popup_blockdisplay').animate({left: 0});
        });

        $('.seeds_datstitledown span').click(function(){
          $('#alert_message').show();
          $('popup_blockdisplay').animate({left: 0});
        });

        $('.settings_option').click(function(){
          $('.settings_option').siblings('.settings_optionouter').slideUp();
          $(this).siblings('.settings_optionouter').slideDown();
        });

        $('.seeds_datstitledown span').hover(function(){
          $(this).text('Eliminar');
        },
        function(){
          $(this).text('X');
        });

        $('html').click(function() {
           $('.minimenu_in').slideUp();
           $('.notifications_hiddenblock').slideUp();
        });

        $('.minimenu, .minimenu_in').click(function(event){
           event.stopPropagation();
        });

        $('#bell_icon, .notifications_hiddenblock').click(function(event){
           event.stopPropagation();
        });

        $('#bell_icon').click(function(){
          $('.notifications_hiddenblock').slideDown();
        });

        $('.minimenu').click(function(){
            $('.minimenu_in').slideDown();
        });

        $('.userinfo_menuoption').click(function(){
          var userdisp = $('.userinfo_section');
          var pos = $(this).index();

            userdisp.hide();
            userdisp.eq(pos).show();
          
        });

        /*$(window).resize(function(e) {
            window.location.replace( window.location.href );
        });*/

        $('.underupload span').click(function(){
          $(this).parent().siblings('input[type="file"]').trigger('click');         
        });

        $('input[type="file"]').on('change', function(){
          $(this).siblings('.underupload').children('div').text($(this).val());
        });

        //$("#message_cont").animate({ scrollTop: $("div.msm_supercont").height() }, 1000);
        

        $('#msm_submit').click(function(){
          var top = $("#message_cont").scrollTop();
          var sh = $("#message_cont")[0].scrollHeight;
          var gg = sh - top;

          if( gg == $('#message_cont').outerHeight() ){
            $("#message_cont").animate({ scrollTop: $("#message_cont")[0].scrollHeight }, 1000);
          }
          
        });

        $('.editable-scrollbar').mCustomScrollbar({
              theme:'minimal-dark',
        });
});