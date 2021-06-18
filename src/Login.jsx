import logo from './logo.svg';
import react,{useState} from "react";
import './App.css';

function Login() {
  const [email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const handleSubmit=()=>{
    console.log(email,password);
  }
  return (
    <>
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

export default Login;
