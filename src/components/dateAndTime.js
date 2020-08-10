import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DateAndTime({ setNote, note }) {
  const classes = useStyles();

  const handleDateChange = (event) => {
    setNote({ ...note, date: event.target.value });
  };

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Datum i vreme"
        type="datetime-local"
        value={note.date ? note.date : "2017-05-24T10:30"}
        onChange={(event) => handleDateChange(event)}
        defaultValue={note.date ? note.date : "2017-05-24T10:30"}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
