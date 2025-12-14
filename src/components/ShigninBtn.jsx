import { auth, provider } from '../config/firebaseAuth'
import { signInWithPopup, signOut } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { addUserData } from '../utilsh/authSlice'
import { removeUserData } from '../utilsh/authSlice'
import { toogleLoginBar } from '../utilsh/ToogleSlice'

const ShigninBtn = () => {

  const userData = useSelector((state) => state.authSlice.userData)
  const dispatch = useDispatch()

  const handelAuth = async () => {
    let data = await signInWithPopup(auth, provider)
    const userData = {
      name: data.user.displayName,
      photo: data.user.photoURL
    }

    dispatch(toogleLoginBar())
    dispatch(addUserData(userData))
  }

  const handleLogout = async () => {
    await signOut(auth)
    dispatch(removeUserData())
    dispatch(toogleLoginBar())
  }

  return (
    <>
      {
        userData
          ? (
            <button
              onClick={handleLogout}
              className='bg-[#fc8018] text-white font-semibold px-33 py-3 
              shadow-md active:scale-95 transition-all duration-150 cursor-pointer'
            >
              Log Out
            </button>
          )
          : (
            <button
              onClick={() => {
                handelAuth()
              }}
              className='bg-[#fc8018] text-white font-semibold px-23 py-3 
              shadow-md active:scale-95 transition-all duration-150 cursor-pointer'
            >
              Login with GOOGLE
            </button>
          )
      }
    </>
  )
}

export default ShigninBtn
