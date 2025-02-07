import { ACTION_TYPES } from '../../../Constants'

export const showSnackbar = (payload) => ({
  type: ACTION_TYPES.SHOW_SNACKBAR,
  payload,
})
export const hideSnackbar = (payload) => ({
  type: ACTION_TYPES.HIDE_SNACKBAR,
  payload,
})
