/*
   Date: 3th of Oktober 2017
   version 0.1
   All source under GPL version 3 or latter
   (GNU General Public License - http://www.gnu.org/)
   contact martin@linux.com for more information about this code
*/

export default class Poison {
	
	constructor(spike , blockHeight , blockWidth , blockSize){
		this.blockSize = blockSize;
		this.blockHeight = blockHeight;
		this.blockWidth = blockWidth;
		this.xpos = Math.round(this.randomInteger(1,blockWidth))*blockSize;
		this.ypos = Math.round(this.randomInteger(1,blockHeight))*blockSize;
		this.id = this.randomInteger(1, 3000);
		this.noise = 15;
	
		
	}

show(sketch) {
	
	sketch.fill(255, 204, 0);
	sketch.rect(this.xpos , this.ypos , 20 , 20);
	
}

collision(x,y) {
	if ( (Math.abs(this.xpos - x) < this.noise)  &&
		(Math.abs(this.ypos - y) < this.noise)) {
		this.destroy = true;
		return true;
	}
	return false;
}

newPosition(sketch) {
	this.xpos= Math.round(this.randomInteger(-2000/20-2,2480/20-2))*20;
    this.ypos = Math.round(this.randomInteger(-2000/20-2,2480/20-2))*20;
}

randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}

