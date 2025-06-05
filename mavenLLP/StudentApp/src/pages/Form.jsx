import React, { useState } from 'react';
import {Box, TextField, Button} from '@mui/material';
import {useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';

const Form = () => {

  const [store, setStore] = useState(JSON.parse(localStorage.getItem("studentData")) || []);
  const navigate = useNavigate();

  const [studentData, setStudentDataData] = useState({
    id : Date.now(),
    name : "",
    class : "",
    grno : "",
    rollno : ""
  });

  const [errors, setErrors] = useState({
    name : false,
    class : false,
    grno : false,
    rollno : false
  })


  // handler for form values
  const handleChange = (e) => {
    let {name, value} = e.target;

    setStudentDataData({...studentData,[name] : value});

  }

  // handler for checking condition based no value
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors({...errors,[name] : value.trim() === ""});
  };

  // handler for remove errors 
  const handleFocus = (e) => {
    const { name } = e.target;
    setErrors({ ...errors, [name]: false });
  };

  // handler for add student record
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErros = {
      name : studentData.name.trim() === "",
      class : studentData.class.trim() === "",
      grno : studentData.grno.trim() === "",
      rollno : studentData.rollno.trim() === ""
    };

    setErrors(newErros)

    if(Object.values(newErros).includes(true))
    {
      return
    }

    setStore([...store,studentData]);
    localStorage.setItem("studentData",JSON.stringify([...store,studentData]))
    console.log(store);

    toast.success("Student record added successfully!")

    navigate("/");
  }

  return (
    <>
    <div style={{display:"flex",justifyContent:"center"}}>
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ '& .MuiTextField-root': { m: 0, width: '25ch' } }}
      noValidate
      autoComplete="off"
      style={{display:"flex",width:"500px",boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", borderRadius:"10px", padding:"30px 50px",flexDirection:"column", gap:"30px", marginTop:"50px", justifyContent:"center", alignItems:"center"}}
    >
      <h1>Student Form</h1>
      <div style={{width:"100%"}}>
        <TextField id="outlined-search" name="name" onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} value={studentData.name} style={{width:"100%", marginBottom:"10px"}} label="Student name" type="text" />
        {
          errors.name ? <span style={{color:"red"}}>Student name is required *</span> : ""
        }
      </div>
      <div style={{width:"100%"}}>
        <TextField id="outlined-search" name="class" onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} value={studentData.class} style={{width:"100%", marginBottom:"10px"}} label="Student Class" type="text" />
        {
          errors.class ? <span style={{color:"red"}}>Student class is required *</span> : ""
        }
      </div>
      <div style={{width:"100%"}}>
        <TextField id="outlined-search" name="grno" onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} value={studentData.grno} style={{width:"100%", marginBottom:"10px"}} label="Student GR.No." type="number" />
        {
          errors.grno ? <span style={{color:"red"}}>Student GR No is required *</span> : ""
        }
      </div>
      <div style={{width:"100%"}}>
        <TextField id="outlined-search" name="rollno" onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} value={studentData.rollno} style={{width:"100%", marginBottom:"10px"}} label="Student Roll No" type="number" />
        {
          errors.rollno ? <span style={{color:"red"}}>Student Roll No is required *</span> : ""
        }
      </div>
      <div style={{width:"100%"}}>
        <Button type='submit' style={{background:"blue", color:"white", padding:"12px 40px"}}>Add Data</Button>
      </div>
    </Box>
    </div>
    </>
  )
}

export default Form