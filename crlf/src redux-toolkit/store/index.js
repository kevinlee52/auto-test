import { configureStore } from '@reduxjs/toolkit';
import reduxLogger from 'redux-logger';
// import reduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import ttaskSliceReducer from './features/taskSlice';

const store = configureStore({
    reducer: {
        // module manage each
        task: ttaskSliceReducer
    },
    // middleware default as redux-thunk if not defined
    middleware:[reduxLogger, reduxThunk] 
});

export default store;