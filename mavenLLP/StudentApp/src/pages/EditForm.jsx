import React, { useEffect, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import Form from "../pages/Form";

const EditForm = () => {
  const store = JSON.parse(localStorage.getItem("studentData")) || [];
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
      if(res.length > 0)
      {
        setStudentData(res[0]);
      }
      else
      {
        navigate("/");
      }
    }
  }, []);

  return (
    <>
      <Form editData={studentData} />
    </>
  );
};

export default EditForm;
