// /** ES6 API compatible */
// import 'react-app-polyfill/ie9';
// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';


import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
import Task from './views/Task func';
// import Hooks from './views/Hooks'
import '@/index.less';
import ThemeContext from './ThemeContext';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    {/* <h2 className='title' style={styObj}>Test</h2>
    <div className='box'><span>{x}</span><span>{y}</span></div>
    {React.createElement('button', null, 'createElementButton')}
    <DemoReact></DemoReact> */}
    <ThemeContext.Provider value={{store}}>
    <Task></Task>
    {/* <Hooks></Hooks> */}
    </ThemeContext.Provider>
  </>
  // <React.StrictMode>
    // <App />
  // </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
