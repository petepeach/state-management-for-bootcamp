import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import {auth, signInWithEmailAndPassword} from "../firebase";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlLoginSubmit = async (event) => {
    setErrorMessage("");
    event.preventDefault();
    console.log(email, password)
    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log('userCredential'+ JSON.stringify(userCredential.user));
      if (userCredential.user) {
        console.log('login success');
        navigate("/profile");
      }
    }catch(error){
      console.log('error'+ error.code);
      setErrorMessage(error.code)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Login</h3>
       {
        errorMessage && <p className="text-red-500 text-center">Error Message style</p>
       }
        <form onSubmit={handlLoginSubmit}>
          <div className="mt-4">
            <label className="block" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mt-4">
            <label className="block">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2 items-center justify-between ">
            <button className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
              Login
            </button>
            <Link
              to="/register"
              className="text-sm text-blue-600 hover:underline"
            >
              Don't have an account? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login