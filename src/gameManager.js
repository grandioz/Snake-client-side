



import ReconnectingWebSocket from 'reconnecting-websocket';
import User from './user.js';
import Snake from './game/snake.js';
import Html5Websocket from 'html5-websocket';
import JoinPacket from './packets/JoinPacket.js';
import LeavePacket from './packets/LeavePacket.js';
import Block from './game/block.js';
import Food from './game/food.js';
import Poison from './game/poison.js';


export default class gameManager{

 constructor(){
     this.blocksize = 20;
     this.foods = new Map([]);
     this.poisons = new Map([]);
     this.button = undefined;
     this.blockHeight = undefined;
     this.blockWidth = undefined;
     this.others = new Map([]);
     this.frameRate = 20;
     this.state = 'à l aise la falaise';
     this.snake =  undefined;
     this.button = undefined;
   
    

 }


  initConnection(sketch){
    this.rws = new ReconnectingWebSocket('ws://localhost:8021/', undefined , {constructor: Html5Websocket});
    

    this.rws.addEventListener('open' , ()=> {
       
       this.connected = true;
    });

    this.rws.addEventListener('message' , (message) =>{
      
     let packet = JSON.parse(message.data);

     if(packet.type === 'join'){
      let info = packet.user.snake;
   
      let sk = this.others.get(packet.user.id);
      if(sk === undefined){
       this.others.set(packet.user.id , new Snake(info.headX , info.headY , sketch , info.blockHeight , info.blockWidth , info.blockSize , info.direction  , this.getBlocksArray(info.body) , info.speed , info.growing));
      }else{
       sk.direction = info.direction;
       sk.headX = info.headX;
       sk.headY = info.headY;
       sk.growing = info.growing;
       sk.body = this.getBlocksArray(info.body);
      } 
    
  }


  if(packet.type === 'welcome'){
 
    this.foods = this.getFoodAray(packet.foods);
    this.poisons = this.getPoisonAray(packet.poisons);

  }

  if(packet.type === 'leave'){

    let info = packet.user;
    this.others.delete(info.id);
   
   
     }


     if(packet.type === 'allusers'){

      let list = packet.users;
      list.forEach(info =>{
        this.others.set(info.id , new Snake(info.snake.headX , info.snake.headY , sketch , info.snake.blockHeight , info.snake.blockWidth , info.snake.blockSize , info.snake.direction  , this.getBlocksArray(info.snake.body) , info.snake.speed , info.snake.growing));
      });
      
     
       }
  


     if(packet.type === 'food'){


      let food = new Food(5 , 1 , this.blockWidth , this.blockHeight , 20);
      food.xpos = packet.food.xpos;
      food.ypos = packet.food.ypos;
      food.id = packet.food.id;
      this.foods.set(food.id , food);
      this.foods.delete(packet.removeId);

      let poison = new Poison(1 , this.blockHeight , this.blockWidth , this.blocksize);
      poison.xpos = packet.poison.xpos;
      poison.ypos = packet.poison.ypos;
      poison.id = packet.poison.id;
      this.poisons.set(poison.id , poison);
      

       }


  if(packet.type === 'update'){

    let info = packet.user.snake;
   
     let sk = this.others.get(packet.user.id);
     if(sk === undefined){
      this.others.set(packet.user.id , new Snake(info.headX , info.headY , sketch , info.blockHeight , info.blockWidth , info.blockSize , info.direction  , this.getBlocksArray(info.body) , info.speed , info.growing));
      }else{
      sk.direction = info.direction;
      sk.headX = info.headX;
      sk.headY = info.headY;
      sk.growing = info.growing;
      sk.body = this.getBlocksArray(info.body);
 
     }

  
 }

    });
  }

  gameOver(sketch) {
    var start_text="Game Over. Points = " + this.snake.body.length;
    sketch.textFont("Courier");
    sketch.textSize(40);
    sketch.fill(237, 34, 93);
    sketch.text(start_text,0.5*(sketch.width-sketch.textWidth(start_text)),0.5*(sketch.height-16));
    this.state = 'none';
    this.loadButton(sketch);
    this.foods.length = 0;
    this.snake.length = 0;
    this.poisons.length = 0;

    let packet = new LeavePacket(this.user);
    packet.perform(this.rws);
    this.others = new Map([]);

   
  }

  
  startGame(sketch){
    this.initConnection(sketch);
   
    this.others.clear();
	this.unLoadButton();
	this.state = 'playing';
	let s = new Snake(Math.round(this.randomInteger(-1000 , 1000)/20)*20,Math.round(this.randomInteger(-1000 , 1000)/20)*20,sketch , sketch.height , sketch.width,20  , 'WEST' , [] , 1 , 0) ;;
  this.snake = s;  
  
    this.user = new User(this.randomInteger(1 , 1000) , s);
    let packet = new JoinPacket(this.user);
    packet.perform(this.rws);



}

unLoadButton(){
	this.button.remove();
}

 loadButton(sketch){

	this.button = sketch.createButton('Commencer la partie');
	this.button.position(1000/2, 300);
	this.button.size(200 , 40);
	this.button.mousePressed(() => {
    this.startGame(sketch);
   
  });
	this.button.style('box-shadow: inset 9px 2px 95px 1px #ff9900');

}


randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
 getBlocksArray(array){

  let body = [];
  array.forEach(element => {
  let block = new Block(element.xpos , element.ypos , element.size );
  body.push(block);  
  });

  return body;

 }

 getFoodAray(array){

  let f = new Map([]);
  let keysArray = Object.keys(array);
 keysArray.forEach(key=>{
   let element = array[key];
    let food = new Food(5 , 1 , this.blockWidth , this.blockHeight , this.blocksize);
    food.xpos = element.xpos;
    food.ypos = element.ypos;
    food.id =element.id;
    f.set(food.id , food);
    
  });
return f;
 }
 getPoisonAray(array){

  let f = new Map([]);
  let keysArray = Object.keys(array);
  keysArray.forEach(key=>{
    let element = array[key];
    let poison = new Poison( 1 , this.blockWidth , this.blockHeight , this.blocksize);
    poison.xpos = element.xpos;
    poison.ypos = element.ypos;
    poison.id = element.id;
    f.set(poison.id , poison);
  });
return f;
 }

}