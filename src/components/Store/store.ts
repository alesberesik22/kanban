import { configureStore } from "@reduxjs/toolkit";
import { kanbanAPI } from "../Services/kanbanAPI";
export default configureStore({
  reducer: {
    [kanbanAPI.reducerPath]: kanbanAPI.reducer,
  },
});
