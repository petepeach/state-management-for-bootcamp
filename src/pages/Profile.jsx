import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import {auth, db} from "../firebase";
import {onAuthStateChanged, signOut} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; 

function Profile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userUid, setUserId] = useState("");

  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    birthDate: '',
    interests: [],
  });

  //check already logged in stay in this page else go back to login page
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user'+ JSON.stringify(user));
      if (user) {
        setEmail(user.email)
        setUserId(user.uid)
      }else{
        navigate('/')
      }
    })
  }, [])

  //Update profile and retrieve profile via firestor
  const handleradioChange = (event) => {
    const {name, value} = event.target
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name] : value
    }))
  }

  const handleCheckbox = (event) => {
    if(event.target.checked){
      setFormData({
        ...formData,
        interests: [...formData.interests, event.target.value]
      })
    }else{
      setFormData({
        ...formData, 
        interests: formData.interests.filter((interest) => interest !== event.target.value)
      })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      await setDoc(doc(db, "users", userUid), {
        fullName: formData.fullName,
        gender: formData.gender,
        birthDate: formData.birthDate,
        interests: formData.interests
      })
      console.log('setDoc');
    }catch(error){
      console.log('error'+ error.code);
    }
  }

  const fetchUser = async(userUid) => {
    const docRef = doc(db, "users", userUid);
    const docSnap = await getDoc(docRef);
    console.log('docSnap', docSnap.data())
    setFormData(docSnap.data())
  }

  useEffect(() => {
    if(userUid){
      fetchUser
    }
  }, [userUid])

  console.log('formData', formData)

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg max-w-lg w-full">
        <form>
          <h3 className="text-2xl font-bold text-center mb-4">Profile</h3>
          <div className="mt-4">
            <label className="block">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              value={formData.fullName}
              onChange={(event) => setFormData({ ...formData, fullName: event.target.value })}
            />
          </div>
          <div className="mt-4">
            <label className="block">Gender</label>
            <div className="flex gap-4">
              <label>
                <input
                  name="gender"
                  type="radio"
                  value="Male"
                  onChange={handleradioChange}
                />{' '}
                Male
              </label>
              <label>
                <input
                  name="gender"
                  type="radio"
                  value="Female"
                  onChange={handleradioChange}
                />{' '}
                Female
              </label>
            </div>
          </div>
          <div className="mt-4">
            <label className="block">Birthdate</label>
            <input
              type="date"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              value={formData.birthDate}
              onChange={(event)=> setFormData({ ...formData, birthDate: event.target.value })}
            />
          </div>
          <div className="mt-4">
            <label className="block">interests</label>
            <div className="flex flex-wrap gap-4">
              <label>
                <input
                  type="checkbox"
                  value="Reading"
                  onChange={handleCheckbox}
                />{' '}
                Reading
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Traveling"
                  onChange={handleCheckbox}
                />{' '}
                Traveling
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Gaming"
                  onChange={handleCheckbox}
                />{' '}
                Gaming
              </label>
              {/* Add more interests as needed */}
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                    onClick={handleSubmit}>
              Update Profile
            </button>
            <button
              className="px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-red-700"
              onClick={() => signOut(auth)}      
              >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile