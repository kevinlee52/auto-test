// /** ES6 API compatible */
// import 'react-app-polyfill/ie9';
// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';


import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
import '@/index.less';

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
  </>
  // <React.StrictMode>
    // <App />
  // </React.StrictMode>
);


console.log(<>
  <h2 className='title' style={styObj}>Test</h2>
  <div className='box'><span>{x}</span><span>{y}</span></div>
</>);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
