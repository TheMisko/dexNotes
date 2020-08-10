import React, { useState } from "react";

import MiniDrawer from "../components/drawer";

const Home = () => {
  const [readNote, setReadNote] = useState({
    title: "",
    note: "",
  });
  const [show, setShow] = useState(true);
  const updateNote = (note) => {
    setReadNote({
      title: note.title,
      note: note.note,
    });

    setShow(false);
  };

  return (
    <div className="home-container">
      <MiniDrawer setShow={setShow} updateNote={updateNote} />
    </div>
  );
};

export default Home;
