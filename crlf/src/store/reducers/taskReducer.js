import * as TYPES from '../actionTypes';
import _ from '../../assets/utils';

const initial = {
    taskList: null
}

export default function taskReducer(state=initial, action){
    state = _.deepClone(state);
    let {taskList} = state;

    switch(action.type) {
        case TYPES.TASK_LIST:
            state.taskList = action.list;
            break;
        case TYPES.TASK_REMOVE:
            if(Array.isArray(taskList)){
                state.taskList = taskList.filter((item)=>{
                    return +item.id !== +action.id;
                });
            }
            break;
        case TYPES.TASK_UPDATE:
            if(Array.isArray(taskList)){
                state.taskList = taskList.map(item=>{
                    if(+item.id === +action.id){
                        item.state = 2;
                        item.complete = new Date().toLocaleString();
                    }
                    return item;
                })
            }
            state.taskList = action.id;
            break;
        default:
    }

    return state;
}
