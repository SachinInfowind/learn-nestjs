import {  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";
import { PopUpboxProps } from "../../interfaces/interface";


const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<unknown, unknown>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
function PopUpbox({ handleClose, open, handleConfirm }: PopUpboxProps) {
return<>
<Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure ... the account won't recovered again
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleConfirm}>Agree</Button>
        </DialogActions>
      </Dialog>
</>
}
export default PopUpbox