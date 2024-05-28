import taskStore from "./taskStore";
import personalStore from "./personalStore";

class Store{
    constructor(){
        this.task = new taskStore(this);
        this.personal = new personalStore(this)
    }
}

export default new Store();