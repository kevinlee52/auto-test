import { createSlice } from "@reduxjs/toolkit";
import {getTaskList} from '../../api';

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        taskList: null
    },
    reducers:{
        getALLTaskList(state, action){
            state.taskList = action.payload;
        },
        removeTask(state, { payload}){
            let taskList = state.taskList;
            if(!Array.isArray(taskList)) return;
            state.taskList = taskList.filter(item=>{
                return +item.id !== +payload;
            })
        },
        updateTask(state, { payload}){
            let taskList = state.taskList;
            if(!Array.isArray(taskList)) return;
            state.taskList = taskList.map(item=>{
                if (+payload === +item.id) {
                    item.state = 2;
                    item.complete = new Date().toLocaleString();
                }
                return item;
            })
        }
    }
});

export let { getALLTaskList, removeTask, updateTask} = taskSlice.actions;
// console.log(getALLTaskList([]))  // =>{type: 'task/getALLTaskList', payload:[]}
export const removeTaskAction = removeTask;
export const updateTaskAction = updateTask;

// redux-thunk
export const getALLTaskListAsync = () => {
    return async dispatch => {
        let list = [];
        try {
            let result = await getTaskList(0);
            if(+result.code === 0 ) {
                list = result.list;
            }
        }catch(_) {}
        dispatch(getALLTaskList(list))
    }
};

export default taskSlice.reducer;