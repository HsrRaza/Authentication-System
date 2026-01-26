/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { api } from '../../lib/api'
import { loginSchema } from '../validation/zod'
import { Link, Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { toast } from 'react-toastify'

function Login() {

    const setUser = useAuthStore((s)=>s.setUser);
    const isAuthecticated = useAuthStore((s)=>s.isAuthecticated);


    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    // const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    // const [success, setSuccess] = useState("")


    if(isAuthecticated){
        return <Navigate to="/dashboard" replace/>
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(form);
        // setError("")

      const validation = loginSchema.safeParse(form);

      if(!validation.success){
        // setError(validation.error.issues[0].message)
        toast.error(validation.error.issues[0].message)
        return
      }
        try {

            setLoading(true)
            // setError("")
            // setSuccess("")

            console.log("sending request ");
            

            await api.post("/user/login", validation.data)
            console.log("User login Successful");
            // setSuccess("User loggged IN")
            toast.success("User Logged Successfully")
            
            const meRes = await api.get("/user/me");
            setUser(meRes.data.user);



            setForm({
                email: "",
                password: ""
            })
        } catch (err: any) {
            // setError(err.response?.data?.message || "login Failed")
            toast.error(err.response?.data?.message || "login Failed")
        } finally {
            setLoading(false)
        }

    }
    return (
        <div className='bg-white shadow-xl p-5 w-125 h-auto rounded-xl'>

            <h3 className='text-xl text-center'>Login</h3>
            <form action="" onSubmit={handleSubmit}>

                <div className='w-full mb-2  p-2'>
                   <p className='mb-2 text-lg'>Email</p>
                    <input type="email"
                        name='email'
                        className='px-2 py-3 outline-none bg-stone-200  rounded-lg w-full'
                        placeholder='alex@gmail.com'
                        value={form.email}
                        onChange={handleChange} />
                </div>
                <div className='w-full mb-2 p-2'>
                    <p className='mb-2 text-lg'>Password</p>
                    <input type="password"
                        name='password'
                        placeholder='****'
                        className='px-2 py-3 outline-none bg-stone-200  rounded-lg w-full'
                        value={form.password}
                        onChange={handleChange} />
                </div>
                <div className='flex  justify-between p-2'>
                    <p className='text-stone-600'>Don't Have an Account</p>
                    <p className='text-stone-600'><Link to="/signup">Sign Up</Link></p>
                </div>



                <button type='submit' disabled={loading} className='px-2 py-2  w-full bg-stone-950 text-stone-50 rounded-lg hover:bg-stone-900 cursor-pointer'>
                    {loading ? "logining " : "login"}
                </button>


                {/* {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>} */}
            </form>
        </div>
    )
}

export default Login