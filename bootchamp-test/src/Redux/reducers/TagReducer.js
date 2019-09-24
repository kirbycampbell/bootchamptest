const initTagState = {
  selected: []
};

export const Tags = (state = initTagState, action) => {
  switch (action.type) {
    case "SELECT_TAGS":
      let tagsSelected = state.tagsSelected;
      tagsSelected = action.payload;
      let newState = { ...state, tagsSelected };
      return newState;

    default:
      return state;
  }
};
export const addTagSelection = tags => ({
  type: "SELECT_TAGS",
  payload: tags
});
