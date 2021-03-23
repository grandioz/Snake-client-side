
export default class LeavePacket{

    constructor(user){
        this.user = user;
        this.type = 'leave';
    }

    perform(rws){
        rws.send(JSON.stringify(this));
    }

}