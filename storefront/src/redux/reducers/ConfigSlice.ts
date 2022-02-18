import { createSlice } from "@reduxjs/toolkit";
import { IConfig } from "../interfaces";

//-- Config
import { Themes } from "../../config";

const initialConfigState = {
  loading: false,
  config: null,
  error: null,

  // themes
  loadingThemes: false,
  themes: Themes[0],
  errorThemes: null,
} as IConfig;

const configSlice = createSlice({
  name: "config",
  initialState: initialConfigState,
  reducers: {
    CONFIG_REQUEST: (state, action) => {
      state.loading = true;
      state.error = null;
    },

    CONFIG_SUCCESS: (state, action) => {
      let { payload } = action;

      state.loading = false;
      state.config = payload;
      state.error = null;
    },

    CONFIG_FAILED: (state, action) => {
      let { payload } = action;

      state.loading = false;
      state.error = payload;
    },

    // Themes
    THEMES_REQUEST: (state, action) => {
      state.loadingThemes = true;
      state.errorThemes = null;
    },

    THEMES_SUCCESS: (state, action) => {
      let { payload } = action;

      state.loadingThemes = false;
      state.themes = payload;
      state.errorThemes = null;
    },

    THEMES_FAILED: (state, action) => {
      let { payload } = action;

      state.loadingThemes = false;
      state.errorThemes = payload;
    },
  },
});

export const ConfigActions = configSlice.actions;
export const ConfigReducer = configSlice.reducer;
