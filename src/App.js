import React from 'react';
import './App.css';
import p5 from 'p5';
import gameManager from './gameManager.js';
import UpdatePacket from './packets/UpdatePacket.js';
import EatPacket from './packets/EatPacket.js';

let lastx = 0;
let lasty = 0;

let blockSize = 20;

let manager = new gameManager();



let s = function( sketch ) {  

  

  sketch.setup = function() {
    sketch.fill(0);


    sketch.createCanvas(window.innerWidth-4, window.innerHeight-4);
    manager.blockHeight = sketch.height/blockSize-2;
    manager.blockWidth = sketch.width/blockSize-2;    
    sketch.frameRate(20);
    sketch.fill(0);

    sketch.rect(100 , 100 , 100 , 20);

    manager.loadButton(sketch);
  
  
  };

  sketch.draw = function(){

    sketch.background(0);
    

   

    if(manager.state !== 'playing'){
     
    
      
    }else{
  
     
      let nb = manager.others.size + 1;
      let start_text="Nombre de joueurs  " +nb;
      sketch.textFont("Courier");
      sketch.textSize(40);
      sketch.fill(100, 34, 93);
      sketch.text(start_text,0 , 30  );
        
      if (manager.snake.collision(sketch)) {
        manager.gameOver(sketch);
        return;
      }
      sketch.translate(sketch.width/2 - manager.snake.headX , sketch.height/2 - manager.snake.headY);
      if(lastx === manager.snake.headX && lasty === manager.snake.headY){
        manager.gameOver(sketch);
        return;
      }
        
      lastx = manager.snake.headX;
      lasty = manager.snake.headY;
      manager.snake.show(sketch);
      manager.snake.move(sketch);
      manager.snake.drawRelativeBorder(5000 , sketch);
    
      
      


      let packet = new UpdatePacket(manager.user);
      packet.perform(manager.rws);


     manager.others.forEach(other =>{
       
      other.show(sketch , true);
      
      other.body.forEach(element => {
        if ((manager.snake.headX === element.xpos) && 
        (manager.snake.headY === element.ypos)) {

        manager.gameOver(sketch);
      
} 
      });


      });
      

      manager.foods.forEach(food => {
        if(sketch.dist(manager.snake.headX , manager.snake.headY , food.xpos , food.ypos) <= sketch.width/2){
          food.show(sketch);
          }
      });
  

      manager.poisons.forEach(poison =>{
        if(sketch.dist(manager.snake.headX , manager.snake.headY , poison.xpos , poison.ypos) <= sketch.width/2){
         poison.show(sketch);
        }
      });
  

      
      manager.foods.forEach(food =>{
        if (food.collision(manager.snake.headX, manager.snake.headY)) {
          manager.snake.grow(food.value , sketch); 
          food.newPosition();
          let packet = new EatPacket(food , []);
          packet.perform(manager.rws);
        }
      });

   manager.poisons.forEach(poison =>{
    if (poison.collision(manager.snake.headX, manager.snake.headY)) {
      manager.gameOver(sketch);
      return;
    }
   });
    }
  }


  sketch.keyPressed = function(){

    if (sketch.keyCode === sketch.LEFT_ARROW) {
      manager.snake.changeDirectionLeft();
      
    
      return;
    }
    if (sketch.keyCode === sketch.RIGHT_ARROW) {	
      manager.snake.changeDirectionRight();
      return;
    }
    if (sketch.keyCode === sketch.UP_ARROW) {
      manager.snake.changeDirectionUp();
      return;
    }
    if (sketch.keyCode === sketch.DOWN_ARROW) {
      manager.snake.changeDirectionDown();
      return;
    }
    if (sketch.keyCode === sketch.ENTER){
      
      if(manager.state !== 'playing'){
      
        manager.startGame(sketch);   
        return;
      }
  
      
    }
  

  }

};    
// eslint-disable-next-line no-unused-vars
var myp5 = new p5(s);



function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;