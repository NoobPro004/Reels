import react,{useState,useEffect} from "react";
import './App.css';
import auth from "./firebase";

function App() {
  const [email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[error,setError]=useState(false);
  const[user,setUser]=useState(null);
  const[loader,setLoader]=useState(false);
  const[mainLoader,setMainLoader]=useState(true);
// user -> user data
// loading
// error -> error show

  const handleSubmit=async()=>{
    try{
      setLoader(true);
      let res=await auth.signInWithEmailAndPassword(email,password);
      setUser(res.user);
      setLoader(false);
    }catch(err){
      setError(true);
      setLoader(false);
      setEmail("");
      setPassword("");
    }
  }
const handleLogout=async ()=>{

  setLoader(true);
  await auth.signOut();
  setUser(null);
  setLoader(false);
}


  useEffect(() => {
    auth.onAuthStateChanged(user =>{
      setUser(user);
      setMainLoader(false);
    }) 
  },[])

  return (
    mainLoader==true?<h1>Wait for Sec</h1>:
    // error==true?<h1>Failed to Login</h1>:
    loader==true ? <h1>Loading....</h1> :
   user!=null ? <>
   <h1>User Logged In {user.uid}</h1>
   <button onClick={handleLogout}>Sign Out</button>
    </>: <>
   <h1>FireBase Login</h1>
   <input type="email" value={email} onChange={(e)=>{
     setEmail(e.target.value);
     // console.log(email);
   }}></input>
   <input type="password" value={password} onChange={(e)=>{
     setPassword(e.target.value);
   }}></input>
   <input type="button" value="submit" onClick={handleSubmit}></input>
   </>
  );
}

export default App;
