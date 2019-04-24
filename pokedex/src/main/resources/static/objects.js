//Los grupos se usan para mover conjuntos de varios objetos de una pasada y sin modificar sus coordenadas locales
function Group(x, y) {
	this.x = x;
	this.y = y;
}

function Background() {
	this.update = function(){
		ctx = pokedex.context;  
        ctx.drawImage(pokeState.background, 255, 230);
	}
}

function Decoration(x, y, image, group) {    
    this.group = group;
    this.x = x;
    this.y = y;    
    this.img = image;
    this.update = function() {
        ctx = pokedex.context;  
        ctx.drawImage(this.img, this.group.x + this.x, this.group.y + this.y);
    }
}

//Pokeball hereda de Decoration
function Pokeball(x, y, image, direction, group) {
	Decoration.call(this, x, y, image, group);
	this.speed = 0
	this.dir = direction;
	this.cycleDone = true;
	this.countdown = 15;
	this.stateChanged = true; //flag para saber si ya se ha cambiado el estado
	//Mueve la pokeball a la derecha hasta que llegue al centro, después la devuelve a su posición
	this.rightAndBack = function() {
		if (this.dir === "right") {			
			if (this.group.x >= 398) {
				this.group.x = 398;
				this.speed = 0;
				this.dir = "left";
				this.stateChanged = false;
			}
			else {
				this.speed += 0.5;
				this.group.x += this.speed;
			}
		}
		else {	
			if (!this.stateChanged) {
				changeState();
				this.stateChanged = true;
			}
			if (this.countdown > 0)	{ //cuando llega al centro se para durante una fracción de segundo
				this.countdown--;
			}
			else if (this.group.x <= 15) {
				this.group.x = 15;
				this.speed = 0;
				this.dir = "right";
				this.cycleDone = true;
				inAnimation = false;
				this.countdown = 15;
			}
			else {
				this.speed -= 0.5;
				this.group.x += this.speed;
			}
		}
		ctx = pokedex.context;
		ctx.clearRect(0, 0, this.x + this.group.x + 295, this.y + this.group.y + 600); //Se borra la parte que cubre la pokeball
	}
	//Mueve la pokeball a la izquierda hasta que llegue al centro, después la devuelve a su posición
	this.leftAndBack = function() {
		if (this.dir === "left") {			
			if (this.group.x <= 692) {
				this.group.x = 692;
				this.speed = 0;
				this.dir = "right";
			}
			else {
				this.speed -= 0.5;
				this.group.x += this.speed;
			}
		}
		else {			
			if (this.countdown > 0)	{ //cuando llega al centro se para durante una fracción de segundo
				this.countdown--;
			}
			else if (this.group.x >= 1075) {
				this.group.x = 1075;
				this.speed = 0;
				this.dir = "left";
				this.cycleDone = true;
				inAnimation = false;
				this.countdown = 15;
			}
			else {
				this.speed += 0.5;
				this.group.x += this.speed;
			}
		}
		ctx = pokedex.context;
		ctx.clearRect(this.x + this.group.x + 10, this.y + this.group.y, pokedex.canvas.width, pokedex.canvas.height); //Se borra la parte que cubre la pokeball
	}
}

function Button(x, y, normalImage, hoverImage, width, height, group) {    
    this.group = group;
    this.x = x;
    this.y = y;    
    this.normal = normalImage;
    this.hover = hoverImage;
    this.img = normalImage;
    this.width = width;
    this.height = height;
    this.update = function() { 
        ctx = pokedex.context;
        //Button Hover
        if (pokedex.mouseX > this.x + this.group.x && pokedex.mouseX < this.x + this.group.x + this.width && pokedex.mouseY > this.y + this.group.y && pokedex.mouseY < this.y + this.group.y + this.height && pokedex.mouseX > 322 && pokedex.mouseX < 1090) {
        	if (!inAnimation) this.img = this.hover;
        }
        else {
        	this.img = this.normal;
        }
        ctx.drawImage(this.img, this.group.x + this.x, this.group.y + this.y);    
    }
}

