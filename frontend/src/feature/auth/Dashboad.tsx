/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react"
import { api } from "../../lib/api"



type User = {
    name: string,
    email: string

}

const Dashboad = () => {

    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("")

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("user/me");
                setUser(res.data.user);
            } catch (error) {
                setErr("NOt Authorized. Please Login")

            } finally {
                setLoading(false)
            }

        }

        fetchUser();
    }, [])

    if (loading) return <h2>Loading a DashBoard</h2>
    if (err) return <h2>{err}</h2>
    if (!user) return <h2>No user  found</h2>



    return (
        <div className="p-4">
            <div className="p-2 shadow-xl bg-white w-125 h-auto">

                <h1 className="text-2xl text-center m-2">Dashboard</h1>
                <div className="flex   justify-center gap-4 mt-2 ">
                    <p className="text-xl ">Name :</p>
                    <p className="text-xl">{user.name}</p>

                </div>
                <div className="flex   justify-center gap-4 mt-2 ">
                    <p className="text-xl ">Email :</p>
                    <p className="text-xl">{user.email}</p>

                </div>

            </div>

        </div>
    )
}

export default Dashboad