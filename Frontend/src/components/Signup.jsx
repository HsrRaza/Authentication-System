/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

const Signup = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [loading, setLoading] = useState(false)
  const [, setMsg] = useState("")

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(input);

    setLoading(true);
    setMsg("")

    try {
      const {name , email, password} = input
      const res = await fetch({
         method:"POST",
         headers:{
          "Conctent-Type":"application/json",
         },
         body:JSON.stringify({name, email, password })
      })

      const data = await res.json()

      if(!res.ok){
        throw new Error(data.message || "Sign Failed")
      }
      setMsg(`Welcome ${data.user.name}!`);
      localStorage.setItem("token", data.token)
      
    } catch (err) {
      setMsg(err.message)
    } finally{
      setLoading(false)
    }



  }

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    console.log(input);

  }


  

  return (
    <div className='container'>

      <div className='box'>


        <h2>Welcome to Our Auth System</h2>

        <p>Sign Up to test the Auth System</p>
        <form action="" onSubmit={handleSubmit}>



          <div className=''>
            <label htmlFor="">Name</label>

            <input type="text" name="name" value={input.name}
              onChange={handleChange} />

          </div>

          <div className=''>
            <label htmlFor="">Email</label>


            <input type="email" name="email" value={input.email}
              onChange={handleChange} />
          </div>


          <div className=''>
            <label htmlFor="">password</label>
            <input type="text" name="password" value={input.password}
              onChange={handleChange} />
          </div>
          <p>Already Have an account then  Login </p>

          <div className="btns">
            <button type='submit'>Sign up </button>
            <button>SignUp via Google</button>
          </div>
        </form>



      </div>

    </div>


  )
}

export default Signup