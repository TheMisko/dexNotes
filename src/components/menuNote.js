import React from "react";
import DeleteModal from "../components/deleteModal";
import IconButton from "@material-ui/core/IconButton";

import ImportContactsIcon from "@material-ui/icons/ImportContacts";

const MenuNote = ({
  note,
  index,
  notes,

  listaKategorija,
  kategorijaIndex,
  editNote,
}) => {
  return (
    <div className="menu-note-container">
      <div className="note-body">
        <div className="note-left">
          <div className="note-index">{index + 1}</div>
          <div className="menu-note-info">
            <div className="menu-note-title">{note.title}</div>
          </div>
        </div>
        <div className="menu-note-btn">
          {" "}
          <IconButton
            onClick={() => editNote(note, listaKategorija, kategorijaIndex)}
            listaKategorija={listaKategorija}
            index={index}
            note={note}
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <ImportContactsIcon />
          </IconButton>
          <DeleteModal
            kategorijaIndex={kategorijaIndex}
            listaKategorija={listaKategorija}
            notes={notes}
            note={note}
            index={index}
          />
        </div>
      </div>
      <div className="note-date-rating">
        {" "}
        <div>
          Dodato: <span id="date">{note.date}</span>
        </div>{" "}
        <div>Ocena: {note.rating}</div>
      </div>
      <div className="ocekivanje">
        Razlog ideje: <span id="reason">{note.reason}</span>
      </div>
    </div>
  );
};

export default MenuNote;
