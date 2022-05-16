import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';


export const contactAdaptor = createEntityAdapter();
const initialState = contactAdaptor.getInitialState();

export const contactSelectors = contactAdaptor.getSelectors((state) => state.contacts);

const cardSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addCard: contactAdaptor.addOne,
    updateAll: contactAdaptor.updateMany,
    updateCard: contactAdaptor.updateOne,
    deleteAll: contactAdaptor.removeAll,
  },
});

export const { addCard, updateAll, updateCard, deleteAll } = cardSlice.actions;
export default cardSlice.reducer;