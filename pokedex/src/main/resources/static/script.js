var images = new Array();
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
    "img/BDD.png", //______________________________17
    "img/BDDHover.png", //.........................18
    "img/Creditos.png", //_________________________19
    "img/CreditosHover.png", //....................20
    "img/creditos/FondoVerde.png", //______________21
    "img/creditos/atras.png", //...................22
    "img/creditos/atrasHover.png", //______________23
    "img/creditos/creditos.png", //................24
    "img/BDD/FondoMorado.png", //__________________25
    "img/BDD/atras.png", //........................26
    "img/BDD/atrasHover.png", //___________________27
    "img/BDD/mongodb.png", //......................28
    "img/BDD/mongodbHover.png", //_________________29
    "img/BDD/mongodbSelected.png", //..............30
    "img/BDD/sqlite.png", //_______________________31
    "img/BDD/sqliteHover.png", //..................32
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
    "img/btnGuardarPokemon.png",//kjashdsajkdhskaj_46
    "img/btnGuardarPokemon_hover.png"//kjasdsjadas.47
)

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
var bdd;
var creditos;
var creditosTexto;
var pokemonElegido;
var pokE;
var btnSearch;
var btnGuardarPokemon;

var masfotos;
var imgCont = 0;
var noFotoDer;
var noFotoIz;

//Locks and Flags
var inAnimation = false;
var dbSelected = 'sqlite';
var canShowList = false;
var canShowPokemon = false;
var canShowLectores = false;

//Estados/menus de la pokedex
var mainMenu;
var listMenu;
var addMenu;
var bddMenu;
var showPokemon;
var creditsMenu;
var pokeState; //Estado/menu actual de la pokedex
var nextPokeState; //Siguiente estado de la pokedex



