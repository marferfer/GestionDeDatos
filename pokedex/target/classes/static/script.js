var images = new Array();

//Allow for vendor prefixes.
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

//Check for support.
if (window.requestFileSystem) {
	//console.log("Si lo permite");
	// FileSystem Supported
} else {
	//console.log("No lo permite");
  // FileSystem Not Supported
}

//Start the app by requesting a FileSystem (if the browser supports the API)
if (window.requestFileSystem) {
  initFileSystem();
} else {
  alert('Sorry! Your browser doesn\'t support the FileSystem API :(');
}

//Se cargan todas las imagenes antes de crear el canvas
function preload() {
    var latch = preload.arguments.length
    for (i = 0; i < preload.arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
        images[i].onload = function() {
            latch--;
            if(latch <= 0) {
                startPokedex();
            }
        }
    }
}

function load(){
	var latch = load.arguments.length
    for (i = 0; i < load.arguments.length; i++) {
        images[i] = new Image();
        images[i].src = load.arguments[i];
        images[i].onload = function() {
            latch--;
            if(latch <= 0) {
                startPokedex();
            }
        }
    }
}


preload(
    "img/interfaz.png", //..........................0
    "img/pokeball_izq.png", //______________________1
    "img/pokeball_der.png", //......................2
    "img/Fondo.png", //_____________________________3
    "img/Pokedex.png", //...........................4
    "img/PokedexHover.png", //______________________5
    "img/Add.png", //...............................6
    "img/AddHover.png", //__________________________7
    "img/XML.png", //...............................8
    "img/XMLHover.png", //__________________________9
    "img/arrow.png", //............................10
    "img/arrowHover.png", //_______________________11
    "img/arrowIzq.png", //.........................12
    "img/arrowHoverIzq.png", //____________________13
    "img/listaPokemon/FondoNaranja.png", //........14
    "img/listaPokemon/atras.png", //_______________15
    "img/listaPokemon/atrasHover.png", //..........16
    "img/Config.png", //___________________________17
    "img/ConfigHover.png", //......................18
    "img/Creditos.png", //_________________________19
    "img/CreditosHover.png", //....................20
    "img/creditos/FondoVerde.png", //______________21
    "img/creditos/atras.png", //...................22
    "img/creditos/atrasHover.png", //______________23
    "img/creditos/creditos.png", //................24
    "img/BDD/FondoMorado.png", //__________________25
    "img/BDD/atras.png", //........................26
    "img/BDD/atrasHover.png", //___________________27
    "img/Tema.png", //.............................28
    "img/TemaHover.png", //________________________29
    "img/BDD/mongodbSelected.png", //..............30
    "img/Fondobtn.png", //_________________________31
    "img/FondobtnHover.png", //....................32
    "img/BDD/sqliteSelected.png", //_______________33
    "img/Anyadir/anyadirImg.png", //...............34
    "img/Anyadir/anyadirImgHover.png", //__________35
    "img/Anyadir/tipos.png", //....................36
    "img/Anyadir/tiposHover.png", //_______________37
    "img/Anyadir/campos.png", //...................38
    "img/Anyadir/camposHover.png", //______________39
    "img/Anyadir/camposPequenyos.png", //..........40
    "img/Anyadir/camposPequenyosHover.png", //_____41
    "img/search.png", //...........................42
    "img/search_hover.png", //_____________________43
    "img/Anyadir/showImg.png", //..................44
    "img/Anyadir/showImgHover.png", //_____________45
    "img/btnGuardarPokemon.png", //................46
    "img/btnGuardarPokemon_hover.png", //__________47
    "img/TemaClasico.png", //......................48
    "img/TemaClasicoHover.png", //_________________49
    "img/TemaClasicoSel.png", //...................50
    "img/TemaLucario.png", //______________________51
    "img/TemaLucarioHover.png", //.................52
    "img/TemaLucarioSel.png", //___________________53
    "img/FondoMini.png", //........................54
    "img/FondoMiniHover.png", //___________________55
    "img/FondoAbraMini.png", //....................56
    "img/FondoAbraMiniHover.png", //_______________57
    "img/FondoArticunoMini.png", //................58
    "img/FondoArticunoMiniHover.png", //___________59
    "img/FondoAshMini.png", //.....................60
    "img/FondoAshMiniHover.png", //________________61
    "img/FondoDarkMini.png", //....................62
    "img/FondoDarkMiniHover.png", //_______________63
    "img/FondoEeveeMini.png", //...................64
    "img/FondoEeveeMiniHover.png", //______________65
    "img/FondoGhostMini.png", //...................66
    "img/FondoGhostMiniHover.png", //______________67
    "img/FondoGrassMini.png", //...................58
    "img/FondoGrassMiniHover.png", //______________69
    "img/FondoMoltresMini.png", //.................70
    "img/FondoMoltresMiniHover.png", //____________71
    "img/FondoTourneyMini.png", //.................72
    "img/FondoTourneyMiniHover.png", //____________73
    "img/FondoZapdosMini.png", //..................74
    "img/FondoZapdosMiniHover.png" //______________75
);

//Variables globales
var globalGroup; //grupo por defecto para todos los objetos sin un grupo específico
var pokeball_izq;
var pokeball_der;
var background;
var listaPokemon;
var addPoke;
var xmlDownload;
var menuItems; //grupo de los botones del main menu
var pokegroup_izq;
var pokegroup_der;
var arrowIzq;
var arrowDer;
var btnAtras;
var btnArrowL;
var btnArrowR;
var btnAddFoto;
var btnFoto;
var btnTipos;
var btnCampos;
var btnCamposPequenyos;
var config;
var creditos;
var creditosTexto;
var pokemonElegido;
var pokE;
var btnSearch;
var btnGuardarPokemon;

var theme;
var backgroundBtn;
var temaClasico;
var temaLucario;
var fondoNormal;
var fondoAbra;
var fondoArticuno;
var fondoAsh;
var fondoDark;
var fondoEevee;
var fondoGhost;
var fondoGrass;
var fondoMoltres;
var fondoTourney;
var fondoZapdos;

var masfotos;
var imgCont = 0;
var noFotoDer;
var noFotoIz;

