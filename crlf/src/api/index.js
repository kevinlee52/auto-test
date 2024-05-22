import http from "./http";

// export const getTaskList = (state=0)=>{
//     return http.get('/getTaskList', {
//         params:{
//             state
//         }
//     })
// }

export const getTaskList = (state=0)=>{
    return {code:0, list:[
        {
            id:1,
            task:'task1',
            state:1,
            time:'2023-12-21 18:00:00',
            complete:'2023-10-21 18:00:00',
        },
        {
            id:2,
            task:'task2',
            state:2,
            time:'2023-12-21 18:00:00',
            complete:'2023-10-21 18:00:00'
        }
    ]}
}






export const addTask = (task, time)=> {
    return http.post('/addTask', {
        task,
        time
    })
}

export const removeTask = (id)=> {
    return http.get('/removeTask', {
        params:{
            id
        }
    })
}

export const completeTask = (id)=> {
    console.log('completeTask')
    // fetch('/zhi/news/latest').then(res=>res.json()).then(data=>console.log(data))
    return http.get('/zhi/news/latest', {
        params:{
            id
        }
    })
    
}