//inicialización de variables
function startPokedex() {
    globalGroup = new Group(0, 0);
    pokegroup_izq = new Group(15, 200);
    pokegroup_der = new Group(1075, 200);
    menuItems = new Group(20, 0);
    pokeball_izq = new Pokeball(0, 0, images[1], "right", pokegroup_izq); //Se posiciona a la izquierda pero mira hacia la derecha
    pokeball_der = new Pokeball(0, 0, images[2], "left", pokegroup_der); //Se posiciona a la derecha pero mira a la izquierda
    background = new Background();
    listaPokemon = new Button(300, 400, images[4], images[5], 235, 251, menuItems);
    addPoke = new Button(550, 400, images[6], images[7], 235, 251, menuItems);
    xmlDownload = new Button(800, 400, images[8], images[9], 235, 251, menuItems);
    bdd = new Button(1050, 400, images[17], images[18], 235, 251, menuItems);
    creditos = new Button(1300, 400, images[19], images[20], 235, 251, menuItems);
    arrowDer = new ArrowButton(30, 275, images[10], images[11], 49, 50, pokegroup_der);
    arrowIzq = new ArrowButton(226, 275, images[12], images[13], 49, 50, pokegroup_izq);
    btnAtras = new Button(315, 270, images[15], images[16], 76, 48, globalGroup);
    btnAddFoto = new Button(415, 300, images[34], images[35], 182, 182, globalGroup);
    btnFoto = new Button(415, 300, images[44], images[45], 182, 182, globalGroup);
    btnTipos = new Button(365, 500, images[36], images[37], 132, 60, globalGroup);
    btnTipos1 = new Button(500, 500, images[36], images[37], 132, 60, globalGroup);
    btnSearch = new Button(800, 370, images[42], images[43], 50, 50, globalGroup);
    btnGuardarPokemon = new Button(670, 688, images[46], images[47], 100, 60, globalGroup);
    
    btnCampos = new Button(655, 300, images[38], images[39], 360, 90, globalGroup); 
    btnCamposPeso = new Button(670, 350, images[40], images[41], 150, 125, globalGroup);
    btnCamposNat = new Button(830, 350, images[40], images[41], 150, 125, globalGroup);
    btnCamposAta = new Button(670, 410, images[40], images[41], 150, 125, globalGroup);
    btnCamposAtaEsp = new Button(830, 410, images[40], images[41], 150, 125, globalGroup);
    btnCamposDef = new Button(670, 470, images[40], images[41], 150, 125, globalGroup);
    btnCamposDefEsp = new Button(830, 470, images[40], images[41], 150, 125, globalGroup);
    btnCamposVel = new Button(670, 530, images[40], images[41], 150, 125, globalGroup);
    btnCamposHP = new Button(830, 530, images[40], images[41], 150, 125, globalGroup);
    btnCamposItem = new Button(670, 600, images[38], images[39], 360, 90, globalGroup);
    btnCamposMov1 = new Button(330, 535, images[40], images[41], 150, 125, globalGroup);
    btnCamposMov2 = new Button(480, 535, images[40], images[41], 150, 125, globalGroup);
    btnCamposMov3 = new Button(330, 595, images[40], images[41], 150, 125, globalGroup);
    btnCamposMov4 = new Button(480, 595, images[40], images[41], 150, 125, globalGroup);
    
    btnArrowR = new Button(600, 365, images[10], images[11], 49, 50, globalGroup);
    btnArrowL = new Button(360, 365, images[12], images[13], 49, 50, globalGroup);

    btnAnyadir = new Button(630, 680, images[36], images[37], 132, 60, globalGroup);
    mongodb = new dbButton(440, 340, images[28], images[29], images[30], 231, 346, globalGroup, false);
    sqlite = new dbButton(740, 340, images[31], images[32], images[33], 231, 346, globalGroup, true);
    creditosTexto = new Decoration(400, 230, images[24], globalGroup);
    mainMenu = new State("mainMenu", images[3]);
    listMenu = new State("listMenu", images[3], mainMenu);
    addMenu = new State("addMenu", images[3], mainMenu);
    bddMenu = new State("bddMenu", images[3], mainMenu);
    creditsMenu = new State("creditsMenu", images[3], mainMenu);
    showPokemon = new State("showPokemon", images[3], mainMenu);
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
                        		
                        		var id = $(this).attr('id');
                        		
                        	    swal({
                        	    	  title: "¿Seguro que desea eliminar a este Pokemon?",
                        	    	  text: "Una vez borrado no es posible recuperarlo",
                        	    	  buttons: true,
                        	    	  dangerMode: true,
                        	    	})
                        	    	.then((willDelete) => {
                        	    	  if (willDelete) {
                        	    		  
                        	    		$("div").remove("#"+id);
                                  		$(this).remove();
                                  		deleteItem(id);
                                  		
                        	    	    swal("Pokemon eliminado", {
                        	    	      icon: "success",
                        	    	      dangerMode: true,
                        	    	      timer:1200,
                        	    	      buttons: false,
                        	    	    });
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
                        
                        
                    }
                    //XML Download onClick
                    else if (pokedex.clickX > xmlDownload.x + xmlDownload.group.x && pokedex.clickX < xmlDownload.x + xmlDownload.group.x + xmlDownload.width && pokedex.clickY > xmlDownload.y + xmlDownload.group.y && pokedex.clickY < xmlDownload.y + xmlDownload.group.y + xmlDownload.height) {
                        download("prueba.xml","¡Capturalos a todos!");
                    }
                    //BDD onClick
                    if (pokedex.clickX > bdd.x + bdd.group.x && pokedex.clickX < bdd.x + bdd.group.x + bdd.width && pokedex.clickY > bdd.y + bdd.group.y && pokedex.clickY < bdd.y + bdd.group.y + bdd.height) {
                        pokeball_izq.cycleDone = false;
                        pokeball_der.cycleDone = false;
                        inAnimation = true;
                        nextPokeState = bddMenu;
                    }
                    //Creditos onClick
                    if (pokedex.clickX > creditos.x + creditos.group.x && pokedex.clickX < creditos.x + creditos.group.x + creditos.width && pokedex.clickY > creditos.y + creditos.group.y && pokedex.clickY < creditos.y + creditos.group.y + creditos.height) {
                        pokeball_izq.cycleDone = false;
                        pokeball_der.cycleDone = false;
                        inAnimation = true;
                        nextPokeState = creditsMenu;
                    }
                }
                //El main menu va aparte
                else {
                    if (pokedex.clickX > btnAtras.x + btnAtras.group.x && pokedex.clickX < btnAtras.x + btnAtras.group.x + btnAtras.width && pokedex.clickY > btnAtras.y + btnAtras.group.y && pokedex.clickY < btnAtras.y + btnAtras.group.y + btnAtras.height) {
                        pokeball_izq.cycleDone = false;
                        pokeball_der.cycleDone = false;
                        inAnimation = true;
                        nextPokeState = pokeState.father;
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
                        		var id = $(this).attr('id');
                        		pokemonElegido = id;
                        		loadPokemon(pokemonElegido,function(pokemonE){
                            		var p=JSON.parse(pokemonE);
                            		pokE = p;
                            		document.getElementById("nameP").innerHTML = p.name;
                            		
                            		if(p.type1 != null){
                            			document.getElementById("tipoP").innerHTML = p.type1;
                            		}else{
                            			document.getElementById("tipoP").innerHTML = '--------';
                            		}
                            		
                            		if(p.type2 != null){
                            			document.getElementById("tipo1P").innerHTML = p.type2;
                            		}else{
                            			document.getElementById("tipo1P").innerHTML = '--------';
                            		}
                            		if(p.abilities[0] != null){
                            			document.getElementById("mov1P").innerHTML = p.abilities[0];
                            		}else{
                            			document.getElementById("mov1P").innerHTML = '---------';
                            		}
                            		if(p.abilities[1] != null){
                            			document.getElementById("mov2P").innerHTML = p.abilities[1];
                            		}else{
                            			document.getElementById("mov2P").innerHTML = '---------';
                            		}
                            		if(p.abilities[2] != null){
                            			document.getElementById("mov3P").innerHTML = p.abilities[2];
                            		}else{
                            			document.getElementById("mov3P").innerHTML = '---------';
                            		}
                            		if(p.abilities[3] != null){
                            			document.getElementById("mov4P").innerHTML = p.abilities[3];
                            		}else{
                            			document.getElementById("mov4P").innerHTML = '---------';
                            		}
                            		document.getElementById("photosP").src = p.photos[imgCont];
                            		document.getElementById("vidaP").innerHTML = p.hp;
                            		document.getElementById("velP").innerHTML = p.speed;
                            		document.getElementById("pesoP").innerHTML = p.weight_kg;
                            		document.getElementById("natuP").innerHTML = p.classfication;
                            		document.getElementById("ataP").innerHTML = p.attack;
                            		document.getElementById("ataEP").innerHTML = p.sp_attack;
                            		document.getElementById("defP").innerHTML = p.defense;
                            		document.getElementById("defEP").innerHTML = p.sp_defense;
                            		
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
                                		
                                		var id = $(this).attr('id');
                                		
                                	    swal({
                                	    	  title: "¿Seguro que desea eliminar a este Pokemon?",
                                	    	  text: "Una vez borrado no es posible recuperarlo",
                                	    	  buttons: true,
                                	    	  dangerMode: true,
                                	    	})
                                	    	.then((willDelete) => {
                                	    	  if (willDelete) {
                                	    		  
                                	    		$("div").remove("#"+id);
                                          		$(this).remove();
                                          		deleteItem(id);
                                          		
                                	    	    swal("Pokemon eliminado", {
                                	    	      icon: "success",
                                	    	      dangerMode: true,
                                	    	      timer:1200,
                                	    	      buttons: false,
                                	    	    });
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
                    		let tipoCorrecto;
                    		let valoresNumericosCorrectos;
                    		let nombreCorrecto;
                    		let naturalezaCorrecta;
                    		let sePuedeGuardar;
                    		let mensajeError;
                    		
                    		document.getElementById("imgAdd").style.visibility = "visible";

                        	//click btnGuardarPokemon
                        	if (pokedex.clickX > btnGuardarPokemon.x + btnGuardarPokemon.group.x && pokedex.clickX < btnGuardarPokemon.x + btnGuardarPokemon.group.x + btnGuardarPokemon.width && pokedex.clickY > btnGuardarPokemon.y + btnGuardarPokemon.group.y && pokedex.clickY < btnGuardarPokemon.y + btnGuardarPokemon.group.y + btnGuardarPokemon.height) {
                        		
                        		// inicializamos las variables de verificacion y recogemos los datos para evaluarlos
                        		sePuedeGuardar = false;
                        		tipoCorrecto = false;
                        		valoresNumericosCorrectos = false;
                        		nombreCorrecto = true;				//es mas facil comprobar que es incorrecto a que es correcto
                        		naturalezaCorrecta = true;			//es mas facil comprovar que es incorrecto a que es correcto
                        		
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
                        		let naturaleza = document.getElementById("lectorNaturalezaP").value;
                        		
                        		vida = parseInt(vida);
                        		vel = parseInt(vel);
                        		ataque = parseInt(ataque);
                        		defensa = parseInt(defensa);
                        		ataqueEsp = parseInt(ataqueEsp);
                        		defensaEsp = parseInt(defensaEsp);
                        		peso = parseFloat(peso);
                        		altura = parseFloat(altura);
                        		
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
                      	    		if(!isNaN(vida) && !isNaN(vel) && !isNaN(ataque) && !isNaN(defensa) && !isNaN(ataqueEsp) && !isNaN(defensaEsp) && !isNaN(peso) && !isNaN(altura)){
                      	    			valoresNumericosCorrectos = true;
                      	    		}else{
                      	    			mensajeError = "Los valores 'PS', 'velocidad', 'ataque', 'defensa', 'ataqueEsp', 'defensaEsp', 'peso', 'altura' deben ser números";
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
                      	    		
                      	    		//comprobamos que la naturaleza tenga un limite de caracteres y no contenga numeros ni espacios
                      	    		if(naturaleza.length <= 20 && naturaleza.length > 0){
                      	    			
                      	    			for(i=0; i<naturaleza.length; i++){
                      	    				if(numeros.indexOf(naturaleza.charAt(i)) > -1 || naturaleza.charAt(i) == "" || naturaleza.charAt(i) == " "){
                      	    					naturalezaCorrecta = false;
                      	    					mensajeError = "La naturaleza del pokemon no puede contener numeros ni espacios"
                      	    				}
                      	    			}
                      	    		}else{
                      	    			naturalezaCorrecta = false;
                      	    			mensajeError = "La naturaleza del pokemon debe tener entre 1 y 20 caracteres";
                      	    		}
                                		
                      	    	    swal("Guardando pokemon...", {
                      	    	      icon: "info",
                      	    	      dangerMode: true,
                      	    	      timer:2500,
                      	    	      buttons: false,
                      	    	      
                      	    	    }).then((willSave =>{
                      	    	    	
                      	    	    	sePuedeGuardar = (tipoCorrecto & valoresNumericosCorrectos & nombreCorrecto & naturalezaCorrecta);
                      	    	    	
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
                                    		document.getElementById("lectorNaturalezaP").value="";
                                    		
                                    		//guardar el pokemon en la base de datos
                                    		
                                    		let pokemon = new Pokemon();
                                    	                                                                     		
                                    		pokemon.abilities[0] = mov1;
                                    		pokemon.abilities[1] = mov2;
                                    		pokemon.abilities[2] = mov3;
                                    		pokemon.abilities[3] = mov4;
                                                		
                                    		pokemon.attack = ataque;
                                    		pokemon.classfication = naturaleza;
                                    		pokemon.defense = defensa;
                                    		pokemon.height_m = altura;
                                    		pokemon.hp = vida;                                   		
                                    		pokemon.name = name;                                    		
                                    		pokemon.sp_attack = ataqueEsp;
                                    		pokemon.sp_defense = defensaEsp;
                                    		pokemon.speed = vel;
                                    		pokemon.type1 = tipo;
                                    		pokemon.type2 = tipo1;
                                    		pokemon.weight_kg = peso;                                   		
                                    		pokemon.photos = [];
                                    		
                                    		createPokemon(pokemon, function(pokemon){});
                      	    	    		
	                      	    	    	swal({
	                                			title: "Pokemon guardado con éxito",
	                                			dangerMode: true,
	                                			
	                                		})
	                                		
                      	    	    	}else{
                      	    	    		swal({
	                                			title: "Error: los datos introducidos no son válidos",
	                                			text: mensajeError,
	                                			dangerMode: true,
	                                			
	                                		})
                      	    	    	}
                      	    	    }))
                      	    	   }
                      	    	  });
                        	}
                        	if (pokedex.clickX > btnAtras.x + btnAtras.group.x && pokedex.clickX < btnAtras.x + btnAtras.group.x + btnAtras.width && pokedex.clickY > btnAtras.y + btnAtras.group.y && pokedex.clickY < btnAtras.y + btnAtras.group.y + btnAtras.height) {
                        		
                        		document.getElementById("imgAdd").style.visibility = 'hidden';
                        	}

                        	
                        	/*if (pokedex.clickX > btnAddFoto.x + btnAddFoto.group.x && pokedex.clickX < btnAddFoto.x + btnAddFoto.group.x + btnAddFoto.width && pokedex.clickY > btnAddFoto.y + btnAddFoto.group.y && pokedex.clickY < btnAddFoto.y + btnAddFoto.group.y + btnAddFoto.height) {
                            	
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
                            
                        case "bddMenu":  
                            if (pokedex.clickX > mongodb.x + mongodb.group.x && pokedex.clickX < mongodb.x + mongodb.group.x + mongodb.width && pokedex.clickY > mongodb.y + mongodb.group.y && pokedex.clickY < mongodb.y + mongodb.group.y + mongodb.height) {
                                mongodb.isSelected = true;
                                sqlite.isSelected = false;
                                dbSelected = 'mongodb';
                            }   
                            else if (pokedex.clickX > sqlite.x + sqlite.group.x && pokedex.clickX < sqlite.x + sqlite.group.x + sqlite.width && pokedex.clickY > sqlite.y + sqlite.group.y && pokedex.clickY < sqlite.y + sqlite.group.y + sqlite.height) {
                                sqlite.isSelected = true;
                                mongodb.isSelected = false;
                                dbSelected = 'sqlite';
                            }                  
                            break;
                            
                        case "showPokemon":
                        	
                        	//Boton de volver cambia a ListMenu
                        	if (pokedex.clickX > btnAtras.x + btnAtras.group.x && pokedex.clickX < btnAtras.x + btnAtras.group.x + btnAtras.width && pokedex.clickY > btnAtras.y + btnAtras.group.y && pokedex.clickY < btnAtras.y + btnAtras.group.y + btnAtras.height) {
                        		nextPokeState = listMenu;
                        		canShowPokemon = false;
                        		document.getElementById("photosP").src = "#";
                        		document.getElementById("atributos").style.visibility = 'hidden';
                        	}
                        	
                        	//Boton de cambiar imagen Pokemon
                        	if(masfotos){
	                        	if (pokedex.clickX > btnArrowL.x + btnArrowL.group.x && pokedex.clickX < btnArrowL.x + btnArrowL.group.x + btnArrowL.width && pokedex.clickY > btnArrowL.y + btnArrowL.group.y && pokedex.clickY < btnArrowL.y + btnArrowL.group.y + btnArrowL.height) {
	                        		if(noFotoIz)
	                        			imgCont -= 1;
	                        	}
	                        	if (pokedex.clickX > btnArrowR.x + btnArrowR.group.x && pokedex.clickX < btnArrowR.x + btnArrowR.group.x + btnArrowR.width && pokedex.clickY > btnArrowR.y + btnArrowR.group.y && pokedex.clickY < btnArrowR.y + btnArrowR.group.y + btnArrowR.height) {
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
            bdd.update();
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
            btnCamposItem.update();
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
    		document.getElementById("photosP").src = pokE.photos[imgCont];
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
        case "bddMenu":
            btnAtras.update();
            mongodb.update();
            sqlite.update();
            break;
        case "creditsMenu":
            btnAtras.update();
            creditosTexto.update();
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
