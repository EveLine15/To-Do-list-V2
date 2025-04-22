import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        tasksList: []
    },

    reducers:{
        setTask: (state, action) => {
            state.tasksList = action.payload
        },

        toggleStatus: (state, action) => {
            const task = state.tasksList.find(t => t.id === action.payload);
            if(task) task.status = task.status === 'completed' ? 'active' : 'completed';
        },

        changeTaskName: (state, action) => {
            const {id, newName} = action.payload;
            const task = state.tasksList.find(t => t.id === id);
            if(newName !== "") task.name = newName;
        }
    }
})

export const {setTask} = tasksSlice.actions;
export const {toggleStatus} = tasksSlice.actions;
export const {changeTaskName} = tasksSlice.actions;

export default tasksSlice.reducer;