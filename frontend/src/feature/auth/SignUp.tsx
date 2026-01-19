import React, { useState } from 'react'
import { api } from '../../lib/api';
import { signSchema } from '../validation/zod';
import { Link } from 'react-router-dom';

const SignUp = () => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: ""

    })

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const validation = signSchema.safeParse(form);

        if (!validation.success) {
            setError(validation.error.issues[0].message)
            return
        }
        setError("")
        console.log("form is valid", form);

        try {
            setLoading(true);
            setError("");

            await api.post("/user/register", validation.data);

            console.log("User registered");

            setSuccess("Accout Created successfully  ")
            setForm({
                name: "",
                email: "",
                password: "",
                role: ""
            });



            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(
                err.response?.data?.message || "Something went Wrong"
            )
        } finally {
            setLoading(false)
        }
    }



    return (
        <div className='bg-white shadow-xl p-5 w-125 h-auto rounded-xl '>

            <h2 className='text-xl text-center'>Sign Up</h2>

            <form onSubmit={handleSubmit}>



                <div className='
                 w-full mb-2  p-2'>
                    <p className='mb-2 text-lg '>Name</p>
                    <input type="text"
                    className='px-2 py-3 outline-none bg-stone-200  rounded-lg w-full'
                        name='name'
                        placeholder='Alex'
                        value={form.name}
                        onChange={handleChange} />
                </div>
                <div className=' w-full mb-2  p-2'>
                   <p className='mb-2 text-lg'>Email</p>
                    <input type="text"
                    placeholder='alex@gmail.com'
                    className='px-2 py-3 outline-none bg-stone-200 rounded-lg w-full'
                        name='email'
                        value={form.email}
                        onChange={handleChange} />
                </div>
                <div className='w-full mb-2  p-2'>
                   <p className='mb-2 text-lg'>Password</p>
                    <input type="password"
                    className='px-2 py-3 outline-none bg-stone-200 rounded-lg w-full'
                    placeholder='***'
                        name='password'
                        value={form.password}
                        onChange={handleChange} />
                </div>
                <div className='w-full mb-2 p-2'>
                    <select name="role" value={form.role} onChange={handleChange} className='outline-none w-full text-lg'>
                        <option value="" className='text-lg'>select role</option>
                        <option value="user" className='text-lg'>user</option>
                        <option value="user" className='text-lg'>admin</option>
                    </select>
                </div>

                <div className=' flex  justify-between p-2'>
                   <p className='text-stone-600'> Already Have an Account</p>
                    <p className='text-stone-600'><Link to="/login">Login</Link></p>
                </div>

                <button type='submit' disabled={loading} className='px-2 py-2  w-full bg-stone-950 text-stone-50 rounded-lg hover:bg-stone-900 cursor-pointer'>
                    {loading ? "Signing up..." : "Sign Up"}
                </button>

                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}

            </form>

        </div>
    )
}

export default SignUp