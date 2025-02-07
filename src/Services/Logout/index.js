/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { API_ENDPOINTS } from "../../Constants";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  logoutbyid: (id) => {
    let url = API_ENDPOINTS.LOGOUT + "/" + id;
    return axios.post(url, {
      headers: { isAuthRequired: true, "Content-Type": "application/json" },
    });
  },
};
