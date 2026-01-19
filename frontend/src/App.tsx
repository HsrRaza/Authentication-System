
import { Route, Routes } from "react-router-dom"
import Login from "./feature/auth/Login"
import SignUp from "./feature/auth/SignUp"
import Dashboad from "./feature/auth/Dashboad"


const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">

      <Routes>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboad/>}/>
      </Routes>
      
    </div>
  )
}

export default App