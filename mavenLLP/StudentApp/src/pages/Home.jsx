import React, { useEffect, useState } from 'react'
import TableLayout from '../components/TableLayout'
import localStorageService from '../services/localStorageService';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import DialogBox from '../components/Dialog';

const Home = () => {

  const [studentData, setStudentData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // used for navigate route
  const navigate = useNavigate();

  const totalRows = [
    { name: "No.", col: 1 },
    { name: "Name", col: 1 },
    { name: "Class", col: 1 },
    { name: "GR No.", col: 1 },
    { name: "Roll No.", col: 1 },
    { name: "Actions", col: 3 },
  ]

  const tableData = [
    {name : "name"}, {name : "class"}, {name:"grno"}, {name : "rollno"}
  ]

  const handleOpenDialog = (id) => {
    setOpenDialog(true);
    setDeleteId(id);
  };

    // used for delete single student record
    const handleDelete = (id) => {
      const filterData = studentData.filter((e) => e.id !== id);
      localStorageService.setItem("studentData", filterData);
      setStudentData(filterData);
      toast.success("Student record has been successfully deleted.");
    };
  
    // used for duplicate or copy of single student record
    const handleDuplicate = (data) => {
      const newItem = { ...data, id: Date.now() };
      const updated = [...studentData, newItem];
      setStudentData(updated);
      localStorageService.setItem("studentData", updated);
      toast.success("Student record duplicated successfully.!");
    };
  
    // used for modify or edit of single student record
    const handleEdit = (id) => {
      navigate(`/edit-student-form/${id}`);
    };

  const tableActions = [
    {name : "duplicate", icon : ContentCopyIcon, action : (data) => handleDuplicate(data)},
    {name : "edit", icon : EditIcon, action : (data) => handleEdit(data.id)},
    {name : "delete", icon : DeleteIcon, action : (data) => handleOpenDialog(data.id)},
  ]

  useEffect(()=>{
    const savedData = localStorageService.getItem('studentData');
    if(savedData)
    {
      setStudentData(savedData);
    }
  },[]);

  return (
    <>
        <TableLayout records={studentData} tableActions={tableActions}  rows={totalRows} tableData={tableData} />
        <DialogBox
        open={openDialog}
        close={() => setOpenDialog(false)}
        onDelete={() => handleDelete(deleteId)}
      />
    </>
  )
}

export default Home