import React, { useState, useEffect } from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  InputBase,
  TextField,
  FormHelperText,
} from "@material-ui/core";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function CategorySelect({
  handleCategory,
  listaKategorija,
  setSlectedCategory,
  updateCategory,
  note,
}) {
  const classes = useStyles();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const selectCategory = (category) => {
    setSlectedCategory(category);
  };

  return (
    <div className="form-control-container">
      <FormControl className={classes.margin}>
        <TextField
          onChange={handleCategory}
          name="newCategory"
          id="outlined-basic"
          label="nova kategorija"
        ></TextField>
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel id="demo-customized-select-label"></InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={age}
          label="kategr"
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          {" "}
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {listaKategorija
            ? listaKategorija.map((kategorija, index) => (
                <MenuItem
                  onClick={() => selectCategory(kategorija)}
                  value={kategorija}
                >
                  {kategorija}
                </MenuItem>
              ))
            : null}
        </Select>
        <FormHelperText>Izaberite kategoriju</FormHelperText>
      </FormControl>
    </div>
  );
}
