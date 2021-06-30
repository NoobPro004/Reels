import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import SendIcon from '@material-ui/icons/Send';
import {IconButton} from '@material-ui/core'
import { Icon } from '@material-ui/core';
function Buttons() {
    return (
        <div>
            <h2>Buttons</h2>
          <Button variant="outlined">Hello</Button>  
          <Button variant="text">Hello</Button>  
          <Button variant="contained">Hello</Button> 
          <h2>Colors & event listener</h2> 
          {/* inline styling */}
          <Button variant="outlined" color="primary" style={{marginRight:"7px",
          backgroundColor:"pink"}
    }>Hello</Button>  
          <Button variant="text" onClick={()=>{alert("hello")}}>Hello</Button>  
          <Button variant="contained" color="secondary" href="https://material-ui.com/components/buttons/#button">Hello</Button>


          <h2>Icons</h2>
          <Button color="primary" variant="contained" startIcon={<SendIcon></SendIcon>} style={{marginRight:"8px"}}>Send</Button>
          <Button color="primary" variant="contained"endIcon={<DeleteSweepIcon></DeleteSweepIcon>}>Delete</Button>

          <h2>Size</h2>
          <Button color="primary" variant="contained" startIcon={<SendIcon></SendIcon>} style={{marginRight:"8px"}} size="small">Send</Button>
          <Button color="primary" variant="contained"endIcon={<DeleteSweepIcon></DeleteSweepIcon>} size="large">Delete</Button>


          <h2>Icons</h2>
          <IconButton>
          <SendIcon></SendIcon>
          </IconButton>
          <IconButton>
          <DeleteSweepIcon onClick={()=>{alert("delete")}}></DeleteSweepIcon>
          </IconButton>
        </div>
    )
}

export default Buttons
