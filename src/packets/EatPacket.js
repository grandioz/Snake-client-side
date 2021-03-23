

export default class EatPacket{


    constructor(foods , poisons){
        this.foods = foods;
        this.poisons = poisons;
        this.type = 'food';
    }
    perform(rws){
        console.log(this);
        rws.send(JSON.stringify(this));
    }

}