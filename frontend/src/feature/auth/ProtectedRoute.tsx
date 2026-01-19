import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProctectedRoutes = ({children}:{children:React.ReactNode})=>{
    const {user, loading} = useAuth()
       
    if(loading) return <p>Checking  auth ....</p>
    if(!user) return  <Navigate to="/login" replace/>

    return children
}

export default ProctectedRoutes