//Locks and Flags
var inAnimation = false;
var canShowList = false;
var canShowPokemon = false;
var canShowLectores = false;

//Estados/menus de la pokedex
var mainMenu;
var listMenu;
var addMenu;
var configMenu;
var showPokemon;
var creditsMenu;
var themeMenu;
var backgroundMenu;
var pokeState; //Estado/menu actual de la pokedex
var nextPokeState; //Siguiente estado de la pokedex

//sonidos
var sonido_abrirDesplegable;
var sonido_eliminarPokemon;
var sonido_guardandoPokemon;
var sonido_exitoGuardar;
var sonido_falloGuardar;
var sonido_mostrarPokemon;
var sonido_popup;
var sonido_presionarBoton;

//inicialización de variables
function startPokedex() {
    globalGroup = new Group(0, 0);
    pokegroup_izq = new Group(15, 200);
    pokegroup_der = new Group(1075, 200);
    fondosGroup = new Group(380, 620);
    menuItems = new Group(20, 0);
    pokeball_izq = new Pokeball(0, 0, images[1], "right", pokegroup_izq); //Se posiciona a la izquierda pero mira hacia la derecha
    pokeball_der = new Pokeball(0, 0, images[2], "left", pokegroup_der); //Se posiciona a la derecha pero mira a la izquierda
    background = new Background();
    listaPokemon = new Button(300, 400, images[4], images[5], 235, 251, menuItems);
    addPoke = new Button(550, 400, images[6], images[7], 235, 251, menuItems);
    xmlDownload = new Button(800, 400, images[8], images[9], 235, 251, menuItems);
    config = new Button(1050, 400, images[17], images[18], 235, 251, menuItems);
    creditos = new Button(1300, 400, images[19], images[20], 235, 251, menuItems);
    arrowDer = new ArrowButton(30, 275, images[10], images[11], 49, 50, pokegroup_der);
    arrowIzq = new ArrowButton(226, 275, images[12], images[13], 49, 50, pokegroup_izq);
    btnAtras = new Button(315, 270, images[15], images[16], 76, 48, globalGroup);
    btnAddFoto = new Button(415, 300, images[34], images[35], 182, 182, globalGroup);
    btnFoto = new Button(415, 300, images[44], images[45], 182, 182, globalGroup);
    btnTipos = new Button(365, 500, images[36], images[37], 132, 60, globalGroup);
    btnTipos1 = new Button(500, 500, images[36], images[37], 132, 60, globalGroup);
    btnSearch = new Button(855, 372, images[42], images[43], 217, 40, globalGroup);
    btnGuardarPokemon = new Button(615, 686, images[46], images[47], 160, 55, globalGroup);
    
    temaClasico = new selectButton(470, 300, images[48], images[49], images[50], 443, 197, globalGroup, true);
    temaLucario = new selectButton(470, 520, images[51], images[52], images[53], 443, 197, globalGroup, false);
    
    fondoNormal = new selectButton(0, 0, images[54], images[55], images[55], 97, 65, fondosGroup, true);
    fondoAbra = new selectButton(100, 0, images[56], images[57], images[57], 97, 65, fondosGroup, false);
    fondoArticuno = new selectButton(200, 0, images[58], images[59], images[59], 97, 65, fondosGroup, false);
    fondoAsh = new selectButton(300, 0, images[60], images[61], images[61], 97, 65, fondosGroup, false);
    fondoDark = new selectButton(400, 0, images[62], images[63], images[63], 97, 65, fondosGroup, false);
    fondoEevee = new selectButton(500, 0, images[64], images[65], images[65], 97, 65, fondosGroup, false);
    fondoGhost = new selectButton(600, 0, images[66], images[67], images[67], 97, 65, fondosGroup, false);
    fondoGrass = new selectButton(700, 0, images[68], images[69], images[69], 97, 65, fondosGroup, false);
    fondoMoltres = new selectButton(800, 0, images[70], images[71], images[71], 97, 65, fondosGroup, false);
    fondoTourney = new selectButton(900, 0, images[72], images[73], images[73], 97, 65, fondosGroup, false);
    fondoZapdos = new selectButton(1000, 0, images[74], images[75], images[75], 97, 65, fondosGroup, false);
    
    btnCampos = new Button(655, 300, images[38], images[39], 360, 90, globalGroup); 
    btnCamposPeso = new Button(670, 350, images[40], images[41], 150, 125, globalGroup);
    btnCamposNat = new Button(830, 350, images[40], images[41], 150, 125, globalGroup);
    btnCamposAta = new Button(670, 410, images[40], images[41], 150, 125, globalGroup);
    btnCamposAtaEsp = new Button(830, 410, images[40], images[41], 150, 125, globalGroup);
    btnCamposDef = new Button(670, 470, images[40], images[41], 150, 125, globalGroup);
    btnCamposDefEsp = new Button(830, 470, images[40], images[41], 150, 125, globalGroup);
    btnCamposVel = new Button(670, 530, images[40], images[41], 150, 125, globalGroup);
    btnCamposHP = new Button(830, 530, images[40], images[41], 150, 125, globalGroup);
    btnCamposMov1 = new Button(330, 535, images[40], images[41], 150, 125, globalGroup);
    btnCamposMov2 = new Button(480, 535, images[40], images[41], 150, 125, globalGroup);
    btnCamposMov3 = new Button(330, 595, images[40], images[41], 150, 125, globalGroup);
    btnCamposMov4 = new Button(480, 595, images[40], images[41], 150, 125, globalGroup);
    btnCamposItem = new Button(670, 600, images[38], images[39], 360, 90, globalGroup);
    btnCamposGeneracion = new Button(830, 600, images[40], images[41], 150, 25, globalGroup);
    btnCamposLegendario = new Button(670, 600, images[40], images[41], 150, 25, globalGroup);
    
    btnArrowR = new Button(600, 365, images[10], images[11], 49, 50, globalGroup);
    btnArrowL = new Button(360, 365, images[12], images[13], 49, 50, globalGroup);

    btnAnyadir = new Button(630, 680, images[36], images[37], 132, 60, globalGroup);
    theme = new Button(440, 400, images[28], images[29], 235, 251, globalGroup);
    backgroundBtn = new Button(740, 400, images[31], images[32], 231, 251, globalGroup);
    creditosTexto = new Decoration(400, 230, images[24], globalGroup);
    
    sonido_abrirDesplegable = new Sound("/sounds/sonido_abrirDesplegable.wav");
    sonido_eliminarPokemon = new Sound("/sounds/sonido_eliminarPokemon.wav");
    sonido_guardandoPokemon = new Sound("/sounds/sonido_guardandoPokemon.wav");
    sonido_exitoGuardar = new Sound("/sounds/sonido_exitoGuardar.wav");
    sonido_falloGuardar = new Sound("/sounds/sonido_falloGuardar.wav");
    sonido_mostrarPokemon = new Sound("/sounds/sonido_mostrarPokemon.wav");
    sonido_popup = new Sound("/sounds/sonido_popup.wav");
    sonido_presionarBoton = new Sound("/sounds/sonido_presionarBoton.wav");
    
    mainMenu = new State("mainMenu", images[3]);
    listMenu = new State("listMenu", images[3], mainMenu);
    addMenu = new State("addMenu", images[3], mainMenu);
    configMenu = new State("configMenu", images[3], mainMenu);
    creditsMenu = new State("creditsMenu", images[3], mainMenu);
    showPokemon = new State("showPokemon", images[3], mainMenu);
    themeMenu = new State("themeMenu", images[3], configMenu);
    backgroundMenu = new State("backgroundMenu", images[3], configMenu);
    pokeState = mainMenu;
    nextPokeState = mainMenu;
    pokedex.start();

    //Comienza con la pokeball cerrada
    pokeball_izq.cycleDone = false;
    pokeball_der.cycleDone = false;
    inAnimation = true;
    pokegroup_izq.x = 398;
    pokegroup_der.x = 692;    
    
    
    
}

