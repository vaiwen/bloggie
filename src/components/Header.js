"use client"
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { setLogin } from '@/store'

const Header = () => {

    const router = useRouter()
    const dispatch = useDispatch()

    const [searchUser, setSearchUser] = useState('')

    const login = useSelector((state) => state.login.login)
    const list = useSelector((state) => state.users.list)

    const handleChange = (e) => {
        setSearchUser(e.target.value)
    }

    const handleProfile = (id) => {
        router.push(`/profile/${id.slice(0, 4).toLowerCase()}`)
        setSearchUser('')
    }

    const handleLogout = () => {
        dispatch(setLogin())
        router.push('/')
    }

    return (
        <div className={`bg-gray-100 h-30 py-5 px-14 text-3xl flex relative z-10 ${!login ? 'justify-center' : 'justify-center'}`}>
            {!login ? (
                <h1>Bloggie</h1>
            ) : (
                <div className=' w-full flex items-center justify-between'>
                    <h1>Bloggie</h1>
                    <div className='flex flex-col relative'>
                        <input onChange={handleChange} value={searchUser} className=' w-80 relative right-8 border-2 rounded-md p-2 text-lg' type="text" placeholder='search user, press "*" for all users' />
                        {
                            searchUser.length >= 1 && (
                                <ul className='w-64 border-2 h-auto rounded-md bg-white overflow-y-scroll relative top-2'>
                                    {
                                        list.map((user) => {
                                            if (searchUser === '*') {
                                                return (
                                                    <li key={user.id} onClick={() => handleProfile(user.id)} className='p-3 text-sm border hover:bg-slate-100 hover:cursor-pointer transition'>{user.email}</li>
                                                )
                                            }
                                            else if (user.email.includes(searchUser)) {
                                                return (
                                                    <li key={user.id} onClick={() => handleProfile(user.id)} className='p-3 text-sm border hover:bg-slate-100 hover:cursor-pointer transition'>{user.email}</li>
                                                )
                                            }
                                        })
                                        // list.map((user) => (
                                        //     <li onClick={() => handleProfile(user.id)} className='p-3 text-sm border hover:bg-slate-100 hover:cursor-pointer transition' key={user.id}>
                                        //         {user.email.includes(searchUser) && user.email}
                                        //     </li>
                                        // ))
                                    }
                                </ul>
                            )
                        }

                    </div>
                    <button onClick={handleLogout} className='p-2 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer rounded-md text-base font-bold'>Logout</button>
                </div>
            )}
        </div>
    )
}

export default Header