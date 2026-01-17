
import Login from "./feature/auth/Login"
import SignUp from "./feature/auth/SignUp"


const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">
      {/* <SignUp/> */}
      <Login/>
      {/* <Dashboad/> */}
    </div>
  )
}

export default App