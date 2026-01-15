/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { api } from '../../lib/api'
import { loginSchema } from '../validation/zod'

function Login() {

    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState("")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(form);

      const validation = loginSchema.safeParse(form);

      if(!validation.success){
        setError(validation.error.issues[0].message)
        return
      }
        try {

            setLoading(true)
            setError("")
            setSuccess("")

            await api.post("/user/login", validation.data)
            console.log("User login Successful");

            setSuccess("User loggged IN")


            setForm({
                email: "",
                password: ""
            })
        } catch (err: any) {
            setError(err.response?.data?.message || "login Failed")
        } finally {
            setLoading(false)
        }

    }
    return (
        <div>
            <form action="" onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="">email</label>
                    <input type="email"
                        name='email'
                        placeholder='email'
                        value={form.email}
                        onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="">password</label>
                    <input type="password"
                        name='password'
                        placeholder='password'
                        value={form.password}
                        onChange={handleChange} />
                </div>



                <button type='submit' disabled={loading}>
                    {loading ? "logining " : "login"}
                </button>


                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
            </form>
        </div>
    )
}

export default Login