//Hereda de button
function ArrowButton(x, y, normalImage, hoverImage, width, height, group) {
	Button.call(this, x, y, normalImage, hoverImage, width, height, group);
	var alpha = 0.0;
	this.update = function() { 
        ctx = pokedex.context;
        //Button Hover
        if (pokedex.mouseX > this.x + this.group.x && pokedex.mouseX < this.x + this.group.x + this.width && pokedex.mouseY > this.y + this.group.y && pokedex.mouseY < this.y + this.group.y + this.height) {
        	if (!inAnimation) this.img = hoverImage;
        }
        else {
        	this.img = normalImage;
        }
        if (nextPokeState.name != "mainMenu" && nextPokeState.name != "backgroundMenu" && alpha > 0.0) {
            alpha -= 0.01;
            if (alpha < 0.01) {
            	alpha = 0;
            }
        }
        else if ((nextPokeState.name === "mainMenu" || nextPokeState.name === "backgroundMenu") && alpha < 1.0) {
        	alpha += 0.01;
        }
        ctx.globalAlpha = alpha;
        ctx.drawImage(this.img, this.group.x + this.x, this.group.y + this.y); 
        ctx.globalAlpha = 1.0;
    }
}

function selectButton(x, y, normalImage, hoverImage, selectedImage, width, height, group, isSelected) {
	Button.call(this, x, y, normalImage, hoverImage, width, height, group);
	this.selected = selectedImage;
	this.isSelected = isSelected;
	this.update = function() { 
        ctx = pokedex.context;
        //Button selected
        if (this.isSelected) {
        	this.img = this.selected;
        }
        //Button Hover
        else if (pokedex.mouseX > this.x + this.group.x && pokedex.mouseX < this.x + this.group.x + this.width && pokedex.mouseY > this.y + this.group.y && pokedex.mouseY < this.y + this.group.y + this.height) {
        	if (!inAnimation) this.img = this.hover;
        }
        else {
        	this.img = this.normal;
        }
        ctx.drawImage(this.img, this.group.x + this.x, this.group.y + this.y);    
    }
}

function State(name, background, father) {
	this.name = name;
	this.background = background;
	this.father = father;
}

//para gestionar el sonido de la aplicacion
function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.isOn = false;
    document.body.appendChild(this.sound);

    this.play = function () {
        this.sound.play();
        this.isOn = true;
    }
    this.stop = function () {
        this.sound.pause();
        this.isOn = false;
    }
    this.getVolume = function () {
        return this.sound.volume;
    }
    this.setVolume = function (v) {
        this.sound.volume = v;
    }
}

//clase Pokemon para guardar pokemon nuevos en la bd
function Pokemon(){
	
	this.abilities = [];
	this.against_bug = 1;
	this.against_dark = 1;
	this.against_dragon = 1;
	this.against_electric = 1;
	this.against_fairy = 1;
	this.against_fight = 1;
	this.against_fire = 1;
	this.against_flying = 1;
	this.against_ghost = 1;
	this.against_grass = 1;
	this.against_ground = 1;
	this.against_ice = 1;
	this.against_normal = 1;
	this.against_poison = 1;
	this.against_psychic = 1;
	this.against_rock = 1;
	this.against_steel = 1;
	this.against_water = 1;	
	this.attack;
	this.base_egg_steps = 1;
	this.base_happiness = 1;
	this.base_total = 1;
	this.capture_rate = 1;
	this.classfication="";
	this.defense;
	this.experience_growth = 1;
	this.height_m;
	this.hp;
	this.japanese_name ="";
	this.name;
	this.percentage_male = 0.0;
	this.pokedex_number = 0;
	this.sp_attack;
	this.sp_defense;
	this.speed;
	this.type1;
	this.type2;
	this.weight_kg;
	this.generation;
	this.is_legendary;
	this.photos = [];
}