"use client"
import { addUser, setLogin, setOwner } from '@/store'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'


export default function Home() {

  const dispatch = useDispatch()
  const router = useRouter()
  const [id, setId] = useState('')

  const list = useSelector((state) => state.users.list)
  const login = useSelector((state) => state.login.login)

  useEffect(() => {
    login && router.push(`/profile/${id}`)
  }, [login])

  const [visitor, setVisitor] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVerify, setPasswordVerify] = useState('')
  const [verify, setVerify] = useState(false)

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handlePasswordVerifyChange = (e) => {
    setPasswordVerify(e.target.value)
    passwordVerify !== password ? setVerify(verify) : setVerify(!verify)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!visitor) {
      dispatch(addUser({ email, password }))
      console.log('kayıt oldunuz')
      handleVisitor()
    }
    else {
      list.map((user) => {
        if (email === user.email && password === user.password) {
          setId(user.id.slice(0, 4).toLowerCase())
          dispatch(setOwner(user.id))
          dispatch(setLogin())
        }
        else {
          console.log('mail veya şifre hatalı')
        }
      })
    }
  }

  const handleVisitor = () => {
    setVisitor(!visitor)
    setDisabled(!disabled)
  }

  const buttonDefaultStyles = "border-2 p-2 w-28 rounded-md text-sm font-semibold border-blue-600 text-blue-600 disabled:opacity-60"
  const buttonActiveStyles = "border-2 p-2 w-28 rounded-md text-sm font-semibold border-blue-600 bg-blue-600 text-white hover:bg-blue-800 hover:border-blue-800"
  const inputStyles = `p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-600 focus:ring-blue-600 focus:ring-1  
                       invalid:text-red-500 invalid:ring-red-500 invalid:focus:border-red-500 invalid:focus:ring-red-500`

  return (
    <div className="w-screen h-screen flex justify-center content-center absolute top-0">
      <div className="w-1/5 bg-gray-100 border rounded-lg m-auto p-9 flex flex-col gap-5 justify-between">
        <h1 className="text-center text-2xl font-bold">Create Your Account</h1>
        <span className="text-sm text-center ">{!visitor ? 'You alredy registered?' : 'Create Account'} <span onClick={handleVisitor} className="text-blue-700 font-semibold cursor-pointer">{!visitor ? 'Login' : 'Sign up'}</span></span>
        <form onSubmit={handleSubmit} className="bg-white flex flex-col p-4 gap-4 rounded-md shadow-lg">
          <div className="">
            <label className="font-medium text-sm">Email</label>
            <input onChange={handleEmailChange} value={email} type="email" required placeholder='you@example.com' className={inputStyles} />
          </div>
          <div className="">
            <label className="font-medium text-sm">Password</label>
            <input onChange={handlePasswordChange} value={password} type="password" className={inputStyles} />
          </div>
          {!visitor && (
            <div className="">
              <label className="font-medium text-sm">Password</label>
              <input onChange={handlePasswordVerifyChange} value={passwordVerify} type="password" className={inputStyles} />
            </div>
          )}
          <div className="flex justify-around p-2">
            <button disabled={!disabled} className={`${!visitor ? buttonDefaultStyles : buttonActiveStyles}`} >Login</button>
            <button disabled={disabled} className={`${visitor ? buttonDefaultStyles : buttonActiveStyles}`}>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  )
}
