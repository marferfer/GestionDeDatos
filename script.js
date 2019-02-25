var images = new Array();
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

var pokeball_izq;
var pokeball_der;
var background;
var listaPokemon;

function startPokedex() {
    pokeball_izq = new decoration(15, 200, images[1]);
    pokeball_der = new decoration(1075, 200, images[2]);
    background = new decoration(255, 230, images[3]);
    listaPokemon = new button(300, 400, images[4], images[5], 235, 251);
    pokedex.start();
}

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
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function updatePokedex() {
    pokedex.clear();   
    background.update();
    pokeball_izq.update();
    pokeball_der.update();
    listaPokemon.update();
}
    