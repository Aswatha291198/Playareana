import axios from'axios'


export const axiosInstance=axios.create({
    headers:{
        "Content-type":"application/json"
    }
})

axiosInstance.interceptors.request.use(function(config){
    const token=localStorage.getItem("token")
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config
})
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // 🔥 token expired / invalid
      localStorage.removeItem("token")
      localStorage.removeItem("city")   // ✅ remove city here
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)