import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function(config) {
    const token = Cookies.get("session");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }

    return config
  },

  function(error) {
    return Promise.reject(error);
  }
)

export default axiosInstance