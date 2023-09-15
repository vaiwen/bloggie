import { createSlice, nanoid } from "@reduxjs/toolkit";

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        data: []
    },
    reducers: {
        addPost(state, action) {
            state.data.push({
                id: nanoid(),
                text: action.payload.text,
                owner: action.payload.owner,
                likes: []
            })
        },
        removePost(state, action) {
            const updatedPosts = state.data.filter((post) => {
                return post.id !== action.payload
            })
            state.data = updatedPosts
        },
        likePost(state, action) {
            let validation = 0
            state.data.forEach((post) => {
                if (post.id === action.payload.id) {
                    post.likes.forEach((like, i) => {
                        // i++
                        if (like === action.payload.owner) {
                            post.likes.splice(i, 1)
                            // i = 0
                            validation++
                        }
                    })
                    validation < 1 ? post.likes.push(action.payload.owner) : ''
                }
            })
        }
    }
})

export const { addPost, removePost, likePost } = postsSlice.actions
export const postsReducer = postsSlice.reducer