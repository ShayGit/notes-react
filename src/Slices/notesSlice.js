import { addNote, deleteNote, getNotes, updateNote } from "../api/serverCalls";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  status: "idle",
  errors: null,
};


export const getNotesServer = createAsyncThunk("notes/getNotes", async (arg,{ rejectWithValue,getState }) => {
  try {
    const token = getState().user.userInfo.token;
    const response = await getNotes(token);
    return response.data;
} catch (err) {
  if (!err.response) {
    throw err;
  }

  return rejectWithValue(err.response.data);
}
});

export const addNoteServer = createAsyncThunk(
  "notes/addNote",
  async (note, { rejectWithValue,getState }) => {
    try {
      const token = getState().user.userInfo.token;
      const response = await addNote(note,token);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const updateNoteServer = createAsyncThunk(
  "notes/updateNote",
  async (note, { rejectWithValue,getState }) => {
    try {
      const token = getState().user.userInfo.token;
      const response = await updateNote(note,token);
      return response.data || [];
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteNoteServer = createAsyncThunk(
  "notes/deleteNote",
  async (note, { rejectWithValue,getState }) => {
    try {
      const token = getState().user.userInfo.token;

      const response = await deleteNote(note,token);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    initNotes: (state) => {
      return initialState
    }
  },
  extraReducers: {
    [getNotesServer.pending]: (state, action) => {
      state.status = "loading";
    },
    [getNotesServer.fulfilled]: (state, action) => {
      state.status = "succeeded";
      const notes= action.payload;
      notes.sort((a, b) => a.priority - b.priority);
      state.notes = notes ;
    },
    [getNotesServer.rejected]: (state, action) => {
      state.status = "failed";
      state.errors = action.payload ? (action.payload.errors ? action.payload.errors: [action.payload.message]) : [action.error.message];

    },
    [addNoteServer.pending]: (state, action) => {
      state.status = "loading";
    },
    [addNoteServer.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.notes.push(action.payload);
      state.notes.sort((a, b) => a.priority - b.priority);
    },
    [addNoteServer.rejected]: (state, action) => {
      state.status = "failed";
      state.errors = action.payload ? (action.payload.errors ? action.payload.errors: [action.payload.message]) : [action.error.message];

    },
    [updateNoteServer.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateNoteServer.fulfilled]: (state, action) => {
      state.status = "succeeded";
      const noteToUpdate = action.payload;
      state.notes = state.notes.map((note) =>
        note.id === noteToUpdate.id ? noteToUpdate : note
      );
      state.notes.sort((a, b) => a.priority - b.priority);
    },
    [updateNoteServer.rejected]: (state, action) => {
      state.status = "failed";
      state.errors = action.payload ? (action.payload.errors ? action.payload.errors: [action.payload.message]) : [action.error.message];

    },
    [deleteNoteServer.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteNoteServer.fulfilled]: (state, action) => {
      state.status = "succeeded";
      const noteToDelete = action.payload;
      state.notes = state.notes.filter((note) => note.id !== noteToDelete.id);
      state.notes.sort((a, b) => a.priority - b.priority);
    },
    [deleteNoteServer.rejected]: (state, action) => {
      state.status = "failed";
      state.errors = action.payload ? (action.payload.errors ? action.payload.errors: [action.payload.message]) : [action.error.message];

    },
  },
});

   export const {initNotes } = notesSlice.actions

export default notesSlice.reducer;
