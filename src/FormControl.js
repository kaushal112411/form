import React, { useState ,useEffect} from 'react';
import { TextField,Button,Paper,Typography } from '@material-ui/core';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
const FormControl = () => {
      
     const [data,setData] = useState([]);
     const [fd,setFd] = useState('');
     const [title,setTitle] = useState('')
     const [body,setBody] = useState('');
     const [success, setSuccess] = useState(false)
     const [formD,setFormD] = useState({
        Title : "",
        Body : "",
        usrerId :"",
     })
     const [open, setOpen] = React.useState(false);
     const [error,setError] = useState(false);

     const handleClickOpen = () => {
       setOpen(true);
     };
   
     const handleClose = () => {
       setOpen(false);
     };
     const api = "https://jsonplaceholder.typicode.com/users"
    useEffect(()=>{
       axios.get(api)
       .then((res)=>{
          console.log(res)
          setData(res.data)
       })
       .catch((err)=>{
        console.log(err.message)
       })
    },[])
    const postApi =()=>{
        axios.post("https://jsonplaceholder.typicode.com/posts",formD)
        .then((res)=>{
            console.log(formD)
            console.log(res.data)
            setSuccess(true)
            handleClickOpen()
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
    const handleSubmit = (e)=>{
         e.preventDefault()
        console.log(title)
        console.log(body)
        console.log(fd)
         setFormD({
            Title : title,
            Body :  body,
            usrerId :fd,
         }
         )
         if(title.length === 0 || body.length === 0 ){
            setError(true)
         }
         if(title && body){
            postApi();
         }
         
    }
        const handleChange = (event) => {
            setFd(event.target.value);
          };
    return (
        <div>
            <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",width:"20%",alignItems:"center",backgroundColor:"#cad9ca"}}>
            <InputLabel>users</InputLabel>
        <NativeSelect
          id=""
          value={fd}
          error = {fd === ""}
          helperText = {fd === "" ? "please select user!" : " "}
          onChange={handleChange}
          style={{
            padding: "0.3rem",
            marginBottom: "0.5rem",
            borderRadius: "0.4rem",
          }}
          variant="outlined"
        >
          <option aria-label="None" value="" />
          {
            data.map((item)=>{
                return <option value={item.id}>{item.name}</option>
            })
          
         }
          
        </NativeSelect>
        <TextField
          label="title"
          variant="outlined"
          value={title}
          error = {error && title.length===0}
          helperText={error && title.length===0 ? "please enter title!" : ""}
          //ref={register({ required: true })}
          onChange={(e)=>{
             setTitle(e.target.value)
          }}
          style={{ padding: "0.1rem",
          marginBottom: "0.5rem",
          borderRadius: "0.4rem",}}
        />
         <TextField
          label="body"
          variant="outlined"
          value={body}
          error = {error && body.length === 0}
          helperText={error && body.length === 0 ? "please enter body!" : " "}
          onChange={(e)=>{
             setBody(e.target.value)
          }}
          style={{padding:"10px"}}
        />
        <Button type='submit' color='primary' variant='contained'>submit</Button>
            </form>
            { success &&

        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <Alert variant="filled" severity="success" style={{width:"250px"}}>
                data posted successfully
             </Alert>
          </DialogContentText>
        </DialogContent>
      </Dialog>






          
            }
        </div>
    );
};

export default FormControl;