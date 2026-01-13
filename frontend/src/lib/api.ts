import axios from "axios";

export const api =axios.create({
    baseURL:"http://localhost:5001/api/v1",
    withCredentials:true , // cookies
})


api.interceptors.response.use(
    (res)=> res,
    (err)=> {
        if(err.response?.status === 401 ){
            console.log("unauthorized  -> logout");

        }
        return Promise.reject(err)
            
    }
)
