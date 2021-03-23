/*
   Date: 4th of August 2017
   version 0.1
   All source under GPL version 3 or latter
   (GNU General Public License - http://www.gnu.org/)
   contact martin@linux.com for more information about this code
*/

import Block from './block.js';


export default class Snake{

	constructor(headX, headY , sketch ,blockHeight ,blockWidth , blockSize , direction , body , speed , growing) {
		this.headX = headX;
		this.headY = headY;
		this.blockHeight = blockHeight;
		this.blockWidth = blockWidth;
		this.blockSize = blockSize;
		this.body = body;
		this.direction = direction;
		this.speed = speed;
		this.growing = growing;
		console.log(body);
	
		var b = new Block(this.headX + this.blockSize, this.headY, 
				  this.blockSize );
		this.body.push(b);
	}	

	show(sketch , isEnnemy){
	
		
		sketch.fill(200);
		sketch.rect(this.headX,this.headY,this.blockSize,this.blockSize);
		for (var i = 0; i < this.body.length; i++) {
			
							this.body[i].show(sketch , isEnnemy);
			
					
		}
	}	

	grow(v) {
		this.growing = this.growing + v;
	}
	move(sketch) {
		var len = this.body.length;
		var oldPosX;
		var oldPosY;
		var b;
	
		if (this.growing === 0) {
			for (var i = 1; i < len; i = i + 1) {
				oldPosX = this.body[i].xpos;
				oldPosY = this.body[i].ypos;
				this.body[i-1].newPosition(oldPosX,oldPosY);
			}
			this.body[len-1].newPosition(this.headX,this.headY);
		} else {
			
				
		 b = new Block(this.headX , this.headY , 
			this.blockSize );
			this.body.push(b);
			this.growing = this.growing - 1;; 
		}
	
		if (this.direction === "WEST") {
			this.headX = this.headX - this.blockSize;
		}
		if (this.direction === "NORTH") {
			this.headY = this.headY - this.blockSize;
		}
		if (this.direction ==="SOUTH") {
			this.headY = this.headY + this.blockSize;
		}
		if (this.direction === "EAST") {
			this.headX = this.headX + this.blockSize;
		}
		
	}

	changeDirectionUp() {
		if (this.direction !== "SOUTH") {
			this.direction = "NORTH";
		
		}
	}

changeDirectionDown() {
	if (this.direction !== "NORTH") {
		this.direction = "SOUTH";
	}
}

changeDirectionLeft() {
	if (this.direction !== "EAST") {
		this.direction = "WEST";
	}
}

changeDirectionRight() {
	if (this.direction !== "WEST") {
		this.direction = "EAST";
	}
}

c

collision(sketch) {
	var i;


	if(this.direction === 'NORTH' && this.headY <= -2000 ){
		return true;
	}

	if(this.direction === 'SOUTH' && this.headY >= 2500 ){
		return true;
	}

	if(this.direction === 'WEST' && this.headX <= -2000 ){
		return true;
	}

	if(this.direction === 'EAST' && this.headX >= 2520 ){
		return true;
	}

	for (i = 0; i < this.body.length-1; i++) {
		if ((this.headX === this.body[i].xpos) && 
	            (this.headY === this.body[i].ypos)) return true;
	}

	return false;
}



drawRelativeBorder(mapSize , sketch){
	if(Math.abs(mapSize/2) - Math.abs(this.headY)-700 < sketch.height/2){
		
		sketch.fill(167);
		if(this.headY> 0){
			sketch.rect(-mapSize/2 , mapSize/2 , mapSize , 1000);
	
		}else{
			sketch.rect(-mapSize/2 , -mapSize/2-500 , mapSize , 1000);
			}
		}

		if(Math.abs(mapSize/2) - Math.abs(this.headX) -700< sketch.height/2){
			
			sketch.fill(167	);
			if(this.headX> 0){
				
				sketch.rect(	mapSize/2 , -mapSize/2 , 1000 , mapSize+1000);
		
			}else{
				sketch.rect(-mapSize/2-500 , -mapSize/2 , 1000 , 	mapSize+1000 );
				}
			}

}




}