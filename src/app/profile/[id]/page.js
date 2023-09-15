"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost, likePost, removePost } from '@/store'
import { usePathname } from 'next/navigation'
import { RiDeleteBinLine } from 'react-icons/ri'
import { AiOutlineLike } from 'react-icons/ai'

const page = () => {

    let pathname = usePathname()
    pathname = pathname.split('/')
    const dispatch = useDispatch()

    const owner = useSelector((state) => state.login.owner)
    const [text, setText] = useState('')
    const [verify, setVerify] = useState(false)

    // const { data } = useSelector((state) => {
    //     return {
    //         data: state.posts.data
    //     }
    // })

    const data = useSelector((state) => state.posts.data)

    useEffect(() => {
        owner.slice(0, 4).toLowerCase() === pathname[2] && setVerify(!verify)
    }, [])

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handlePost = () => {
        dispatch(addPost({ text, owner }))
        setText('')
    }

    const handleDelete = (id) => {
        dispatch(removePost(id))
    }

    const handleLike = (id, owner) => {
        dispatch(likePost({ id, owner }))
    }

    let x = 'h-[calc(53rem-5px)]'

    return (
        <div className='w-full h-screen flex flex-col items-center bg-gray-200 py-8'>
            {
                verify && (
                    <div className='w-1/4 h-40 grid content-between border-2 border-blue-700 rounded-md px-2 py-2 bg-white'>
                        <textarea value={text} onChange={handleChange} placeholder='Write about something...' className='outline-none p-2 w-full min-h-4/6 placeholder:italic resize-none'></textarea>
                        <hr></hr>
                        <button onClick={handlePost} className='w-2/12 border h-10 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition font-bold'>Post</button>
                    </div>
                )
            }

            <div className='w-1/4 flex flex-col justify-center h-auto'>
                {
                    data.map((post) => {
                        if (post.owner.slice(0, 4).toLowerCase() === pathname[2]) {
                            return (
                                <div className='bg-white w-full h-24 p-1 mt-3 flex justify-evenly items-center border-2 rounded-md border-black' key={post.id}>
                                    <p className='w-4/5 h-full self-start overflow-y-scroll'>{post.text}</p>
                                    <span className='h-full border border-black self-start'></span>
                                    <div className='flex flex-col h-full justify-around'>
                                        <button onClick={() => handleLike(post.id, owner)} className={`p-2 rounded bg-blue-600 text-white hover:bg-blue-700 ${post.owner.slice(0, 4).toLowerCase() === owner.slice(0, 4).toLowerCase() ? 'hidden' : 'visible'}`}><AiOutlineLike size={20} /></button>
                                        <p className='text-center border border-black'>{post.likes.length}</p>
                                        <button onClick={() => handleDelete(post.id)} className={`p-2 rounded bg-red-600 text-white hover:bg-red-700 ${post.owner.slice(0, 4).toLowerCase() === owner.slice(0, 4).toLowerCase() ? 'visible' : 'hidden'}`}><RiDeleteBinLine size={20} /></button>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}

export default page