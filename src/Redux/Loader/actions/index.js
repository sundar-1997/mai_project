import { ACTION_TYPES } from '../../../Constants'

export const showLoader = (payload) => ({
  type: ACTION_TYPES.SHOW_LOADER,
  payload,
})
export const hideLoader = (payload) => ({
  type: ACTION_TYPES.HIDE_LOADER,
  payload,
})
