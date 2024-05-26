import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers'
import reduxPromise from 'redux-promise';
import reduxLogger from 'redux-logger';



const store = createStore(reducer, applyMiddleware(reduxPromise, reduxLogger));

export default store;