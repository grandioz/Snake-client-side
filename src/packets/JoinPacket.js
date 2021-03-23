/* eslint-disable no-this-before-super */



export default class JoinPacket{

    constructor(user ){
        this.user = user;
        this.type = 'join';
    }

    perform(rws){
        rws.send(JSON.stringify(this));
    }

}