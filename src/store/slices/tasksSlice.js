import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        tasksList: []
    },

    reducers:{
        setTask: (state, action) => {
            state.tasksList = action.payload
        }
    }
})

export const {setTask} = tasksSlice.actions;

export default tasksSlice.reducer;