/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react"
import { api } from "../../lib/api"


function Dashboad() {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const res = await api.get("/user/me");
                setUser(res.data.user)
            } catch (err) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }


        fetchMe();
    }, []);

    if (loading) return <p>loading ....</p>
    if (!user) return <p>please login </p>
    return (
        <div>
            <h2>welcome {user.email}</h2>

        </div>
    )
}

export default Dashboad