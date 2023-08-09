import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAuth: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action){
            state.isAuth = true;
            state.user = action.payload;
        },
        logout(state){
            localStorage.removeItem('token');
            state.isAuth = false;
            state.user = {};
        }
    }
});

export const { setUser } = userSlice.actions;
export const { logout } = userSlice.actions;

export default userSlice.reducer;