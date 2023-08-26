import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    initTasks: (state, action) => {
      return action.payload;
    },

    addTask: (state, action) => {
      state.push(action.payload);
    },

    releaseTasks: (state) => {
      state.map((task) => {
        if (task.completed === true) {
          task.status = 99;
        }
      });
      return state;
    },

    editTask: (state, action) => {
      const { id, title, description } = action.payload;
      const foundTask = state.find((task) => task.id === id);
      if (foundTask) {
        foundTask.title = title;
        foundTask.description = description;
      }
    },

    completeTask: (state, action) => {
      const { id, completed } = action.payload;
      const completedTask = state.find((task) => task.id === id);
      if (completeTask) {
        completedTask.completed = completed;
      }
      return state;
    },
  },
});

export const { addTask, editTask, completeTask, initTasks, releaseTasks } =
  taskSlice.actions;
export default taskSlice.reducer;
