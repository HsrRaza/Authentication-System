/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from "react"

import { api } from "../lib/api"

type AuthConextType = {
    user: any | null;
    loading: boolean;
    logout: () => Promise<void>;
}

const AuthConext = createContext<AuthConextType | null>(null);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await api.get("/user/me")
                setUser(res.data.user)
            }
            catch (err) {
                setUser(err)
            } finally {
                setLoading(false)
            }
        }

        fetch()
    }, [])

    const logout = async()=>{
        await api.post("user/logout");
        setUser(null)
    };

    return (
        <AuthConext.Provider value={{user, loading, logout}}>{children}</AuthConext.Provider>
    )
        
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = ()=>{
    const ctx  = useContext(AuthConext);
    if(!ctx) throw  new Error("useAuth  must be  used  inside  AuthProvider")
        return ctx
}