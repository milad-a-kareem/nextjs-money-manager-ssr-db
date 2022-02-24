import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  costs: [],
  filteredCosts: [],
  startDate: new Date(new Date().getTime() - 86400000 * 7)
    .toISOString()
    .slice(0, 10),
  endDate: new Date(Date.now()).toISOString().slice(0, 10),
  loading: false,
};

export const addCost = createAsyncThunk("costs/addCost", async (costData) => {
  const response = await fetch(`http://localhost:3000/api/costs`, {
    method: "POST",
    body: JSON.stringify(costData),
  });
  const cost = await response.json();
  return cost;
});

const CostsSlice = createSlice({
  name: "costs",
  initialState,
  reducers: {
    add(state, action) {
      state.costs.unshift(action.payload);
    },
    remove(state, action) {
      const i = state.costs.findIndex((a) => a.id === action.payload);
      state.costs.splice(i, 1);
    },
    filter(state) {
      const endDate = new Date(state.endDate).getTime();
      const startDate = new Date(state.startDate).getTime();
      state.filteredCosts = state.costs.filter((c) => {
        const costDate = new Date(c.date).getTime();
        return costDate >= startDate && costDate <= endDate;
      });
      state.filteredCosts = state.filteredCosts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    },
    changeStartDate(state, action) {
      const startDate = new Date(action.payload).getTime();
      state.startDate = action.payload;
      const endDate = new Date(state.endDate).getTime();
      state.filteredCosts = state.costs.filter((c) => {
        const costDate = new Date(c.date).getTime();
        return costDate >= startDate && costDate <= endDate;
      });
      state.filteredCosts = state.filteredCosts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    },
    changeEndDate(state, action) {
      state.endDate = action.payload;
      const startDate = new Date(state.startDate).getTime();
      const endDate = new Date(action.payload).getTime();
      state.filteredCosts = state.costs.filter((c) => {
        const costDate = new Date(c.date).getTime();
        return costDate >= startDate && costDate <= endDate;
      });
      state.filteredCosts = state.filteredCosts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    },
    replaceCosts(state, action) {
      state.costs = action.payload;
    },
  },
  extraReducers: {
    [addCost.pending]: (state) => {
      state.loading = true;
    },
    [addCost.fulfilled]: (state, { payload }) => {
      state.costs.unshift(payload);
      state.loading = false;
    },
    [addCost.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const costsActions = CostsSlice.actions;

export default CostsSlice.reducer;
