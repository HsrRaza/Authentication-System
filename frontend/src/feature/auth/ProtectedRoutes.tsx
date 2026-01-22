import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore"

const ProctectedRoute = ({children}:{children:React.ReactNode})=>{
    const {isAuthecticated, isLoading} = useAuthStore();


    if(isLoading){
        return <p>Checking authentication... </p>
    }

    if(!isAuthecticated){
        return <Navigate to="/login" replace/>
    }

    return children

}
export default ProctectedRoute