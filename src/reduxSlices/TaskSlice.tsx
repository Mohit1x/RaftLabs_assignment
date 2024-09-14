import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../types";

export type TaskSlice = {
  value: Task[] | [];
  filtered: Task[] | [];
};

const initialState: TaskSlice = {
  value: [],
  filtered: [],
};
export const TaskSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.value = [...state.value, action.payload];
      state.filtered = state.value;
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter((value) => value.id !== action.payload);
      state.filtered = state.filtered.filter(
        (value) => value.id !== action.payload
      );
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const temp = [...state.value];
      const index = temp.findIndex((value) => value.id === action.payload.id);
      temp[index] = { ...action.payload };
      state.value = temp;
      state.filtered = temp
    },
    filteredTask: (state, action: PayloadAction<Task[]>) => {
      state.filtered = action.payload;
    },
  },
});

export const { addTask, deleteTask, editTask, filteredTask } =
  TaskSlice.actions;

export default TaskSlice.reducer;
