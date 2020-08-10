import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function RatingSelect({ setNote, note }) {
  const classes = useStyles();

  const handleChange = (event) => {
    setNote({ ...note, rating: event.target.value });
  };
  const ocene = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Ocena</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={note.rating ? note.rating : ""}
          onChange={handleChange}
        >
          {" "}
          {ocene.map((ocena) => (
            <MenuItem value={ocena}>{ocena}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
