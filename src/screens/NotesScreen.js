import {
  Box,
  Button,
  CircularProgress,
  Container,
  Fade,
  IconButton,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { deleteNoteServer, getNotesServer } from "../Slices/notesSlice";
import { useDispatch, useSelector } from "react-redux";

import Alert from "@material-ui/lab/Alert";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import DynamicIcons from '../components/DynamicIcon';
import Note from "../components/Note";
import { useLocation } from "react-router";

const NotesScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { status, errors, notes } = useSelector((state) => state.notes);
  const [addNote, setAddNote] = useState(false);
  const [noteIdToShow, setNoteIdToShow] = useState();
  const [querySearch, setQuery] = useState(location.search.split("=")[1]);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getNotesServer());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      setAddNote(false);
      setNoteIdToShow();
    }
  }, [status]);

  const handleNoteClick = (e,id) => {
    setNoteIdToShow(id);
    setAddNote(false);

  };
  const handleNoteDelete = (note) => {
    dispatch(deleteNoteServer(note));
  };

  useEffect(() => {
    setQuery(location.search.split("=")[1]);
  }, [location.search]);

  return (
    <Container maxWidth="lg">
      <Box display="flex" flexDirection="column">
        <Typography variant="h3" gutterBottom>
          My Notes:
        </Typography>
        {status === "failed" &&
          errors.map((error) => <Alert severity="error">{error}</Alert>)}

        {status === "loading" && (
          <Alert severity="info" action={<CircularProgress size={20} />}>
            Loading...
          </Alert>
        )}

        <Box mt={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setAddNote(!addNote);
            }}
          >
            {addNote ? "Close" : "Add Note"}
          </Button>
        </Box>

        {addNote && <Note setNoteId={setNoteIdToShow}/>}
        <div className={classes.root}>
          {notes.map(
            (note) =>{
              return(note.title.toLowerCase().includes(querySearch || "") && (
                <Fade in={true} timeout={1000}>
                <Paper
                  key={note.id}
                  elevation={3}
                  style={{ background: note.color }}
                  onClick={(e) => handleNoteClick(e,note.id)}
                >
                  {noteIdToShow === note.id ? (
                    <Note note={note} setNoteId={setNoteIdToShow} />
                  ) : (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      flex="1"
                      paddingLeft={note.icon || "2rem"}
                    >
                      {note.icon&&
                     <IconButton  >

                      <DynamicIcons iconName={note.icon}/>
                      </IconButton>}
                      
                      <Typography className={classes.noteTitle} variant="h6">
                        {note.title}
                      </Typography>
                      
                      <IconButton className={classes.noteIcon} aria-label="delete" onClick={()=>handleNoteDelete(note)}>
                        <DeleteForeverOutlinedIcon />
                      </IconButton>
                      {note.read &&
                      <CheckCircleOutlineIcon className={classes.readIcon} />}
                      
                    </Box>
                  )}
                        
                </Paper>
                </Fade>
            ))
            }
              
          )}
        </div>
      </Box>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: theme.spacing(2),

    "& > *": {
      display: "flex",
      position:"relative",
      alignSelf: "flex-start",
      margin: theme.spacing(2),
      minWidth: "15rem",
      minHeight: "4.5rem",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      "&:hover": {
        transform: "scale(1.05)",
        transition: "all 0.2s ease-in-out 0s",
      },
    },
  },
  noteTitle: {
    fontWeight: "bold",
    flex:1,
    textAlign: "center",
    wordWrap: "break-word",
    maxWidth: '10rem',
  },
  noteIcon: {
  },
  readIcon:{
    position: "absolute",
    top:"5px",
    left:"5px",
    fontSize:"1rem"
  }
}));

export default NotesScreen;
