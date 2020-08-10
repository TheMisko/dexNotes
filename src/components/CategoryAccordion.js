import React, { useState, useEffect } from "react";
import * as firebase from "firebase";

import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Divider,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuNote from "../components/menuNote";
import DeleteCategory from "../components/deleteCategoryModal";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

export default function ControlledAccordions({
  notes,
  index,
  listaKategorija,
  editNote,
}) {
  let kategorijaIndex = index;

  const [open, setOpen] = React.useState(false);
  const [allNotes, setAllNotes] = useState([]);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const noteRef = firebase.database().ref(notes[index].id);
    noteRef.on("value", (snapshot) => {
      const notes = snapshot.val();
      const noteList = [];
      for (let id in notes) {
        noteList.push({ id, ...notes[id] });
      }
      setAllNotes(noteList);
    });
  }, [listaKategorija]);

  const deleteCategory = () => {
    const noteRef = firebase.database().ref(listaKategorija[kategorijaIndex]);
    noteRef.remove();
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          {notes ? (
            <Typography className={classes.heading}>
              <div className="kategorija-ime">{notes[index].id}</div>
            </Typography>
          ) : null}
        </AccordionSummary>
        <AccordionDetails className={classes.root}>
          <div className="notes-category-flex">
            <DeleteCategory
              open={open}
              setOpen={setOpen}
              deleteCategory={deleteCategory}
            />

            {allNotes
              ? allNotes.map((note, index) => (
                  <div className="notes-category-flex">
                    {" "}
                    <MenuNote
                      editNote={editNote}
                      note={note}
                      index={index}
                      kategorijaIndex={kategorijaIndex}
                      listaKategorija={listaKategorija}
                      updateCategory
                    />
                    <Divider />
                  </div>
                ))
              : null}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
