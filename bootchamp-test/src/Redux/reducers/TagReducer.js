const initTagState = {
  selected: []
}

export const Tags = (state = initTagState, action) => {
  switch (action.type) {
    case 'SELECT_TAGS':
      let selected = state.selected
      selected = action.payload
      let newState = { ...state, selected }
      return newState

    default:
      return state
  }
}
