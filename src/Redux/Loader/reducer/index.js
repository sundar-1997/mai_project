import { ACTION_TYPES } from '../../../Constants'

const initialState = {
  showLoader: false,
  loaderTxt: '',
}

const Loader = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SHOW_LOADER: {
      return {
        ...state,
        showLoader: true,
        loaderTxt: action.payload,
      }
    }
    case ACTION_TYPES.HIDE_LOADER: {
      return {
        ...state,
        showLoader: false,
        loaderTxt: '',
      }
    }
    default:
      return state
  }
}

export default Loader
