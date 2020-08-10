import React, { useState } from "react";
import * as firebase from "firebase";

import DeleteIcon from "@material-ui/icons/Delete";
import { Button, Modal, Backdrop, Fade, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal({
  note,
  listaKategorija,
  kategorijaIndex,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const deleteNote = (note) => {
    const noteRef = firebase
      .database()
      .ref(listaKategorija[kategorijaIndex])
      .child(note.id);
    noteRef.remove();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="delete-icon">
        {" "}
        <IconButton>
          {" "}
          <DeleteIcon onClick={handleOpen} fontSize="large" color="secondary" />
        </IconButton>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="modal-beleska-mobile">
            <div className={classes.paper}>
              <h2 id="transition-modal-title">
                Da li ste sigurni da zelite da obrisete ovu belesku?
              </h2>
              <p id="simple-modal-description">
                <Button
                  onClick={() => setOpen(false)}
                  variant="outlined"
                  color="secondary"
                  onClick={() => setOpen(false)}
                >
                  Ne
                </Button>
                <div className="category-modal-btn"></div>
                <Button
                  onClick={() => deleteNote(note)}
                  variant="outlined"
                  color="primary"
                >
                  Da
                </Button>
              </p>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
