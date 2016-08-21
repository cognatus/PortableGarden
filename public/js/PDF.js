//necesitamos darle mayor formato a esto
function PDF() {  
   var doc = new jsPDF();  
   var titulo = document.getElementById("tituloo");
   var texto = document.getElementById("textoo");
   var canvastemp = document.getElementById("canvastemp");
   var canvashum = document.getElementById("canvashum");
   var canvasluz = document.getElementById("canvasluz");
   var ctxtemp = canvastemp.getContext("2d");
   var ctxhum = canvashum.getContext("2d");
   var ctxluz = canvasluz.getContext("2d");
   var img = document.getElementById("tempo");
   var img2 = document.getElementById("humo");
   var img3 = document.getElementById("luzo");
   ctxtemp.drawImage(img, 0, 0);
   ctxhum.drawImage(img2, 10, 10);
   ctxluz.drawImage(img3, 10, 10);
   var imgtem = (canvastemp.toDataURL());
   var imghum = (canvashum.toDataURL());
   var imgluz = (canvasluz.toDataURL());

   doc.text(20, 20, 'TITULO:   ' + titulo.value );
   doc.text(20, 40, texto.value );
   doc.addImage(imgtem, 'JPEG', 0, 100, 200, 133 );
   doc.addPage();
   doc.addImage(imghum, 'JPEG', 0, 133, 200, 133 );
   doc.addImage(imgluz, 'JPEG', 0, 0, 200, 133 );
   doc.save('reporte.pdf');
}