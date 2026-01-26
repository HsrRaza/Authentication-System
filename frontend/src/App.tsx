
import { Route, Routes } from "react-router-dom"
import Login from "./feature/auth/Login"
import SignUp from "./feature/auth/SignUp"
import Dashboad from "./feature/auth/Dashboad"
import ProctectedRoute from "./feature/auth/ProtectedRoutes"



const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">
  
  <Routes>
    <Route path="/" element={<SignUp/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/sign" element={<SignUp/>}/>
    <Route path="/dashboard" element={<ProctectedRoute>
      <Dashboad/>
    </ProctectedRoute>}/>
    {/* <Route path="/dashboard" element={<Dashboad/>}/> */}

    
  </Routes>

    </div>
  )
}

export default App