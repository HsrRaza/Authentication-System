
import {create} from "zustand"



interface User {
    // Add your user properties here
    name: string;
    email: string;
    role:string;
    isVerified:boolean;
}

interface AuthStore {
    user: User | null;
    isAuthecticated: boolean;
    isLoading:boolean;
    setUser: (user: User) => void;
    logout: () => void;
    setLoading:(loading:boolean)=> void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthecticated: false,
    isLoading:true,

    setUser: (user: User) =>
        set({
            user,
            isAuthecticated: true,
            isLoading:false,
        }),

    logout: () =>
        set({
            user: null,
            isAuthecticated: false,
            isLoading:false
        }),

        setLoading: (loading)=>
            set({
                isLoading:loading
            })
}));