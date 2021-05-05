import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signinApi, signupApi } from "../api/serverCalls";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  status: "idle",
  errors: null,
};

export const signin = createAsyncThunk(
  "user/signin",
  async ({remember,...auth}, { rejectWithValue }) => {
    try {
      
      const response = await signinApi(auth);
      remember && localStorage.setItem("userInfo", JSON.stringify(response.data));
      return {...response.data,remember:remember};
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const signup = createAsyncThunk("user/signup", async ({password2, ...auth}, { rejectWithValue }) => {
  try {
      if(auth.password !== password2){
          return rejectWithValue({
              message: "Passwords do not match"
          });
      }
const response = await signupApi(auth);
return response.data;
} catch (err) {
  if (!err.response) {
    throw err;
  }

  return rejectWithValue(err.response.data);
}
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    init:(state) => {
      return { userInfo: null, status: "idle", error: null };
    },
    signout: (state) => {
      localStorage.removeItem("userInfo");
      return { userInfo: null, status: "idle", error: null };
    },
  },
  extraReducers: {
    [signin.pending]: (state, action) => {
      state.status = "loading";
    },
    [signin.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.userInfo = action.payload;
    },
    [signin.rejected]: (state, action) => {
      state.status = "failed";
      state.errors = action.payload ? (action.payload.errors ? action.payload.errors: [action.payload.message]) : [action.error.message];
    },
    [signup.pending]: (state, action) => {
      state.status = "loading";
    },
    [signup.fulfilled]: (state, action) => {
      state.status = "succeeded";
    },
    [signup.rejected]: (state, action) => {
      state.status = "failed";
      state.errors = action.payload ? (action.payload.errors ? action.payload.errors: [action.payload.message]) : [action.error.message];

    },
  },
});

export const { signout,init } = userSlice.actions;

export default userSlice.reducer;
