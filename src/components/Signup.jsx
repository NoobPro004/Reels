import React, { useContext, useEffect,useState } from "react";
import {AuthContext} from '../context/AuthProvider';
import {storage,firestore,database} from '../firebase';
function Signup(props) {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const[file,setFile]=useState(null);
  let { signup } = useContext(AuthContext);

  function handleFileSubmit(e){
      let file=e?.target?.files[0];
      if(file!=null){
          console.log(e.target.files[0]);
          setFile(e.target.files[0]);

      }
  }

 async function handleSignup(e){
     e.preventDefault();
      try{
          setLoader(true);
       let res= await signup(email,password);
       let uid=res.user.uid;
      const uploadTaskListner= storage.ref(`/users/${uid}/profileImage`).put(file);
    //   fn1 -> progress
    // fn2 -> error
    //  fn3 -> success
      uploadTaskListner.on('state_changed',fn1,fn2,fn3);
      function fn1(snapshot){
          var progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
          console.log(progress);
      }
          function fn2(error){
              setError("");
              setLoader(false);
          }

         async function fn3(){
           let downloadurl =await uploadTaskListner.snapshot.ref.getDownloadURL();
           database.users.doc(uid).set({
               email:email,
               userId:uid,
               username:username,
               createdAt:database.getUserTimeStamp(),
               profileUrl:downloadurl,
               postIds:[]
           })
           setLoader(false);
           props.history.push("/");
          }
      }catch(err){
          setError("");
          setLoader(false);
      }
  }
  return (
    <div>
      <form onSubmit={handleSignup}>
      <div>
          <label htmlFor="">UserName</label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
                setUserName(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="">Profile Image</label>
          <input
            type="file" accept="image/*"
           
            onChange={(e) => {
              handleFileSubmit(e);
            }}
          />
        </div>
        <button type="submit" disabled={loader}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Signup;
