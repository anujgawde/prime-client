import { configureStore } from "@reduxjs/toolkit";
import invitesReducer from "../state/invites/inviteSlice";
export const store = configureStore({
  reducer: {
    invites: invitesReducer,
  },
});
