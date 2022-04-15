import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',

    initialState: {
        user: null,
    },

    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
        },
        
        logoutSuccess: (state) => {

        },
    },
});

export const { loginSuccess, logoutSuccess } = userSlice.actions;
export const selectUser = (state) => state.userSlice.user;
export default userSlice.reducer;