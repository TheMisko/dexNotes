import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function DeleteCategory({ deleteCategory, open, setOpen }) {
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className="modal-kategorija-mobile">
      <div style={modalStyle} className={classes.paper}>
        <div className="modal-kategorija-mobile">
          <h2 id="simple-modal-title">
            Da li ste sigurni da zelite da obrisete ovu grupu?
          </h2>
          <p id="simple-modal-description">
            <Button
              onClick={() => setOpen(false)}
              variant="outlined"
              color="secondary"
            >
              Ne
            </Button>
            <div className="category-modal-btn"></div>
            <Button onClick={deleteCategory} variant="outlined" color="primary">
              Da
            </Button>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined" color="secondary">
        Obrisi grupu
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
