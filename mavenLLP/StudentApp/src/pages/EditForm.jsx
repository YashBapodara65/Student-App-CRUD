import React, { useEffect, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const EditForm = () => {
  const [store, setStore] = useState(
    JSON.parse(localStorage.getItem("studentData")) || []
  );
  const [studentData, setStudentData] = useState({
    id: "",
    name: "",
    class: "",
    grno: "",
    rollno: "",
  });

  // get id value from the URL
  let { id } = useParams();
  // used for navigate route
  let navigate = useNavigate();

  // only once time call
  useEffect(() => {
    if (!id) {
      navigate("/");
    } else {
      let res = store.filter((item) => item.id === Number(id));
      setStudentData(res[0]);
    }
  }, []);

  // used for change student field data
  const handleChange = (e) => {
    let { name, value } = e.target;

    setStudentData({ ...studentData, [name]: value });
  };

  // handler for update student record
  const handleSubmit = (e) => {
    e.preventDefault();

    let updateData = store.map((item) => {
      if (item.id === Number(id)) {
        return studentData;
      } else {
        return item;
      }
    });
    setStore(updateData);
    localStorage.setItem("studentData", JSON.stringify(updateData));
    toast.success("Student data updated!");
    navigate("/");
  };

  return (
    <>
      <div style={{display:"flex",justifyContent:"center"}}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ "& .MuiTextField-root": { m: 0 } }}
        noValidate
        autoComplete="off"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          marginTop: "50px",
          width:"700px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", 
          borderRadius:"10px",
          padding : "40px 0px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Edit Student Form</h1>
        {[
          {
            name: "name",
            type: "text",
            value: studentData.name,
            label: "Student Name",
          },
          {
            name: "class",
            type: "text",
            value: studentData.class,
            label: "Student Class",
          },
          {
            name: "grno",
            type: "number",
            value: studentData.grno,
            label: "Student GR. No.",
          },
          {
            name: "rollno",
            type: "number",
            value: studentData.rollno,
            label: "Student Roll No.",
          },
        ].map((inputItem,index) => {
          return (
            <div key={index} style={{ width: "70%" }}>
              <TextField
                id="outlined-search"
                name={inputItem.name}
                onChange={handleChange}
                value={inputItem.value}
                style={{ width: "100%" }}
                label={inputItem.label}
                type={inputItem.type}
              />
            </div>
          );
        })}
        <div
          style={{
            width: "70%",
            display: "flex",
            justifyContent: "flex-end",
            gap: "20px",
          }}
        >
          <Button
            type="submit"
            style={{
              background: "orange",
              color: "white",
              padding: "12px 40px",
            }}
          >
            Edit Data
          </Button>
          <Link to={"/"}>
            <Button
              type="button"
              style={{
                background: "black",
                color: "white",
                padding: "12px 40px",
              }}
            >
              Back
            </Button>
          </Link>
        </div>
      </Box>
      </div>
    </>
  );
};

export default EditForm;
