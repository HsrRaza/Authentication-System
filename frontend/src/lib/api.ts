import axios from "axios";

export const api =axios.create({
    baseURL:"http://localhost:5001/api/v1",
    withCredentials:true , // cookies
})


api.interceptors.response.use(
    (res)=> res,
    (err)=> {

        const status = err.response?.status;
        const url = err.confiq?.url;

        if(status  === 401 && !url?.includes("/user/me")){
            console.log("401 on proctected API");

        }
        return Promise.reject(err)
            
    }
)
