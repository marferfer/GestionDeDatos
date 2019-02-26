function Decoration(x, y, image) {
    this.x = x;
    this.y = y;    
    this.img = image;
    this.update = function() {
        ctx = pokedex.context;
        ctx.drawImage(this.img, this.x, this.y);    
    }
}

//Pokeball hereda de Decoration
function Pokeball(x, y, image, direction) {
	Decoration.call(this, x, y, image);
	this.speed = 0
	this.dir = direction;
	this.cycleDone = true;
	this.countdown = 15;
	//Mueve la pokeball a la derecha hasta que llegue al centro, después la devuelve a su posición
	this.rightAndBack = function() {
		if (this.dir === "right") {			
			if (this.x >= 398) {
				this.x = 398;
				this.speed = 0;
				this.dir = "left";
			}
			else {
				this.speed += 0.5;
				this.x += this.speed;
			}
		}
		else {	
			if (this.countdown > 0)	{ //cuando llega al centro se para durante una fracción de segundo
				this.countdown--;
			}
			else if (this.x <= 15) {
				this.x = 15;
				this.speed = 0;
				this.dir = "right";
				this.cycleDone = true;
				inAnimation = false;
				this.countdown = 15;
			}
			else {
				this.speed -= 0.5;
				this.x += this.speed;
			}
		}
		ctx = pokedex.context;
		ctx.clearRect(0, 0, this.x + 295, this.y + 600); //Se borra la parte que cubre la pokeball
	}
	//Mueve la pokeball a la izquierda hasta que llegue al centro, después la devuelve a su posición
	this.leftAndBack = function() {
		if (this.dir === "left") {			
			if (this.x <= 692) {
				this.x = 692;
				this.speed = 0;
				this.dir = "right";
			}
			else {
				this.speed -= 0.5;
				this.x += this.speed;
			}
		}
		else {			
			if (this.countdown > 0)	{ //cuando llega al centro se para durante una fracción de segundo
				this.countdown--;
			}
			else if (this.x >= 1075) {
				this.x = 1075;
				this.speed = 0;
				this.dir = "left";
				this.cycleDone = true;
				inAnimation = false;
				this.countdown = 15;
			}
			else {
				this.speed += 0.5;
				this.x += this.speed;
			}
		}
		ctx = pokedex.context;
		ctx.clearRect(this.x + 10, this.y, pokedex.canvas.width, pokedex.canvas.height); //Se borra la parte que cubre la pokeball
	}
}

function Button(x, y, normalImage, hoverImage, width, height) {
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
        if (pokedex.mouseX > this.x && pokedex.mouseX < this.x + this.width && pokedex.mouseY > this.y && pokedex.mouseY < this.y + this.height) {
        	this.img = hoverImage;
        }
        else {
        	this.img = normalImage;
        }
        ctx.drawImage(this.img, this.x, this.y);    
    }
}