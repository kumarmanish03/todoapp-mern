import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(
  localStorage.getItem("user") ?? JSON.stringify({ id: null })
);

export const userSlice = createSlice({
  name: "user",
  initialState: user,
  reducers: {
    setUser(state, { payload: { id, username, password, dateJoined } }) {
      state.id = id;
      state.username = username;
      state.password = password;
      state.dateJoined = dateJoined;

      console.log(username, password);

      localStorage.setItem(
        "user",
        JSON.stringify({ id, username, password, dateJoined })
      );
    },

    resetUser(state) {
      console.log("run");

      state.id = null;

      delete state.username;
      delete state.password;
      delete state.dateJoined;

      localStorage.removeItem("user");
    },
  },
});

export default userSlice.reducer;

export const setUser = userSlice.actions.setUser;
export const resetUser = userSlice.actions.resetUser;
