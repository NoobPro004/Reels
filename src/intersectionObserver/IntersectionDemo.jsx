import React from "react";
import v1 from "./mountain.mp4";
import v2 from "./hill.mp4";
import v3 from "./red.mp4";
import v4 from "./water.mp4";

import "./inter.css";
import { useEffect } from "react";
import { element } from "prop-types";
function IntersectionDemo() {
function callBack(entries){
    console.log(entries);
    entries.forEach((entry)=>{
        let child=entry.target.children[0];
        // console.log(child.id);
        //  play -> async work
        // //  pause -> sync work
        // if(entry.isIntersecting){
        //     console.log(child.id);
        // }else{
        //     console.log(child.id);
        // }
        child.play().then(function(){
            if(entry.isIntersecting==false){
                child.pause();
            }
        })
    })
 
  
}
    useEffect(function fn(){
        let conditionObject={
            // full ui
            root:null,
            threshold:"0.9"
        };

       let observer = new IntersectionObserver(callBack,conditionObject);
       let elements=document.querySelectorAll(".video-container");
       elements.forEach((e1)=>{
           observer.observe(e1);
       })
    },[])
  return (
    <div class>
      <div className="video-container">
        <Video src={v1} id="a"></Video>
      </div>
      <div className="video-container">
        <Video src={v2} id="b"></Video>
      </div>
      <div className="video-container">
        <Video src={v3} id="c"></Video>
      </div>
      <div className="video-container">
        <Video src={v4} id="d"></Video>
      </div>
    </div>
  );
}

export default IntersectionDemo;

function Video(props) {
  

  return (
    <video className="video-styles" muted="true" controls>
      <source
        src={props.src}
        
        type="video/mp4"
      ></source>
    </video>
  );
}
