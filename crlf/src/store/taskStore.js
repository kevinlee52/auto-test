import {observable, action, runInAction, makeObservable, makeAutoObservable} from 'mobx';
import { getTaskList } from '../api';

export default class taskStore{
    constructor(rootStoreInstance){
        this.root = rootStoreInstance;
        //mobx 6
        // makeObservable(this, {
        //     taskList: observable,
        //     queryAllTaskAction: action.bound,
        //     removeTaskAction: action.bound,
        //     updateTaskAction: action.bound,
        // })
        //or 
        makeAutoObservable(this);

    }
    // mobx 5
    // @observable tasklist = null;
    // mobx 6
    tasklist = null;

    // @action.bound async queryAllTaskAction(){
    async queryAllTaskAction(){
        let list = [];
        try{
            let res = await getTaskList(0);
            if(+res.code === 0) {
                list = res.list;
            }
        }catch(_) {}
        runInAction(()=>{
            this.taskList = list;
        })
    }

    // @action.bound removeTaskAction(id){
    removeTaskAction(id){
        let taskList = this.taskList;
        if(!Array.isArray(taskList)) return;
        this.taskList = taskList.filter(item=>{
            return +item.id !== +id
        })
    }

    // @action.bound updateTaskAction(id){
    updateTaskAction(id){
        let taskList = this.taskList;
        if(!Array.isArray(taskList)) return;
        this.taskList = taskList.map(item=>{
            if(+item.id === +id){
                item.state = 2;
                item.complete = new Date().toLocaleString();
            }
            return item;
        })
    }
}