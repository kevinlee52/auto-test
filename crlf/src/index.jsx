// /** ES6 API compatible */
// import 'react-app-polyfill/ie9';
// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';


import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
import '@/index.less';
import { each } from './handleJsx';
import DemoReact from '@/views/demoReact';

let arr = [10,20]
arr[Symbol('AA')] = 200;
// Array.prototype.BB = 100;
each(arr, (...args)=>{
  console.log(...args)
})



const root = ReactDOM.createRoot(document.getElementById('root'));

// let jian_data;

fetch('/jian/subscriptions/recommended_collections')
.then(resp=>resp.json())
.then(data=>{
  // console.log(data);
  // jian_data=[...data];
});



// fetch('/zhi/news/latest')
// .then(resp=>resp.json())
// .then(data=>console.log(data));

let styObj = {
  color: 'pink'
}

let x = 10, y = 20;

root.render(
  <>
    <h2 className='title' style={styObj}>Test</h2>
    <div className='box'><span>{x}</span><span>{y}</span></div>
    {React.createElement('button', null, 'createElementButton')}
    <DemoReact></DemoReact>
  </>
  // <React.StrictMode>
    // <App />
  // </React.StrictMode>
);


// console.log(<>
//   <h2 className='title' style={styObj}>Test</h2>
//   <div className='box'><span>{x}</span><span>{y}</span></div>
// </>);



// console.log(
//   createElement(React.Fragment, null, 
//     createElement(
//       "h2", 
//       { className: "title", style: styObj}, 
//       "Test"
//     ), 
//     createElement(
//       "div", 
//       { className: "box" }, 
//       createElement("span", null, x), 
//       createElement("span", null, y)
//     )
//   )
// );


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
