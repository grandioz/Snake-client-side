

export default class Block{
	
	
constructor(xpos, ypos, size) {
	this.xpos = xpos;
	this.ypos = ypos;
	this.size = size
	}

	show(sketch , isEnnemy) {

		if(isEnnemy === true){
			sketch.fill(250 , 150, 10);
		}else{
			sketch.fill(237, 34, 93); 
		}

	sketch.noStroke();
	sketch.rect(this.xpos,this.ypos,this.size,this.size);
	}
	
		newPosition(x,y) {
		this.xpos = x;
		this.ypos = y;
	}
	


}




