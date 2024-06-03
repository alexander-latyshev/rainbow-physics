import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  settings: ISettings;
}

interface ISettings {
  size: number;
  spawnCount: number;
}

const initialState: IInitialState = {
  settings: {
    size: 5,
    spawnCount: 5,
  },
};

export const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setSettingsOptions: (state, { payload }: PayloadAction<ISettings>) => {
      state.settings = payload;
    },
  },
});

export const { setSettingsOptions } = canvasSlice.actions;

export default canvasSlice.reducer;
