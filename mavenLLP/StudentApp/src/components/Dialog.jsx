import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const DialogBox = ({open,close,onDelete}) => {

  return (
    <>
 <React.Fragment>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        // onClose={close}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>close()}>Cancel</Button>
          <Button onClick={()=>{onDelete(); close();}}>Delete</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    </>
  )
}

export default DialogBox
