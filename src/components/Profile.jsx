// rfce

import React, { useContext, useEffect } from "react";


function Profile() {
    useEffect(()=>{
        console.log("profile is rendered");
      });
    return (
        <div>
            Profile
        </div>
    )
}

export default Profile
