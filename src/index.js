import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ContextParent from './ContextParent';
import Login from './Login';
import Material from './Material';
import IntersectionDemo from './intersectionObserver/IntersectionDemo'
ReactDOM.render(

  <App></App>,
  // <IntersectionDemo></IntersectionDemo>,

  // <Material></Material>,
  // <ContextParent></ContextParent>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
