import { useState } from "react"
import { getAuth, signInWithCustomToken } from "firebase/auth";
import {auth, createUserWithEmailAndPassword} from "../firebase";
import { stringify } from "postcss";
function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlResgisterSubmit = async (event) => {
    setErrorMessage("");
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    try{
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      console.log('userCredential'+ userCredential);
    }catch(error){
      if(error.code === 'auth/email-already-in-use'){
        setErrorMessage('Email already in use');
      }else if(error.code === 'auth/weak-password'){
        setErrorMessage('Password too weak');
      }else if(error.code === 'auth/invalid-email'){
        setErrorMessage('Invalid email');
      }else{
        setErrorMessage('ยังไม่รู้ว่า error อะไร');
      }
      console.log('error'+ error.code);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Register</h3>
        {
          errorMessage && <p className="text-center text-red-500"> Error Message : {errorMessage}</p>
        }
        <form onSubmit={handlResgisterSubmit}>
          <div className="mt-4">
            <div>
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
            <div className="flex items-baseline justify-between">
              <button className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register