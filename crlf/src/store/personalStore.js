import {observable, action, makeAutoObservable} from 'mobx';

export default class taskStore{
    constructor(){
        makeAutoObservable(this);
    }
    tasklist = null;

    async queryAllTaskAction(){

    }

    removeTaskAction(id){}

    updateTaskAction(id){}
}