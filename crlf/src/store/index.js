import {createStore} from 'redux';

let initial = {
    supNum:15,
    oppNum:10
}

const reducer = function reducer(state=initial, action){

    switch(action.type) {
        case 'VOTE_SUP':
            state.supNum += 1;
            break;
        case 'VOTE-OPP':
            state.oppNum += 1;
            break;
        default:
            
    }

    return state;
}


// store.dispatch(
//     {
//         type: 'VOTE_SUP',
//         step: 10
//     }
// )


const store = createStore(reducer);

export default store;