import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  loading: false,
  dataUser: localStorage.getItem("admin"),
  username: localStorage.getItem("username"),
  role: localStorage.getItem("role"),
  error: false,
  success: false,
};

export const auth = createAsyncThunk("auth/authUser", async (props) => {
  const { email, password } = props;
  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/cms/auth/signin`,
      {
        email: email,
        password: password,
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
});

const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem("admin", action.payload);
      state.dataUser = localStorage.getItem("admin");
    },
    setUserName: (state, action) => {
      localStorage.setItem("username", action.payload);
      state.username = localStorage.getItem("username");
    },
    setRole: (state, action) => {
      localStorage.setItem("role", action.payload);
      state.role = localStorage.getItem("role");
    },
    removeLogin: (state) => {
      localStorage.removeItem("admin");
      localStorage.removeItem("username");
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(auth.pending, (state) => {
        state.loading = true;
        state.userToken = null;
        state.success = false;
        state.error = false;
      })
      .addCase(auth.rejected, (state, action) => {
        state.loading = false;
        state.userToken = null;
        state.success = false;
        state.error = true;
      })
      .addCase(auth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.userToken = null;
        state.success = true;
        state.error = false;
      });
  },
});
export const { setUser, setUserName, setRole, removeLogin } = authSlice.actions;
export default authSlice.reducer;
