/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react"


const Login = () => {



    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading , setLoading] = useState("");
    const [error , setError] = useState("")

    
    
  return (
    <div>
        <h2>Login In</h2>

        <input type="text"
        placeholder="Enter your email" />

        <input type="password"
        placeholder="password" />
        

    </div>
  )
}

export default Login