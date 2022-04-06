const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case "productsPage/productsLoaded": {
      return action.payload;
    }

    default: {
      return state;
    }
  }
};
