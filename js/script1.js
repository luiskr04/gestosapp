var app = {
	inicio: function(){

		this.iniciaBotones();
		this.iniciarFastClick();
		this.iniciarHammer();
	},

	iniciarFastClick: function(){
		FastClick.attach(document.body);
	},

	iniciaBotones: function(){

		var btnclaro = document.querySelector("#claro");
		var btnoscuro = document.querySelector("#oscuro");

		btnclaro.addEventListener("click", this.ponloClaro, false);
		btnoscuro.addEventListener("click", this.ponloOscuro, false);
	},

	iniciarHammer: function(){
		var zona = document.getElementById('zona-gestos');
		var hammertime = new Hammer(zona);

		//habilitar pinch y rotate porque no se inician por defecto
		hammertime.get('pinch').set({enable: true});
		hammertime.get('rotate').set({enable:true});

		//validar en webkit
		zona.addEventListener('webkitAnimationEnd', function(e){
			zona.className = '';
		});

		//ejecutar animacion doubletap
		hammertime.on('doubletap', function(ev){
			zona.className = 'doubletap';
		});

		//ejecutar animacion press
		hammertime.on('press', function(ev){
			zona.className = 'press';
		});

		//ejecutar animacion swipe 
		hammertime.on('swipe', function(ev){
			var clase = undefined;
			direccion = ev.direction;

			if(direccion == 4)
				clase = 'swipe-derecha';
			if(direccion == 2)
				clase = 'swipe-izquierda';

			zona.className = clase;
		});

		//ejecutar animacion rotate
		hammertime.on('rotate', function(ev){
			var umbra1 = 25;

			if(ev.distance > umbra1)
			{
				zona.className = 'rotate';
			}
		});


		}, 

	ponloClaro: function(){
		document.body.className = "claro";
	},

	ponloOscuro: function(){
		document.body.className = "oscuro";
	},
};

//Validacion de que existe fastclick
if('addEventListener' in document){
	document.addEventListener('DOMContentLoaded', function(){
		app.inicio();
	}, false);
}

