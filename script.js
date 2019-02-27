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
    "img/listaPokemon/atrasHover.png" //............16
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

//Locks and Flags
var inAnimation = false;

//Estados/menus de la pokedex
var mainMenu;
var listMenu;
var pokeState; //Estado/menu actual de la pokedex
var nextPokeState; //Siguiente estado de la pokedex

//inicialización de variables
function startPokedex() {
    globalGroup = new Group(0, 0);
    pokegroup_izq = new Group(15, 200);
    pokegroup_der = new Group(1075, 200);
    menuItems = new Group(0, 0);
    pokeball_izq = new Pokeball(0, 0, images[1], "right", pokegroup_izq); //Se posiciona a la izquierda pero mira hacia la derecha
    pokeball_der = new Pokeball(0, 0, images[2], "left", pokegroup_der); //Se posiciona a la derecha pero mira a la izquierda
    background = new Background();
    listaPokemon = new Button(300, 400, images[4], images[5], 235, 251, menuItems);
    addPoke = new Button(550, 400, images[6], images[7], 235, 251, menuItems);
    xmlDownload = new Button(800, 400, images[8], images[9], 235, 251, menuItems);
    arrowDer = new ArrowButton(30, 275, images[10], images[11], 49, 50, pokegroup_der);
    arrowIzq = new ArrowButton(226, 275, images[12], images[13], 49, 50, pokegroup_izq);
    btnAtras = new Button(315, 300, images[15], images[16], 76, 48, globalGroup);
    mainMenu = new State("mainMenu", images[3]);
    listMenu = new State("listMenu", images[14], mainMenu);
    pokeState = mainMenu;
    nextPokeState = new State("empty");
    pokedex.start();
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
                switch (pokeState.name) {
                    case "mainMenu":
                        //ListaPokemon onClick
                        if (pokedex.clickX > listaPokemon.x + listaPokemon.group.x && pokedex.clickX < listaPokemon.x + listaPokemon.group.x + listaPokemon.width && pokedex.clickY > listaPokemon.y + listaPokemon.group.y && pokedex.clickY < listaPokemon.y + listaPokemon.group.y + listaPokemon.height) {
                            pokeball_izq.cycleDone = false;
                            pokeball_der.cycleDone = false;
                            inAnimation = true;
                            nextPokeState = listMenu;
                        }
                        break;
                    case "listMenu":
                        if (pokedex.clickX > btnAtras.x + btnAtras.group.x && pokedex.clickX < btnAtras.x + btnAtras.group.x + btnAtras.width && pokedex.clickY > btnAtras.y + btnAtras.group.y && pokedex.clickY < btnAtras.y + btnAtras.group.y + btnAtras.height) {
                            pokeball_izq.cycleDone = false;
                            pokeball_der.cycleDone = false;
                            inAnimation = true;
                            nextPokeState = pokeState.father;
                        }
                        break;
                    default:
                        break;
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
                    if (menuItems.x > -500) menuItems.x -= 6;
                }
                else if (pokedex.mouseX > arrowIzq.x + arrowIzq.group.x && pokedex.mouseX < arrowIzq.x + arrowIzq.group.x + arrowIzq.width && pokedex.mouseY > arrowIzq.y + arrowIzq.group.y && pokedex.mouseX < arrowIzq.y + arrowIzq.group.y + arrowIzq.height) {
                    if (menuItems.x < 0) menuItems.x += 6;
                }
            }
            listaPokemon.update();
            addPoke.update();
            xmlDownload.update();
            break;
        case "listMenu":
            btnAtras.update();
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