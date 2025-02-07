/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
import { API_ENDPOINTS } from '../../Constants'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register: (data) => {
    //console.log("data-->",data);
    return axios.post(API_ENDPOINTS.REGISTER, data, {
      headers: { 'Content-Type': 'application/json' },
    })
  },
}
