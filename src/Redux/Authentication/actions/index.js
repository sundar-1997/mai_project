import { ACTION_TYPES } from '../../../Constants'

export const setAuthentication = (payload) => ({
  type: ACTION_TYPES.AUTH,
  payload,
})
