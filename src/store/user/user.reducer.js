// this will be our reducer
import { USER_ACTION_TYPE } from "./user.type";
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    currentUser: null,
};

//  create slice create not only reducer but also action and action types
// we dont need to make any action type
export const userSlice = createSlice({
    name: "user",
    initialState: INITIAL_STATE,
    // in reducers here - we define name of the reducer function which update the reducer state
    reducers: {
        // setCurrentUser: ()=>{}
        setCurrentUser(state, action) {
            state.currentUser = action.payload;
        },
    },
});

export const { setCurrentUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