//Gestion del canvas
var pokedex = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1400;
        this.canvas.height = 900;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updatePokedex, 20);
        window.addEventListener('mousemove', function (e) {
            pokedex.mouseX = e.pageX;
            pokedex.mouseY = e.pageY;
        });
        window.addEventListener('click', function(e) {
            pokedex.clickX = e.pageX;
            pokedex.clickY = e.pageY;

            if (!inAnimation && pokedex.clickX > 322 && pokedex.clickX < 1090) {
                //Dependiendo del estado/menu actual de la pokedex se comprobarán las funciones onclick de unos botones u otros
                if (pokeState.name === "mainMenu") {
                    //ListaPokemon onClick
                    if (pokedex.clickX > listaPokemon.x + listaPokemon.group.x && pokedex.clickX < listaPokemon.x + listaPokemon.group.x + listaPokemon.width && pokedex.clickY > listaPokemon.y + listaPokemon.group.y && pokedex.clickY < listaPokemon.y + listaPokemon.group.y + listaPokemon.height) {
                    	//sonido
                    	sonido_presionarBoton.play();
                    	
                    	pokeball_izq.cycleDone = false;
                        pokeball_der.cycleDone = false;
                        inAnimation = true;
                        nextPokeState = listMenu;
                        var order = {
                        		orden: "ascendente",
                        		generacion: [],
                        		tipo: [],
                        		legendario: document.getElementById("c26").checked 
                        }
                        loadPokemon(JSON.stringify(order), function(pokemons) {
                        	var lista = document.getElementById("listaPokemon");
                            lista.innerHTML = "";
                        	for (var p in pokemons) {
                        		$('#listaPokemon').append(
                        				'<div id="' + pokemons[p].split("-")[0] + '" class="imgLista">' +
                        				  '<img class="marcador" style="cursor:pointer" src="img/pokeListMark.gif"/>' +
                        				  '<span class="under">' + pokemons[p].split("-")[1] + '</span>' +
                        				'</div>' + 
                      				  '<div style="float:right;cursor:pointer;" id="'+ pokemons[p].split("-")[0] + ' "class = "imgListaBorrador"><img class="borrador" src="img/pokeListDelete.png"/>');
                        	}
                        	
                        	//Borrado del pokemon en la lista de pokemons
                        	$('.imgListaBorrador').click(function(){
                        		
                        		//sonido
                        		sonido_presionarBoton.play();
                        		sonido_popup.play();
                        		
                        		var id = $(this).attr('id');
                        		
                        	    swal({
                        	    	  title: "¿Seguro que desea eliminar a este Pokemon?",
                        	    	  text: "Una vez borrado no es posible recuperarlo",
                        	    	  buttons: true,
                        	    	  dangerMode: true,
                        	    	})
                        	    	.then((willDelete) => {
                        	    	  if (willDelete) {
                        	    		  
                        	    		//sonido
                        	    		sonido_eliminarPokemon.play();
                        	    		  
                        	    		$("div").remove("#"+id);
                                  		$(this).remove();
                                  		deleteItem(id);
                                  		
                        	    	    swal("Pokemon eliminado", {
                        	    	      icon: "success",
                        	    	      dangerMode: true,
                        	    	      timer:1200,
                        	    	      buttons: false,
                        	    	    }); 
                        	    	  }else{
                        	    		  //sonido
                        	    		  sonido_presionarBoton.play();
                        	    	  }
                        	    	});
                        	})
                        });
                        
                    }
                    //AddPoke onClick
                    if (pokedex.clickX > addPoke.x + addPoke.group.x && pokedex.clickX < addPoke.x + addPoke.group.x + addPoke.width && pokedex.clickY > addPoke.y + addPoke.group.y && pokedex.clickY < addPoke.y + addPoke.group.y + addPoke.height) {
                        pokeball_izq.cycleDone = false;
                        pokeball_der.cycleDone = false;
                        inAnimation = true;
                        nextPokeState = addMenu;
                        
                        //sonido
                        sonido_presionarBoton.play();
                    }
                    //XML Download onClick
                    else if (pokedex.clickX > xmlDownload.x + xmlDownload.group.x && pokedex.clickX < xmlDownload.x + xmlDownload.group.x + xmlDownload.width && pokedex.clickY > xmlDownload.y + xmlDownload.group.y && pokedex.clickY < xmlDownload.y + xmlDownload.group.y + xmlDownload.height) {
                        download("prueba.xml","¡Capturalos a todos!");
                      
                        //sonido
                        sonido_presionarBoton.play();
                    }
                    //BDD onClick
                    if (pokedex.clickX > config.x + config.group.x && pokedex.clickX < config.x + config.group.x + config.width && pokedex.clickY > config.y + config.group.y && pokedex.clickY < config.y + config.group.y + config.height) {
                        pokeball_izq.cycleDone = false;
                        pokeball_der.cycleDone = false;
                        inAnimation = true;
                        nextPokeState = configMenu;
                        sonido_presionarBoton.play();
                      //sonido
                    }
                    //Creditos onClick
                    if (pokedex.clickX > creditos.x + creditos.group.x && pokedex.clickX < creditos.x + creditos.group.x + creditos.width && pokedex.clickY > creditos.y + creditos.group.y && pokedex.clickY < creditos.y + creditos.group.y + creditos.height) {
                        pokeball_izq.cycleDone = false;
                        pokeball_der.cycleDone = false;
                        inAnimation = true;
                        nextPokeState = creditsMenu;
                        
                      //sonido
                        sonido_presionarBoton.play();
                    }
                }
                //El main menu va aparte
                else {
                    if (pokedex.clickX > btnAtras.x + btnAtras.group.x && pokedex.clickX < btnAtras.x + btnAtras.group.x + btnAtras.width && pokedex.clickY > btnAtras.y + btnAtras.group.y && pokedex.clickY < btnAtras.y + btnAtras.group.y + btnAtras.height) {
                        pokeball_izq.cycleDone = false;
                        pokeball_der.cycleDone = false;
                        inAnimation = true;
                        nextPokeState = pokeState.father;
                        
                      //sonido
                        sonido_presionarBoton.play();
                        
                        document.getElementById("listaPokemon").style.visibility = "hidden";
                        document.getElementById("multiselect").style.visibility = "hidden";
                        document.getElementById("ordenLista").style.visibility = "hidden";
                        canShowList = false;
                        
                        document.getElementById("lectorAtributos").style.visibility = 'hidden';
                        
                        canShowLector = false;
                    }
                    switch (pokeState.name) {
                        case "listMenu":
                        	$('.imgLista').click(function() {
                        		
                        		//sonido
                                sonido_mostrarPokemon.play();
                        		
                        		var id = $(this).attr('id');
                        		pokemonElegido = id;
                        		loadPokemon(pokemonElegido,function(pokemonE){
                            		var p=JSON.parse(pokemonE);
                            		pokE = p;
                            		document.getElementById("nameP").innerHTML = p.name;
                            		
                            		if(p.type1 != null){
                            			document.getElementById("tipoP").innerHTML = p.type1;
                            		}else{
                            			document.getElementById("tipoP").innerHTML = '';
                            		}
                            		
                            		if(p.type2 != null){
                            			document.getElementById("tipo1P").innerHTML = p.type2;
                            		}else{
                            			document.getElementById("tipo1P").innerHTML = '';
                            		}
                            		if(p.abilities[0] != null){
                            			document.getElementById("mov1P").innerHTML = p.abilities[0];
                            		}else{
                            			document.getElementById("mov1P").innerHTML = '';
                            		}
                            		if(p.abilities[1] != null){
                            			document.getElementById("mov2P").innerHTML = p.abilities[1];
                            		}else{
                            			document.getElementById("mov2P").innerHTML = '';
                            		}
                            		if(p.abilities[2] != null){
                            			document.getElementById("mov3P").innerHTML = p.abilities[2];
                            		}else{
                            			document.getElementById("mov3P").innerHTML = '';
                            		}
                            		if(p.abilities[3] != null){
                            			document.getElementById("mov4P").innerHTML = p.abilities[3];
                            		}else{
                            			document.getElementById("mov4P").innerHTML = '';
                            		}
                            		if(p.classfication != null){
                            			document.getElementById("itemP").innerHTML = p.classfication;
                            		}else{
                            			document.getElementById("itemP").innerHTML = '';
                            		}
                            		
                            		if(p.photos[imgCont] != undefined){
	                            		var foto = p.photos[imgCont].split("/");
	                            		var num = foto[2].split(".");
	                            		
	                            		if(parseInt(num[0]) < 721){
	                            			
	                            			document.getElementById("photosP").src = p.photos[imgCont];
	                            		}else{
	                            			document.getElementById("photosP").src = "img/pokeball_mini.png";
	                            		}
                            		}else{
                    	    			document.getElementById("photosP").src = "img/pokeball_mini.png";
                    	    		}
                            		
                            		document.getElementById("vidaP").innerHTML = "PS: "+p.hp;
                            		document.getElementById("velP").innerHTML = "Sp: "+p.speed;
                            		document.getElementById("pesoP").innerHTML = "Kg: "+p.weight_kg;
                            		document.getElementById("ataP").innerHTML = "At: "+p.attack;
                            		document.getElementById("ataEP").innerHTML = "At.E: "+p.sp_attack;
                            		document.getElementById("defP").innerHTML = "Def: "+p.defense;
                            		document.getElementById("defEP").innerHTML = "Def.E: "+p.sp_defense;
                            		document.getElementById("alturaP").innerHTML = "Alt: "+p.height_m;
                            		document.getElementById("itemP").innerHTML = "Class: "+p.classfication;
                            		
                            	});
                        		pokeball_izq.cycleDone = false;
                                pokeball_der.cycleDone = false;
                                inAnimation = true;
                                //Cambio a visualizar pokemon
                                nextPokeState = showPokemon;
                                document.getElementById("listaPokemon").style.visibility = "hidden";
                                document.getElementById("multiselect").style.visibility = "hidden";
                                document.getElementById("ordenLista").style.visibility = "hidden";
                        	});
                        	if (pokedex.clickX > btnSearch.x + btnSearch.group.x && pokedex.clickX < btnSearch.x + btnSearch.group.x + btnSearch.width && pokedex.clickY > btnSearch.y + btnSearch.group.y && pokedex.clickY < btnSearch.y + btnSearch.group.y + btnSearch.height) {
                        		
                        		//sonido
                                sonido_presionarBoton.play();
                        		
                        		var elem = document.getElementById("orden");
                        		var ordenLista = elem.options[elem.selectedIndex].text;
                        		var gen = [];
                        		for (var i = 1; i < 8; i++) {
                        			elem = document.getElementById("c"+i);
                        			if (elem.checked) {
                        				gen.push(i);
                        			}
                        		}
                        		var type = [];
                        		for (var i = 8; i < 26; i++) {
                        			elem = document.getElementById("c"+i);
                        			if (elem.checked) {
                        				type.push(elem.parentElement.innerHTML.split(">")[1]);
                        			}
                        		}
                        		var order = {
                                		orden: ordenLista,
                                		generacion: gen,
                                		tipo: type,
                                		legendario: document.getElementById("c26").checked
                                }
                                loadPokemon(JSON.stringify(order), function(pokemons) {
                                	var lista = document.getElementById("listaPokemon");
                                    lista.innerHTML = "";
                                	for (var p in pokemons) {
                                		$('#listaPokemon').append(
                                				'<div id="' + pokemons[p].split("-")[0] + '" class="imgLista">' +
                                				  '<img class="marcador" src="img/pokeListMark.gif"/>' +
                                				  '<span class="under">' + pokemons[p].split("-")[1] + '</span>' +
                                				'</div>' + 
                                				'<div style="float:right;" id="'+ pokemons[p].split("-")[0] + ' "class = "imgListaBorrador"><img class="borrador" src="img/pokeListDelete.png"/>');
                                	}
                                	
                                	//Borrado del pokemon en la lista de pokemons
                                	$('.imgListaBorrador').click(function(){
                                		
                                		//sonido
                                        sonido_presionarBoton.play();
                                        sonido_popup.play();
                                        
                                		var id = $(this).attr('id');
                                		
                                	    swal({
                                	    	  title: "¿Seguro que desea eliminar a este Pokemon?",
                                	    	  text: "Una vez borrado no es posible recuperarlo",
                                	    	  buttons: true,
                                	    	  dangerMode: true,
                                	    	})
                                	    	.then((willDelete) => {
                                	    	  if (willDelete) {
                                	    		
                                	    		//sonido
                                                sonido_eliminarPokemon.play();
                                	    		  
                                	    		$("div").remove("#"+id);
                                          		$(this).remove();
                                          		deleteItem(id);
                                          		
                                	    	    swal("Pokemon eliminado", {
                                	    	      icon: "success",
                                	    	      dangerMode: true,
                                	    	      timer:1200,
                                	    	      buttons: false,
                                	    	    });
                                	    	  }else{
                                	    		//sonido
                                                sonido_presionarBoton.play();
                                	    	  }
                                	    	});
                                	})
                                });                                
                            }
                            break;
                            
                        case "addMenu":
                            
                        	//variables para comprobar si el formato del pokemon es adecuado
                    		let tiposValidos = ["normal", "fire", "water", "grass", "electric", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"];
                    		let numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
                    		let respuestas = ["si", "sí", "Si", "Sí", "SI", "SÍ", "sI", "sÍ", "no", "No", "NO", "nO"];
                    		let tipoCorrecto;
                    		let valoresNumericosCorrectos;
                    		let nombreCorrecto;
                    		let legendarioCorrecto;
                    		let sePuedeGuardar;
                    		let mensajeError;
                    		
                    		document.getElementById("imgAdd").style.visibility = "visible";

                        	//click btnGuardarPokemon
                        	if (pokedex.clickX > btnGuardarPokemon.x + btnGuardarPokemon.group.x && pokedex.clickX < btnGuardarPokemon.x + btnGuardarPokemon.group.x + btnGuardarPokemon.width && pokedex.clickY > btnGuardarPokemon.y + btnGuardarPokemon.group.y && pokedex.clickY < btnGuardarPokemon.y + btnGuardarPokemon.group.y + btnGuardarPokemon.height) {
                        		
                        		//sonido
                                sonido_presionarBoton.play();
                        		
                        		// inicializamos las variables de verificacion y recogemos los datos para evaluarlos
                        		sePuedeGuardar = false;
                        		tipoCorrecto = false;
                        		valoresNumericosCorrectos = false;
                        		nombreCorrecto = true;				//es mas facil comprobar que es incorrecto a que es correcto
                        		legendarioCorrecto = true;			//es mas facil comprobar que es incorrecto a que es correcto
                        		
                        		
                        		let name = document.getElementById("lectorNameP").value;
                        		let tipo = document.getElementById("lectorTipoP").value;
                        		let tipo1 = document.getElementById("lectorTipo1P").value;
                        		let mov1 = document.getElementById("lectormov1P").value;
                        		let mov2 = document.getElementById("lectormov2P").value;
                        		let mov3 = document.getElementById("lectormov3P").value;
                        		let mov4 = document.getElementById("lectormov4P").value;
                        		let vida = document.getElementById("lectorVidaP").value;
                        		let vel = document.getElementById("lectorVelP").value;
                        		let ataque = document.getElementById("lectorAtaqueP").value;
                        		let defensa = document.getElementById("lectorDefensaP").value;
                        		let ataqueEsp = document.getElementById("lectorAtaqueEspP").value;
                        		let defensaEsp = document.getElementById("lectorDefensaEspP").value;
                        		let peso = document.getElementById("lectorPesoP").value;
                        		let altura = document.getElementById("lectorAlturaP").value;
                        		let generacion = document.getElementById("lectorGeneracionP").value;
                        		let legendario = document.getElementById("lectorLegendarioP").value;
                        		
                        		vida = parseInt(vida);
                        		vel = parseInt(vel);
                        		ataque = parseInt(ataque);
                        		defensa = parseInt(defensa);
                        		ataqueEsp = parseInt(ataqueEsp);
                        		defensaEsp = parseInt(defensaEsp);
                        		peso = parseFloat(peso);
                        		altura = parseFloat(altura);
                        		generacion = parseInt(generacion);                       		
                        		name = name.charAt(0).toUpperCase() + name.slice(1);	//ponemos la inicial del pokemon en mayusculas
                        		
                        		//sonido
                        		sonido_popup.play();
                        		
                        		//confirm para agregar o no al pokemon
                        		swal({
                        			
                      	    	  title: "¿Quiere añadir un pokemon con los campos descritos?",
                      	    	  buttons: true,
                      	    	  dangerMode: true,
                      	    	  
                      	    	}).then((willSave) => {
                      	    	  if (willSave) {
                      	    		
                      	    		//"pantalla de carga" mientras se realizan las comprobaciones
                      	    		
                      	    		//si mete dos tipos los dos deben ser validos y si mete solo un tipo este debe ser valido
                      	    		if ( ((tiposValidos.indexOf( tipo ) > -1) && (tiposValidos.indexOf(tipo1) > -1)) || ((tiposValidos.indexOf( tipo ) > -1) && (tipo1 == "")) ) {
                            			tipoCorrecto = true;
                            		}else{
                            			mensajeError = "El tipo/s del pokemon no es valido. Debe introducir uno o dos valores pertenecientes a esta lista: [" + tiposValidos + "]";
                            		}
                      	    		
                      	    		//comprobamos si los valores numericos son efectivamente numeros
                      	    		if(!isNaN(vida) && !isNaN(vel) && !isNaN(ataque) && !isNaN(defensa) && !isNaN(ataqueEsp) && !isNaN(defensaEsp) && !isNaN(peso) && !isNaN(altura) && !isNaN(generacion)){
                      	    			valoresNumericosCorrectos = true;
                      	    		}else{
                      	    			mensajeError = "Los valores 'PS', 'velocidad', 'ataque', 'defensa', 'ataqueEsp', 'defensaEsp', 'peso', 'altura' y 'generacion' deben ser números";
                      	    		}
                      	    		
                      	    		//comprobamos que el nombre tenga un limite de caracteres y no contiene numeros
                      	    		if(name.length <= 12 && name.length > 0){
                      	    			
                      	    			for(i=0; i<name.length; i++){
                      	    				if(numeros.indexOf(name.charAt(i)) > -1 || name.charAt(i) == "" || name.charAt(i) == " "){
                      	    					nombreCorrecto = false;
                      	    					mensajeError = "El nombre del pokemon no puede contener numeros ni espacios"
                      	    				}
                      	    			}
                      	    		}else{
                      	    			nombreCorrecto = false;
                      	    			mensajeError = "El nombre del pokemon debe tener entre 1 y 12 caracteres";
                      	    		}
                      	    		
                      	    
                      	    		//comprobamos que la respuesta sobre si es legendario tenga sentido
                      	    		if(respuestas.indexOf(legendario) <= -1){
                      	    			legendarioCorrecto = false;
                      	    			mensajeError = "La respuesta a si el pokemon es legendario o no, no es valida. Debe escribir si o no";
                      	    		}
                      	    		
                      	    		//sonido
                                    sonido_guardandoPokemon.play();	
                                    
                      	    	    swal("Guardando pokemon...", {
                      	    	      icon: "info",
                      	    	      dangerMode: true,
                      	    	      timer:3000,
                      	    	      buttons: false,
                      	    	      
                      	    	    }).then((willSave =>{
                      	    	    	
                      	    	    	
                      	    	    	
                      	    	    	sePuedeGuardar = (tipoCorrecto & valoresNumericosCorrectos & nombreCorrecto &legendarioCorrecto);
                      	    	    	
                      	    	    	//respuesta al usuario
                      	    	    	if(sePuedeGuardar){
                      	    	    		
                      	    	    	//limpiamos los inputs
                              	    		document.getElementById("lectorNameP").value="";
                                    		document.getElementById("lectorTipoP").value="";
                                    		document.getElementById("lectorTipo1P").value="";
                                    		document.getElementById("lectormov1P").value="";
                                    		document.getElementById("lectormov2P").value="";
                                    		document.getElementById("lectormov3P").value="";
                                    		document.getElementById("lectormov4P").value="";
                                    		document.getElementById("lectorVidaP").value="";
                                    		document.getElementById("lectorVelP").value="";
                                    		document.getElementById("lectorAtaqueP").value="";
                                    		document.getElementById("lectorDefensaP").value="";
                                    		document.getElementById("lectorAtaqueEspP").value="";
                                    		document.getElementById("lectorDefensaEspP").value="";
                                    		document.getElementById("lectorPesoP").value="";
                                    		document.getElementById("lectorAlturaP").value="";
                                    		document.getElementById("lectorLegendarioP").value="";
                                    		document.getElementById("lectorGeneracionP").value="";
                                    		
                                    		
                                    		//guardar el pokemon en la base de datos
                                    		
                                    		let pokemon = new Pokemon();
                                    	                                                                     		
                                    		pokemon.abilities[0] = mov1;
                                    		pokemon.abilities[1] = mov2;
                                    		pokemon.abilities[2] = mov3;
                                    		pokemon.abilities[3] = mov4;
                                                		
                                    		pokemon.attack = ataque;
                                    		pokemon.defense = defensa;
                                    		pokemon.height_m = altura;
                                    		pokemon.generation = generacion;
                                    		pokemon.hp = vida;                                   		
                                    		pokemon.name = name;                                    		
                                    		pokemon.sp_attack = ataqueEsp;
                                    		pokemon.sp_defense = defensaEsp;
                                    		pokemon.speed = vel;
                                    		pokemon.type1 = tipo;
                                    		pokemon.type2 = tipo1;
                                    		pokemon.weight_kg = peso;                                   		
                                    		
                                    		var cont = 0;
                                    		while(pokemon.photos[cont] != null){
                                    			cont++;
                                    		}
                                    		if(file != undefined){
                                    			pokemon.photos[cont] = "img/pokemon/" + file.name;
                                    			saveFile(file);
                                    		}
                                    		
                                    		switch(legendario){
                                    			case "no":
                                    			case "No":
                                    			case "NO":
                                    			case "nO":
                                    				pokemon.is_legendary = "0";
                                    				break;
                                    				
                                    			default:
                                        			console.log("dkjdas");
                                    				pokemon.is_legendary = 1;
                                    				break;
                                    		}
                                    		
                                    		createPokemon(pokemon, function(pokemon){});
                      	    	    		
	                      	    	    	swal({
	                                			title: "Pokemon guardado con éxito",
	                                			dangerMode: true,
	                                			
	                                		})
	                                		
	                                		//sonido
	                                        sonido_exitoGuardar.play();
	                                		
                      	    	    	}else{
                      	    	    		swal({
	                                			title: "Error: los datos introducidos no son válidos",
	                                			text: mensajeError,
	                                			dangerMode: true,
	                                			
	                                		})
	                                		
	                                		//sonido
	                                        sonido_falloGuardar.play();
                      	    	    	}
                      	    	    }))                    	    	    
                      	    	   }else{
                      	    		   
                      	    		   //sonido
                      	    		   sonido_presionarBoton.play();
                      	    	   }
                      	    	  });
                        	}
                        	if (pokedex.clickX > btnAtras.x + btnAtras.group.x && pokedex.clickX < btnAtras.x + btnAtras.group.x + btnAtras.width && pokedex.clickY > btnAtras.y + btnAtras.group.y && pokedex.clickY < btnAtras.y + btnAtras.group.y + btnAtras.height) {
                        		
                        		document.getElementById("imgAdd").style.visibility = 'hidden';
                        	}

                        	
                        	/*if (pokedex.clickX > btnAddFoto.x + btnAddFoto.group.x && pokedex.clickX < btnAddFoto.x + btnAddFoto.group.x + btnAddFoto.width && pokedex.clickY > btnAddFoto.y + btnAddFoto.group.y && pokedex.clickY < btnAddFoto.y + btnAddFoto.group.y + btnAddFoto.height) {
                            	
                        		//sonido
                        		sonido_presionarBoton.play();
                        		
                               var preview = document.querySelector('img'); //selects the query named img
                               var file    = document.querySelector('input[type=file]').files[0]; //sames as here
                               var reader  = new FileReader();

                               reader.onloadend = function () {
                                   preview.src = reader.result;
                               }

                               if (file) {
                                   reader.readAsDataURL(file); //reads the data as a URL
                               } else {
                                   preview.src = "";
                               }
                            }  */    
                            break;
                            
                        case "configMenu":  
                        	var clicked = theme;
                        	if (pokedex.clickX > clicked.x + clicked.group.x && pokedex.clickX < clicked.x + clicked.group.x + clicked.width && pokedex.clickY > clicked.y + clicked.group.y && pokedex.clickY < clicked.y + clicked.group.y + clicked.height) {
                        		pokeball_izq.cycleDone = false;
                                pokeball_der.cycleDone = false;
                                inAnimation = true;
                        		nextPokeState = themeMenu;
                            }
                        	clicked = backgroundBtn;
                        	if (pokedex.clickX > clicked.x + clicked.group.x && pokedex.clickX < clicked.x + clicked.group.x + clicked.width && pokedex.clickY > clicked.y + clicked.group.y && pokedex.clickY < clicked.y + clicked.group.y + clicked.height) {
                        		pokeball_izq.cycleDone = false;
                                pokeball_der.cycleDone = false;
                                inAnimation = true;
                        		nextPokeState = backgroundMenu;
                            }
                            break;
                        case "themeMenu":  
                        	var clicked = temaClasico;
                        	if (pokedex.clickX > clicked.x + clicked.group.x && pokedex.clickX < clicked.x + clicked.group.x + clicked.width && pokedex.clickY > clicked.y + clicked.group.y && pokedex.clickY < clicked.y + clicked.group.y + clicked.height) {
                        		temaClasico.isSelected = true;
                        		temaLucario.isSelected = false;
                            }
                        	clicked = temaLucario;
                        	if (pokedex.clickX > clicked.x + clicked.group.x && pokedex.clickX < clicked.x + clicked.group.x + clicked.width && pokedex.clickY > clicked.y + clicked.group.y && pokedex.clickY < clicked.y + clicked.group.y + clicked.height) {
                        		temaClasico.isSelected = false;
                        		temaLucario.isSelected = true;
                            }
                            break;
                        case "showPokemon":
                        	
                        	//Boton de volver cambia a ListMenu
                        	if (pokedex.clickX > btnAtras.x + btnAtras.group.x && pokedex.clickX < btnAtras.x + btnAtras.group.x + btnAtras.width && pokedex.clickY > btnAtras.y + btnAtras.group.y && pokedex.clickY < btnAtras.y + btnAtras.group.y + btnAtras.height) {
                        		nextPokeState = listMenu;
                        		canShowPokemon = false;
                        		document.getElementById("photosP").src = "#";
                        		document.getElementById("atributos").style.visibility = 'hidden';
                        		
                        		//sonido
                                sonido_presionarBoton.play();
                        	}
                        	
                        	//Boton de cambiar imagen Pokemon
                        	if(masfotos){
	                        	if (pokedex.clickX > btnArrowL.x + btnArrowL.group.x && pokedex.clickX < btnArrowL.x + btnArrowL.group.x + btnArrowL.width && pokedex.clickY > btnArrowL.y + btnArrowL.group.y && pokedex.clickY < btnArrowL.y + btnArrowL.group.y + btnArrowL.height) {
	                        		
	                        		//sonido
	                                sonido_presionarBoton.play();
	                        		
	                        		if(noFotoIz)
	                        			imgCont -= 1;
	                        	}
	                        	if (pokedex.clickX > btnArrowR.x + btnArrowR.group.x && pokedex.clickX < btnArrowR.x + btnArrowR.group.x + btnArrowR.width && pokedex.clickY > btnArrowR.y + btnArrowR.group.y && pokedex.clickY < btnArrowR.y + btnArrowR.group.y + btnArrowR.height) {
	                        		
	                        		//sonido
	                                sonido_presionarBoton.play();
	                        		
	                        		if(noFotoDer)
	                        			imgCont += 1;
	                        	}
                        	}
                        	break;
                        	
                        default:
                            break;
                    }
                }
            }        
        });
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

//Actualizar canvas
function updatePokedex() {
    pokedex.clear();   
    background.update();
    //Dependiendo del estado/menu actual de la pokedex se renderizará una cosa u otra
    switch (pokeState.name) {
        case "mainMenu":
            //Control de movimiento de los botones del menu mediante las flechas rojas arrowDer y arrowIzq
            if (!inAnimation) {
                if (pokedex.mouseX > arrowDer.x + arrowDer.group.x && pokedex.mouseX < arrowDer.x + arrowDer.group.x + arrowDer.width && pokedex.mouseY > arrowDer.y + arrowDer.group.y && pokedex.mouseY < arrowDer.y + arrowDer.group.y + arrowDer.height) {
                    if (menuItems.x > -480) menuItems.x -= 6;
                }
                else if (pokedex.mouseX > arrowIzq.x + arrowIzq.group.x && pokedex.mouseX < arrowIzq.x + arrowIzq.group.x + arrowIzq.width && pokedex.mouseY > arrowIzq.y + arrowIzq.group.y && pokedex.mouseY < arrowIzq.y + arrowIzq.group.y + arrowIzq.height) {
                    if (menuItems.x < 20) menuItems.x += 6;
                }
            }
            listaPokemon.update();
            addPoke.update();
            xmlDownload.update();
            config.update();
            creditos.update();
            break;
        case "listMenu":
            btnAtras.update();
            btnSearch.update();
            if (nextPokeState.name === "listMenu" && canShowList) {
                document.getElementById("listaPokemon").style.visibility = "visible";
                document.getElementById("multiselect").style.visibility = "visible";
                document.getElementById("ordenLista").style.visibility = "visible";
            }
            break;
        case "addMenu":
            btnAtras.update();
            btnAddFoto.update();
            btnTipos.update();
            btnTipos1.update();
            btnAnyadir.update();
            btnCampos.update();
            btnCamposPeso.update();
            btnCamposNat.update();
            btnCamposAta.update();
            btnCamposAtaEsp.update();
            btnCamposDef.update();
            btnCamposDefEsp.update();
            btnCamposVel.update();
            btnCamposHP.update();
            btnCamposGeneracion.update();
            btnCamposLegendario.update();
            btnCamposMov1.update();
            btnCamposMov2.update();
            btnCamposMov3.update();
            btnCamposMov4.update();
            btnGuardarPokemon.update();
            if (nextPokeState.name === "addMenu" && canShowLectores) {
            	document.getElementById("lectorAtributos").style.visibility = 'visible';
            }
     
            break;
        case "showPokemon":
        	//console.log(pokemonElegido);
        	if(pokE.photos[1] != null){
            	masfotos = true;
            }
    		if(pokE.photos[imgCont+1] != null){
    			noFotoDer = true;
    		}else{
    			noFotoDer = false;
    		}
    		if(pokE.photos[imgCont-1] != null){
    			noFotoIz = true;
    		}else{
    			noFotoIz = false;
    		}
    		if(pokE.photos[imgCont] != undefined){
    			
    			var foto = pokE.photos[imgCont].split("/");
    			var num = foto[2].split(".");
    		
    		
	    		if(parseInt(num[0]) < 721){
	    			
	    			document.getElementById("photosP").src = pokE.photos[imgCont];
	    		}else{
	    			document.getElementById("photosP").src = "img/pokeball_mini.png";
	    		}
    		}else{
    			document.getElementById("photosP").src = "img/pokeball_mini.png";
    		}
    		
        	if (nextPokeState.name === "showPokemon" && canShowPokemon) {
        		document.getElementById("atributos").style.visibility = "visible";
        	}
            btnAtras.update();
            btnFoto.update();
            btnTipos.update();
            btnTipos1.update();
            btnCampos.update();
            btnCamposPeso.update();
            btnCamposNat.update();
            btnCamposAta.update();
            btnCamposAtaEsp.update();
            btnCamposDef.update();
            btnCamposDefEsp.update();
            btnCamposVel.update();
            btnCamposHP.update();
            btnCamposItem.update();
            btnCamposMov1.update();
            btnCamposMov2.update();
            btnCamposMov3.update();
            btnCamposMov4.update();
            if(masfotos){
            	if(noFotoDer)
            		btnArrowR.update();
            	if(noFotoIz)
            		btnArrowL.update();
            }
            break;
        case "configMenu":
            btnAtras.update();
            theme.update();
            backgroundBtn.update();
            break;
        case "creditsMenu":
            btnAtras.update();
            creditosTexto.update();
            break;
        case "themeMenu":
        	btnAtras.update();
        	temaClasico.update();
        	temaLucario.update();
        	break;
        case "backgroundMenu":
        	btnAtras.update();
        	fondoNormal.update();
        	fondoAbra.update();
        	fondoArticuno.update();
        	fondoAsh.update();
        	fondoDark.update();
        	fondoEevee.update();
        	fondoGhost.update();
        	fondoGrass.update();
        	fondoMoltres.update();
        	fondoTourney.update();
        	fondoZapdos.update();
        	break;
        default:
            break;
    }
    //Hasta que no se complete el ciclo de ida y retorno de cada pokeball, el update no deja de llamar a rightAndBack() y leftAndBack()
    if (!pokeball_izq.cycleDone) {
        pokeball_izq.rightAndBack();
    }
    if (!pokeball_der.cycleDone) {
        pokeball_der.leftAndBack();
    }
    //Se borran los recuadros que no pertenecen a la pnatalla de la pokedex
    ctx.clearRect(0, 0, pokeball_izq.x + pokeball_izq.group.x + 295, pokedex.canvas.height);
    ctx.clearRect(pokeball_der.x + pokeball_der.group.x + 10, 0, pokedex.canvas.width, pokedex.canvas.height);
    pokeball_izq.update();
    pokeball_der.update();
    arrowIzq.update();
    arrowDer.update();
}

function changeState() {
    pokeState = nextPokeState; 
    if (nextPokeState.name === "listMenu") {
        setTimeout(function() {
            canShowList = true;
        }, 1000);
    }
    else if (nextPokeState.name === "showPokemon") {
        setTimeout(function() {
            canShowPokemon = true;
        }, 1000);
    }
    else if (nextPokeState.name === "addMenu") {
    	setTimeout(function() {
            canShowLectores = true;
        }, 1000);
        
    }
    else{
    	;
    }
}   

//By Carlos Delgado. https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

//para gestionar la apariencia de las checkboxes de los filtros de la lista de pokemon
function showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if(checkboxes.classList.contains("hide")) {
        checkboxes.classList.remove("hide");
    } else {
        checkboxes.classList.add("hide");
    }
}