import { ACTION_TYPES } from '../../../Constants'

const initialState = {
  state: null,
  options: {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
    autoHideDuration: 6000,
    message: 'Info',
    variant: null,
  },
}

const Prompt = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SHOW_SNACKBAR: {
      return {
        ...state,
        state: true,
        options: {
          ...initialState.options,
          ...action.payload,
        },
      }
    }
    case ACTION_TYPES.HIDE_SNACKBAR: {
      return {
        ...state,
        state: null,
      }
    }
    default:
      return state
  }
}

export default Prompt
