import * as Yup from "yup";

import {
  Box,
  Button,
  ClickAwayListener,
  FormControlLabel,
  InputLabel,
  Paper,
  Switch,
  TextField,
  TextareaAutosize,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { addNoteServer, updateNoteServer } from "../Slices/notesSlice";

import DynamicIcons from "./DynamicIcon";
import MenuList from "./MenuList";
import Select from "react-select";
import { SketchPicker } from "react-color";
import { materialIcons } from "../app/icons";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useState } from "react";

const Note = ({ note, setNoteId }) => {
  const [color, setColor] = useState(note?.color || "#fff");
  const [showColor, setShowColor] = useState(false);
  const dispatch = useDispatch();

  const iconOptions = materialIcons.map((el) => {
    return {
      value: el,
      label: (
        <Box display="flex" alignItems="center">
          <DynamicIcons iconName={el} />
          <span style={{ paddingLeft: "5px" }}>{el}</span>
        </Box>
      ),
    };
  });

  const useStyles = makeStyles((theme) => ({
    priority: {
      fontSize: "1rem",
      marginBottom: "5px",
      marginTop: "0.8rem",
      textAlign: "left",
    },
    form: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
    },
    paper: {
      alignSelf: "center",
      padding: "1rem 1.5rem",
      minWidth: "15rem",
    },
    submit: {
      marginTop: "1rem",
    },
    color: {
      background: color,
    },
    textarea: {
      width: "100%",
      fontSize: "1rem",
    },
    completeLabel: {
      flexDirection: "row-reverse",
      justifyContent: "flex-end",
      marginLeft: "0",
      marginTop: "0.5rem"
    },
  }));

  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      title: note?.title,
      body: note?.body || "",
      priority: note?.priority || 1,
      read: note?.read,
      icon: note?.icon,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      note
        ? dispatch(updateNoteServer({ id: note.id, ...values, color }))
        : dispatch(addNoteServer({ ...values, color }));
    },
  });
  const handleColorChange = (color, event) => {
    setColor(color.hex);
  };

  const handleClickAway = () => {
    if (showColor) {
      setShowColor(false);
    }
  };

  const handleClickAwayNote = (event) => {
    setNoteId();
  };

  return (
    <ClickAwayListener onClickAway={handleClickAwayNote}>
      <Paper
        className={classes.paper}
        style={{ border: note && `10px solid ${note.color}` }}
      >
        {!note && (
          <Typography component="h1" variant="h6">
            New Note:
          </Typography>
        )}

        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            error={formik.touched.title && formik.errors.title}
            id="title"
            label="Title"
            name="title"
            {...formik.getFieldProps("title")}
            helperText={formik.errors.title}
          />
          <Box mt={2}>
            <TextareaAutosize
              rowsMin={4}
              placeholder="Enter note body"
              name="body"
              value={formik.values.body}
              className={classes.textarea}
              onChange={formik.handleChange}
            />
          </Box>

          <InputLabel className={classes.priority} htmlFor="priority">
            Priority
          </InputLabel>
          <Select
            id="priority"
            defaultValue={{
              value: formik.values.priority,
              label: formik.values.priority,
            }}
            placeholder="Priority"
            value={{
              value: formik.values.priority,
              label: formik.values.priority,
            }}
            onChange={(value) => formik.setFieldValue("priority", value.value)}
            options={[1, 2, 3, 4, 5].map((val) => ({ value: val, label: val }))}
          />

          <Box
            mt={2}
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Button
              variant="contained"
              onClick={() => setShowColor(!showColor)}
              className={classes.color}
            >
              Choose Color
            </Button>
            {showColor && (
              <ClickAwayListener onClickAway={handleClickAway}>
                <SketchPicker color={color} onChange={handleColorChange} />
              </ClickAwayListener>
            )}
          </Box>

          <InputLabel className={classes.priority} htmlFor="icon">
            Icon
          </InputLabel>

          <Select
            id="icon"
            isSearchable={true}
            components={{ MenuList }}
            placeholder="Search Icon"
            menuPortalTarget={document.body} 
             styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
            value={{
              value: formik.values.icon,
              label: (
                <Box display="flex" alignItems="center">
                 {formik.values.icon&& <DynamicIcons iconName={formik.values.icon} />}
                  <span style={{ paddingLeft: "5px" }}>
                    {formik.values.icon}
                  </span>
                </Box>
              ),
            }}
            onChange={(value) => formik.setFieldValue("icon", value.value)}
            options={iconOptions}
          />
{note&&
 <FormControlLabel
 className={classes.completeLabel}
 control={
   <Switch
     checked={formik.values.read}
     onChange={formik.handleChange}
     name="read"
   />
 }
 label="Completed?"
/>}
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {note ? "Save" : "Add"}
          </Button>
        </form>
      </Paper>
    </ClickAwayListener>
  );
};

export default Note;
