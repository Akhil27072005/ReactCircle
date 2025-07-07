import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const getAccessToken = () => localStorage.getItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers:{
        'Content-Type':'application/json',
    },
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error) 
);



api.interceptors.response.use((response) => response,
    async (error) =>{
        const originalRequest = error.config;

        if(error.response && error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry=true;

            try{
                const refreshToken = getRefreshToken();
                const response = await axios.post(`${BASE_URL}/auth/refresh-token`,{token:refreshToken});

                const newAccessToken = response.data.accessToken;   
                localStorage.setItem('accessToken', newAccessToken);

                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            }
            catch(err){
                console.error("Token refresh failed", err);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
});

export default api;