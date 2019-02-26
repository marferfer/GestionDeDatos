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
    "img/interfaz.png",
    "img/pokeball_izq.png",
    "img/pokeball_der.png",
    "img/Fondo.png",
    "img/Pokedex.png",
    "img/PokedexHover.png"
)

//Variables globales
var pokeball_izq;
var pokeball_der;
var background;
var listaPokemon;

//Locks and Flags
var inAnimation = false;

//inicialización de variables
function startPokedex() {
    pokeball_izq = new Pokeball(15, 200, images[1], "right"); //Se posiciona a la izquierda pero mira hacia la derecha
    pokeball_der = new Pokeball(1075, 200, images[2], "left"); //Se posiciona a la derecha pero mira a la izquierda
    background = new Decoration(255, 230, images[3]);
    listaPokemon = new Button(300, 400, images[4], images[5], 235, 251);
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
            //ListaPokemon onClick
                if (pokedex.clickX > listaPokemon.x && pokedex.clickX < listaPokemon.x + listaPokemon.width && pokedex.clickY > listaPokemon.y && pokedex.clickY < listaPokemon.y + listaPokemon.height) {
                    pokeball_izq.cycleDone = false;
                    pokeball_der.cycleDone = false;
                    inAnimation = true;
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
    listaPokemon.update();
    if (!pokeball_izq.cycleDone) {
        pokeball_izq.rightAndBack();
    }
    if (!pokeball_der.cycleDone) {
        pokeball_der.leftAndBack();
    }
    pokeball_izq.update();
    pokeball_der.update();
}
    