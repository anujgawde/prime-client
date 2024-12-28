// src/features/invites/invitesSlice.js
import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

import axios from "axios";
import {
  getUserInvitations,
  inviteEmployee,
  respondToInvite,
} from "../../api/organizations";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/`,
});

export const loadInvites = createAsyncThunk(
  "invites/loadInvites",
  async (userId) => {
    // API call to send an invite
    const response = await getUserInvitations(userId);
    return response;
  }
);

export const responseToInvitation = createAsyncThunk(
  "invites/respondToInvite",
  async (inviteData) => {
    const response = await respondToInvite(inviteData);
    return response;
  }
);

const invitesSlice = createSlice({
  name: "invites",
  initialState: {
    invites: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // Optional reducers for additional state management
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadInvites.fulfilled, (state, action) => {
        state.invites = action.payload;
      })
      .addCase(responseToInvitation.fulfilled, (state, action) => {
        const { _id, ...rest } = action.payload;
        const inviteIndex = state.invites.findIndex((i) => i._id === _id);
        if (inviteIndex !== -1) {
          state.invites[inviteIndex].status = rest.status; // Update invite status
        }
      });
  },
});

export default invitesSlice.reducer;
