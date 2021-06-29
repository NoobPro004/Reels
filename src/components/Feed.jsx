import React,{useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/AuthProvider';

function Feed() {
    // useEffect(()=>{
    //     console.log("feed is rendered");
    //   });
    const [loading,setLoading]=useState(false);
    const {signout}=useContext(AuthContext);

    const handleLogout=async ()=>{
        try{
            setLoading(true);
            await signout();
            setLoading(false);
        }catch(err){
            console.log(err);
            setLoading(false);
        
        }
    }
    return (
        <div>
            feed
            <button onClick={handleLogout} disabled={loading}>Logout</button>
        </div>
    )
}

export default Feed
