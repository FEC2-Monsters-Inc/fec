import { configureStore, createSlice } from '@reduxjs/toolkit';

const featureSlice = createSlice({
  name: 'feature',
  initialState: {
    feature: {
      id: 40346,
      campus: 'hr-rfp',
      name: 'Morning Joggers',
      slogan: 'Make yourself a morning person',
      description: "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
      category: 'Pants',
      default_price: '40.00',
      created_at: '2021-08-13T14:38:44.509Z',
      updated_at: '2021-08-13T14:38:44.509Z',
      features: [
        {
          feature: 'Fabric',
          value: '100% Cotton',
        },
        {
          feature: 'Cut',
          value: 'Skinny',
        },
      ],
    },
  },
  reducers: {
    setFeature(state, action) {
      state.feature = action.payload;
    },
  },
});

export const { actions } = featureSlice;
const store = configureStore({
  reducer: featureSlice.reducer,
});
export default store;
