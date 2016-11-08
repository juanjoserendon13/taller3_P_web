$(document).ready(function(){
   var time=0;

  $("#enviar").click(function(){
            $(".resultado").empty();

        getCursos().done(function(data, statusText, xhr){
		if(data!=null){

			$.each(data, function(index, value){
                time+=200;
        var fx =$("<div>",{"class":"fx"});
				var curso = $("<div>",{"class":"curso", "id":"fx"});
				var nombre = $("<span>",{"id":"nombre"}).text(value.nombre);
        var periodo = $("<span>",{"id":"periodo"}).text(value.periodo);
        var ver = $("<a>",{"href":"/curso.html?id="+value.id_curso+"&"+"nombre="+value.nombre+"&"+"periodo="+value.periodo,"id":"verBtn"});
        var ico= $("<iron-icon>",{"id":"icono", "icon":"icons:arrow-forward"});


				curso.append(nombre);
				curso.append(periodo);
        ver.append(ico);
				curso.append(ver);
        fx.append(curso);
				$(".resultado").append(fx);

                //Animacion de los cursos
                 $(".fx").delay(0+time).fadeIn(800,"swing");

			});
        }




	});


  });




});


function getCursos() {
    return $.ajax({
        url: "/servicios/cursos/periodo/"+$("#per").val(),
      type: "get",
        error: function(xhr, statusText, err){
            var error = $("<span>",{"id":"error"}).text(xhr.responseText);
        $(".resultado").append(error);
             $("#error").fadeIn(800,"swing");
    }
    });
  }
