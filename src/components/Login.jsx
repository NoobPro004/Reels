import { makeStyles } from "@material-ui/styles";
import React, { useContext, useEffect,useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import {Grid, TextField,Button,Paper,Card, CardActions} from '@material-ui/core';
import { CardContent,Container,CardMedia,Typography } from "@material-ui/core";
import { LocationDisabledRounded } from '@material-ui/icons';
import { Link } from "react-router-dom";
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  let {login}=useContext(AuthContext);

 let useStyles= makeStyles({
    centerDivs:{
      height:"100vh",
      // width: "100vw",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      // paddingLeft:"10vw",
      // paddingRight:"10vw",
      width:"100vw"
    },
    crousel:{
height:"10rem",
backgroundColor:"lightgray",
    },
    fullWidth:{
      display:"block",
      width:"100%"
    },
    centerElements:{
      display:"flex",
      flexDirection:"column",
      
    },
    mb:{
      marginBottom:"0.5rem",
    },
    alignCenter:{
      justifyContent:"center"
    },
    image:{
      height:"6rem",
      backgroundSize:"contain"
      
    }
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      let res = await login(email, password);
      // setUser(res.user);
      setLoader(false);
      props.history.push("/");
    } catch (err) {
      setError(true);
      setLoader(false);
      setEmail("");
      setPassword("");
    }
    
  };

  let classes=useStyles();
  return (
    
    <div className={classes.centerDivs}>
     <Container>
     <Grid container className={classes.alignCenter} spacing={2}>
        <Grid item sm={4}>
          <Paper className={classes.crousel}>Crousel</Paper>
        </Grid>
     <Grid item sm={5}>
     <Card variant="outlined">
       <CardMedia
image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhrqt1gjizoVPwJwrnyuy2JI5P_jodIWrftw&usqp=CAU"
       className={classes.image}
       >
       </CardMedia>
       <CardContent className={classes.centerElements}>
      <TextField id="outlined-basic" label="E-Mail" type="email" variant="outlined" size="small" display="block" className={classes.mb} onChange={(e)=>{ setEmail(e.target.value)}}/>

      <TextField id="outlined-basic" label="Password" type="password" variant="outlined" size="small" display="block" className={classes.mb} onChange={(e)=>{setPassword(e.target.value)}}/>
       </CardContent>
       <LinkButton
       content="Forget Password ?"
       route="/signup">
       </LinkButton>
        <CardActions>
        <Button variant="contained" color="primary" className={classes.fullWidth} onClick={handleSubmit}  disabled={loader}>Login</Button>
        </CardActions>
      </Card>
      <Card variant="outlined">
        <Typography>
          Don't have an account?
          <LinkButton
          content="Signup"
          route="/signup"
          >
          </LinkButton>
        </Typography>
      </Card>
     </Grid>
      </Grid>
     </Container>
      
    </div>
  );
}

function LinkButton(props){
  return(
    <Button variant="text" style={{color:"blue"}}>
      <Link to={props.route}>
        {props.content}
      </Link>
    </Button>
  )
}
export default Login;
