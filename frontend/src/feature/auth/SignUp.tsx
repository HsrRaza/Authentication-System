import React, { useState } from 'react'
import { api } from '../../lib/api';
import { signSchema } from '../validation/zod';

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
        <div>

            <form onSubmit={handleSubmit}>



                <div>
                    <label htmlFor="">Name</label>
                    <input type="text"
                        name='name'
                        value={form.name}
                        onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="">Email</label>
                    <input type="text"
                        name='email'
                        value={form.email}
                        onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input type="password"
                        name='password'
                        value={form.password}
                        onChange={handleChange} />
                </div>
                <div>
                    <select name="role" value={form.role} onChange={handleChange}>
                        <option value="">select role</option>
                        <option value="user">user</option>
                    </select>
                </div>

                <button type='submit' disabled={loading}>
                    {loading ? "Signing up..." : "Sign Up"}
                </button>

                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}

            </form>

        </div>
    )
}

export default SignUp