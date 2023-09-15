import { configureStore } from "@reduxjs/toolkit";
import { usersReducer, addUser } from "./slices/usersSlice";
import { loginReducer, setLogin, setOwner } from "./slices/loginSlice";
import { postsReducer, addPost, removePost, likePost } from "./slices/postsSlice";

const store = configureStore({
    reducer: {
        users: usersReducer,
        login: loginReducer,
        posts: postsReducer
    }
})

export { store, addUser, setLogin, setOwner, addPost, removePost, likePost }