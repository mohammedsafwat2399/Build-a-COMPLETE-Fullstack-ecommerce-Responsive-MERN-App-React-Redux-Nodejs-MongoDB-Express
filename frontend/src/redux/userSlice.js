import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  email: "",
  fristName: "",
  image: "",
  lastName: "",
  _id: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginReducer: (state, action) => {
       state._id = action.payload.data._id;
      state.email = action.payload.data.email;
      state.fristName = action.payload.data.fristName;
      state.lastName = action.payload.data.lastName;
      state.image = action.payload.data.image;
    },
    logOutReducer: (state, action) => {
       state._id = "";
      state.email = "";
      state.fristName = "";
      state.lastName = "";
      state.image = "";
    },
  },
});
export const { loginReducer, logOutReducer } = userSlice.actions;
export default userSlice.reducer;
