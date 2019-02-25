function decoration(x, y, image) {
    this.x = x;
    this.y = y;    
    this.img = image;
    this.update = function() {
        ctx = pokedex.context;
        ctx.drawImage(this.img, this.x, this.y);    
    }
}

function button(x, y, normalImage, hoverImage, width, height) {
    this.x = x;
    this.y = y;    
    this.normal = normalImage;
    this.hover = hoverImage;
    this.img = normalImage;
    this.width = width;
    this.height = height;
    this.update = function() {
        ctx = pokedex.context;
        if (pokedex.mouseX > this.x && pokedex.mouseX < this.x + this.width && pokedex.mouseY > this.y && pokedex.mouseY < this.y + this.height) {
        	this.img = hoverImage;
        }
        else {
        	this.img = normalImage;
        }
        ctx.drawImage(this.img, this.x, this.y);    
    }
}