import React, { useState, useEffect } from "react";

import * as firebase from "firebase";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import CategoryAccordion from "../components/CategoryAccordion";

import Note from "../components/note";

const drawerWidth = 340;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  const [drawerNotes, setDrawerNotes] = useState([]);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const [newList, setNewList] = useState([]);
  console.log("NOVA LISTA", newList);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [updateCategory, setUpdateCategory] = useState("");
  const [allNotes, setAllNotes] = useState([]);
  const [lista, setLista] = useState([]);
  const [note, setNote] = useState({
    title: "",
    note: "",
    time: "",
    date: "",
    rating: "",
    reason: "",
  });

  const editNote = (note, listaKategorija, kategorijaIndex) => {
    setNote({
      title: note.title,
      note: note.note,
      id: note.id,
      date: note.date,
      reason: note.reason,
      rating: note.rating,
    });
    setUpdateCategory(listaKategorija[kategorijaIndex]);
  };

  useEffect(() => {
    const noteRef = firebase.database().ref();
    noteRef.on("value", (snapshot) => {
      const notes = snapshot.val();
      const noteList = [];
      for (let id in notes) {
        noteList.push({ id, ...notes[id] });
      }
      setAllNotes(noteList);
      getCategories(noteList);
    });
  }, []);

  function getCategories(noteList) {
    let listaNova = [];
    for (let i = 0; i < noteList.length; i++) {
      listaNova.push(noteList[i].id);

      setLista(lista.concat(listaNova));
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Dex Notes
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        <Divider />
        {allNotes
          ? allNotes.map((note, index) => (
              <div>
                <CategoryAccordion
                  listaKategorija={lista}
                  editNote={editNote}
                  index={index}
                  note={note}
                  notes={allNotes}
                  updateCategory={updateCategory}
                />
                <Divider />
              </div>
            ))
          : null}

        <List>
          <div className="test-acc"> </div>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Note
          updateCategory={updateCategory}
          note={note}
          setNote={setNote}
          listaKategorija={lista}
          allCategory={allNotes}
          allNotes={allNotes}
          drawerNotes={drawerNotes}
          setDrawerNotes={setDrawerNotes}
          updateCategory={updateCategory}
        />
      </main>
    </div>
  );
}
