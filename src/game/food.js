



export default class Food{
	

	constructor(value , apple , blockWidth , blockHeight , blockSize){
		this.blockSize = blockSize;
		this.blockHeight = blockHeight;
		this.blockWidth = blockWidth;

		this.id = this.randomInteger(0 , 3000);
		this.xpos = Math.round(this.randomInteger(1,blockWidth))*blockSize;
		this.ypos = Math.round(this.randomInteger(1,blockHeight))*blockSize;
		this.value = value;
		this.noise = 15;
		
	}

	show(sketch , pizza){
		
		sketch.fill(0, 255, 0)
		sketch.rect(this.xpos , this.ypos , this.blockSize , this.blockSize);
		
		
	}



	collision(x,y) {
		if ( (Math.abs(this.xpos - x) < this.noise)  &&
			(Math.abs(this.ypos - y) < this.noise)) {
			this.destroy = true;
			return true;
		}
		return false;
	}	


	newPosition() {
	    this.xpos= Math.round(this.randomInteger(-2000/20-2,2480/20-2))*20;
    this.ypos = Math.round(this.randomInteger(-2000/20-2,2480/20-2))*20;
	}
	

	randomInteger(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	  }

}


