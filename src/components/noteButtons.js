import React, { useState } from "react";
import * as firebase from "firebase";

import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import SaveIcon from "@material-ui/icons/Save";
import UpdateIcon from "@material-ui/icons/Update";

const NoteButtons = ({
  note,

  setError,
  selectedCategory,
  newCategory,
  updateCategory,
  setCategoryErr,
}) => {
  const handleSubmit = () => {
    if (note.title.length === 0 || note.note.length === 0) {
      console.log("morate uneti teeks");
      setError(true);
    } else if (selectedCategory.length === 0 && newCategory.length === 0) {
      setCategoryErr(true);
    } else {
      firebase
        .database()
        .ref(selectedCategory || newCategory)
        .push({
          title: note.title,
          note: note.note,
          date: note.date,
          reason: note.reason,
          rating: note.rating,
        });
      setCategoryErr(false);
      setError(false);
      setMsg("Nova beleksa dodata!");
      setState({ open: true, vertical: "bottom", horizontal: "right" });

      console.log(note);
    }
  };

  const [msg, setMsg] = useState("");

  const handleUpdate = () => {
    if (note.title.length === 0 || note.note.length === 0) {
      console.log("morate uneti teeks");
      setError(true);
    } else {
      firebase
        .database()
        .ref(selectedCategory || newCategory || updateCategory)
        .child(note.id)
        .update({
          title: note.title,
          note: note.note,
          date: note.date || "10 2020 00:11:15",
          reason: note.reason || "prazno",
          rating: note.rating || 0,
        });

      setError(false);
      setMsg("Beleska ažurirana");
      setState({ open: true, vertical: "bottom", horizontal: "right" });
      console.log(note);
    }
  };

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  return (
    <div className="note-buttons-container">
      {" "}
      <div className="note-btn">
        <Button
          variant="contained"
          onClick={handleSubmit}
          color="primary"
          startIcon={<SaveIcon />}
        >
          Sacuvaj
        </Button>
      </div>
      <Button
        variant="contained"
        onClick={() => handleUpdate()}
        color="primary"
        startIcon={<UpdateIcon />}
      >
        Ažuriraj
      </Button>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        onClose={handleClose}
        open={open}
        style={{
          backgroundColor: "green",
        }}
        message={msg}
        key={vertical + horizontal}
      ></Snackbar>
    </div>
  );
};

export default NoteButtons;
