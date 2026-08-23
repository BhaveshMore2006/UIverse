import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface GenerationState {
  prompt: string;
  code: string;
  isGenerating: boolean;
  generatedCode: string | null;
}

const initialState: GenerationState = {
  prompt: '',
  code: '',
  isGenerating: false,
  generatedCode: null,
};

export const generationSlice = createSlice({
  name: 'generation',
  initialState,
  reducers: {
    setPrompt: (state, action: PayloadAction<string>) => {
      state.prompt = action.payload;
    },
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    setGenerating: (state, action: PayloadAction<boolean>) => {
      state.isGenerating = action.payload;
    },
    setGeneratedCode: (state, action: PayloadAction<string>) => {
      state.generatedCode = action.payload;
      state.isGenerating = false;
    },
  },
});

export const { setPrompt, setCode, setGenerating, setGeneratedCode } = generationSlice.actions;

export default generationSlice.reducer;
