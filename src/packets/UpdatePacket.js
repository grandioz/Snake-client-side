

export default class UpdatePacket{

    constructor(user){
        this.user = user;
        this.type = "update";
    }

    perform(rws){
        rws.send(JSON.stringify(this));
    }

}