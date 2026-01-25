import React, { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { api } from '../../lib/api';

const AuthProvider = ({children}:{children:React.ReactNode}) => {

    const setUser = useAuthStore((state)=> state.setUser);
    const logout = useAuthStore( (state)=> state.logout);
    const setLoading = useAuthStore((s)=>s.setLoading);

    useEffect( ()=>{
        const loadUser = async ()=>{
            try {
                const res = await api.get("/user/me");

                 setUser(res.data.user)
            } catch {
                logout()
                setLoading(false);
            }
        }
                
        loadUser()
    },[setUser, logout, setLoading])


  return <>{children}</>
}

export default AuthProvider