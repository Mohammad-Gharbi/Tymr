import { createSlice } from "@reduxjs/toolkit"

const timerSlice = createSlice({
  name: "timer",
  initialState: {
    isTimerOn: false,
    remainingTime: 0,
    currentState: localStorage.getItem("timerType")
      ? localStorage.getItem("timerType")
      : "session",
    timePresets: localStorage.getItem("timerPresets")
      ? JSON.parse(localStorage.getItem("timerPresets")!)
      : {
          session: 45,
          break: 15,
        },
    tasks: localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks")!)
      : [],
  },
  reducers: {
    setIsTimerOn(state, action) {
      state.isTimerOn = action.payload
    },
    setRemainingTime(state, action) {
      state.remainingTime = action.payload
    },
    setTimerType(state, action) {
      state.currentState = action.payload
      localStorage.setItem("timerType", action.payload)
    },
    editTimer(state, action) {
      state.timePresets = action.payload // payload:{session:30, break: 10}
      localStorage.setItem("timerPresets", JSON.stringify(action.payload))
    },
    addTask(state, action) {
      state.tasks.push(action.payload)
      localStorage.setItem("tasks", JSON.stringify(state.tasks))
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter(
        (task: any) => task.id !== action.payload.id
      )
    },
    editTask(state, action) {
      state.tasks = state.tasks.map((task: any) => {
        if (task.id === action.payload.id) {
          return { id: task.id, name: action.payload.name, checked: false }
        } else {
          return task
        }
      })
    },
  },
})

export const {
  setIsTimerOn,
  setRemainingTime,
  setTimerType,
  editTimer,
  addTask,
  deleteTask,
  editTask,
} = timerSlice.actions

export default timerSlice.reducer
