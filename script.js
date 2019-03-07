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
    "img/arrow.png", //.............................10
    "img/arrowHover.png", //________________________11
    "img/arrowIzq.png", //..........................12
    "img/arrowHoverIzq.png", //_____________________13
    "img/listaPokemon/FondoNaranja.png", //.........14
    "img/listaPokemon/atras.png", //________________15
    "img/listaPokemon/atrasHover.png", //...........16
    "img/BDD.png", //_______________________________17
    "img/BDDHover.png", //..........................18
    "img/Creditos.png", //__________________________19
    "img/CreditosHover.png", //.....................20
    "img/creditos/FondoVerde.png", //_______________21
    "img/creditos/atras.png", //....................22
    "img/creditos/atrasHover.png", //_______________23
    "img/creditos/creditos.png", //.................24
    "img/BDD/FondoMorado.png", //___________________25
    "img/BDD/atras.png", //.........................26
    "img/BDD/atrasHover.png", //____________________27
    "img/BDD/mongodb.png", //.......................28
    "img/BDD/mongodbHover.png", //__________________29
    "img/BDD/mongodbSelected.png", //...............30
    "img/BDD/sqlite.png", //________________________31
    "img/BDD/sqliteHover.png", //...................32
    "img/BDD/sqliteSelected.png", //________________33
    "img/Anyadir/anyadirImg.png", //................34
    "img/Anyadir/anyadirImgHover.png", //___________35
    "img/Anyadir/tipos.png", //.....................36
    "img/Anyadir/tiposHover.png", //________________37
    "img/Anyadir/campos.png", //....................38
    "img/Anyadir/camposHover.png", //_______________39
    "img/Anyadir/camposPequenyos.png", //...........40
    "img/Anyadir/camposPequenyosHover.png" //_______41
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
var btnAddFoto;
var btnTipos;
var btnCampos;
var btnCamposPequenyos;
var bdd;
var creditos;
var creditosTexto;

//Locks and Flags
var inAnimation = false;
var dbSelected = 'sqlite';

//Estados/menus de la pokedex
var mainMenu;
var listMenu;
var addMenu;
var bddMenu;
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
    btnAtras = new Button(315, 300, images[15], images[16], 76, 48, globalGroup);
    btnAddFoto = new Button(415, 300, images[34], images[35], 182, 182, menuItems);
    btnTipos = new Button(415, 550, images[36], images[37], 132, 60, menuItems);
    btnCampos = new Button(655, 300, images[38], images[39], 360, 90, menuItems);
    btnCamposPequenyos = new Button(655, 350, images[40], images[41], 150, 125, menuItems);
    mongodb = new dbButton(440, 340, images[28], images[29], images[30], 231, 346, globalGroup, false);
    sqlite = new dbButton(740, 340, images[31], images[32], images[33], 231, 346, globalGroup, true);
    creditosTexto = new Decoration(400, 230, images[24], globalGroup);
    mainMenu = new State("mainMenu", images[3]);
    listMenu = new State("listMenu", images[14], mainMenu);
    addMenu = new State("addMenu", images[14], mainMenu);
    bddMenu = new State("bddMenu", images[25], mainMenu);
    creditsMenu = new State("creditsMenu", images[21], mainMenu);
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
        this.canvas.height = 1000;
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

            if (!inAnimation) {
                //Dependiendo del estado/menu actual de la pokedex se comprobarán las funciones onclick de unos botones u otros
                if (pokeState.name === "mainMenu") {
                    //ListaPokemon onClick
                    if (pokedex.clickX > listaPokemon.x + listaPokemon.group.x && pokedex.clickX < listaPokemon.x + listaPokemon.group.x + listaPokemon.width && pokedex.clickY > listaPokemon.y + listaPokemon.group.y && pokedex.clickY < listaPokemon.y + listaPokemon.group.y + listaPokemon.height) {
                        pokeball_izq.cycleDone = false;
                        pokeball_der.cycleDone = false;
                        inAnimation = true;
                        nextPokeState = listMenu;
                        //Cambiar aspecto del boton atras para que coincida con el del menu
                        btnAtras.normal = images[15];
                        btnAtras.hover = images[16];
                    }
                    if (pokedex.clickX > addPoke.x + addPoke.group.x && pokedex.clickX < addPoke.x + addPoke.group.x + addPoke.width && pokedex.clickY > addPoke.y + addPoke.group.y && pokedex.clickY < addPoke.y + addPoke.group.y + addPoke.height) {
                        pokeball_izq.cycleDone = false;
                        pokeball_der.cycleDone = false;
                        inAnimation = true;
                        nextPokeState = addMenu;
                        //Cambiar aspecto del boton atras para que coincida con el del menu
                        btnAtras.normal = images[15];
                        btnAtras.hover = images[16];
                        btnAddFoto.normal = images[34];
                        btnAddFoto.hover = images[35];
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
                        //Cambiar aspecto del boton atras para que coincida con el del menu
                        btnAtras.normal = images[26];
                        btnAtras.hover = images[27];
                    }
                    //Creditos onClick
                    if (pokedex.clickX > creditos.x + creditos.group.x && pokedex.clickX < creditos.x + creditos.group.x + creditos.width && pokedex.clickY > creditos.y + creditos.group.y && pokedex.clickY < creditos.y + creditos.group.y + creditos.height) {
                        pokeball_izq.cycleDone = false;
                        pokeball_der.cycleDone = false;
                        inAnimation = true;
                        nextPokeState = creditsMenu;
                        //Cambiar aspecto del boton atras para que coincida con el del menu
                        btnAtras.normal = images[22];
                        btnAtras.hover = images[23];
                    }
                }
                //El main menu va aparte
                else {
                    if (pokedex.clickX > btnAtras.x + btnAtras.group.x && pokedex.clickX < btnAtras.x + btnAtras.group.x + btnAtras.width && pokedex.clickY > btnAtras.y + btnAtras.group.y && pokedex.clickY < btnAtras.y + btnAtras.group.y + btnAtras.height) {
                        pokeball_izq.cycleDone = false;
                        pokeball_der.cycleDone = false;
                        inAnimation = true;
                        nextPokeState = pokeState.father;
                    }
                    switch (pokeState.name) {
                        case "listMenu":                            
                            break;
                        case "addMenu":                            
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
                else if (pokedex.mouseX > arrowIzq.x + arrowIzq.group.x && pokedex.mouseX < arrowIzq.x + arrowIzq.group.x + arrowIzq.width && pokedex.mouseY > arrowIzq.y + arrowIzq.group.y && pokedex.mouseX < arrowIzq.y + arrowIzq.group.y + arrowIzq.height) {
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
            break;
        case "addMenu":
            btnAtras.update();
            btnAddFoto.update();
            btnTipos.update();
            btnCampos.update();
            btnCamposPequenyos.update();
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