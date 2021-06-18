import react,{useState} from "react";
import './App.css';
import auth from "./firebase";

function App() {
  const [email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[error,setError]=useState(false);
  const[user,setUser]=useState(null);
  const[loader,setLoader]=useState(false);
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
      setLoader(false);
      setError(true);
    }
  }
  return (
    error==true?<h1>Failed to Login</h1>:
    loader==true ? <h1>Loading....</h1> :
   user!=null ? <h1>User Logged In {user.uid}</h1> : <>
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
