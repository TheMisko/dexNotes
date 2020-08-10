import React, { useState, useEffect } from "react";

import TextField from "@material-ui/core/TextField";
import NoteButtons from "../components/noteButtons";
import CategorySelect from "../components/categorySelect";
import RatingSelect from "../components/ratingSelect";
import DateAndTime from "../components/dateAndTime";
import NoteReason from "../components/noteReason";

const Note = ({ allNotes, listaKategorija, note, setNote, updateCategory }) => {
  const [categoryErr, setCategoryErr] = useState(false);
  const [selectedCategory, setSlectedCategory] = useState("");

  const [error, setError] = useState(false);

  const [newCategory, setNewCategory] = useState("");

  const handleCategory = (event) => {
    setNewCategory(event.target.value);
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNote({ ...note, [name]: value });
  };

  return (
    <div className="note-container">
      <div className="note-title">
        <TextField
          onChange={handleChange}
          name="title"
          value={note.title ? note.title : ""}
          error={error}
          id="outlined-basic"
          label="Naslov"
          fullWidth
          variant="outlined"
        ></TextField>
      </div>
      {categoryErr ? (
        <div className="categoryErr">Niste uneli grupu</div>
      ) : null}
      <NoteButtons
        setCategoryErr={setCategoryErr}
        setNote={setNote}
        newCategory={newCategory}
        selectedCategory={selectedCategory}
        setError={setError}
        note={note}
        updateCategory={updateCategory}
      />{" "}
      <div className="note-selects-container">
        {allNotes ? (
          <CategorySelect
            updateCategory={updateCategory}
            handleCategory={handleCategory}
            setSlectedCategory={setSlectedCategory}
            listaKategorija={listaKategorija}
            note={note}
          />
        ) : null}
        <RatingSelect note={note} setNote={setNote} />
        <DateAndTime note={note} setNote={setNote} />
      </div>
      <div className="note-reson-margin">
        <NoteReason note={note} setNote={setNote} />
      </div>
      <div className="note-text">
        {" "}
        <TextField
          onChange={handleChange}
          name="note"
          value={note.note ? note.note : ""}
          id="outlined-basic"
          label="Sadrzaj"
          error={error}
          variant="outlined"
          fullWidth
          multiline
          rows={25}
        />
      </div>
      <div className="block"></div>
    </div>
  );
};

export default Note;
