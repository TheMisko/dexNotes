import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "55vw",
    },
  },
}));

export default function NoteReason({ setNote, note }) {
  const classes = useStyles();

  const handleChange = (event) => {
    setNote({ ...note, reason: event.target.value });
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className="reason-mobile">
        <TextField
          onChange={(e) => handleChange(e)}
          id="outlined-basic"
          label="Razlog ove ideje"
          value={note.reason ? note.reason : ""}
          variant="outlined"
        />
      </div>
    </form>
  );
}
