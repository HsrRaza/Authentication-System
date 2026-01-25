

import { useAuthStore } from "../store/useAuthStore"



const Dashboad = () => {

   const user = useAuthStore( (s)=> s.user);

    return (
        <div className="p-4">
            <div className="p-2 shadow-xl bg-white w-125 h-auto">

                <h1 className="text-2xl text-center m-2">Dashboard</h1>
                <div className="flex   justify-center gap-4 mt-2 ">
                    <p className="text-xl ">Name :</p>
                    <p className="text-xl">{user?.name}</p>

                </div>
                <div className="flex   justify-center gap-4 mt-2 ">
                    <p className="text-xl ">Email :</p>
                    <p className="text-xl">{user?.email}</p>

                </div>

            </div>

        </div>
    )
}

export default Dashboad