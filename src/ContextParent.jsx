import React from 'react';
import {useContext} from 'react';
const Context=React.createContext("Bad Words");

export default function ContextParent() {
    return (
        <div>
            <VisitFriendsHouse></VisitFriendsHouse>
            <Context.Provider value="sweet words">
                 <VisitGrandMasHouse></VisitGrandMasHouse>
            </Context.Provider>
           
        </div>
    )
}



function VisitFriendsHouse() {
    const language=useContext(Context);
    return (
        <>
        <h1>This is my Friend's House</h1>
        <span>{language}</span>
        </>
    )
}


function VisitGrandMasHouse() {
    const language=useContext(Context);
    return (
        <>
        <h1>This is my GrandMa's House</h1>
        <span>{language}</span>
        <Context.Provider value="Abusive words">
        <WithCousins></WithCousins>
        </Context.Provider>
        </>
    )
}


function WithCousins(){
    const language=useContext(Context);
    return(
       <>
       <h1>This is my Cousins's House</h1>
       <span>{language}</span>
       </> 
    )
}
