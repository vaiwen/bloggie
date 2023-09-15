import { createSlice, nanoid } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        list: []
    },
    reducers: {
        addUser(state, action) {
            state.list.push({
                id: nanoid(),
                email: action.payload.email,
                password: action.payload.password
            })
        }
    }
})

export const { addUser } = usersSlice.actions
export const usersReducer = usersSlice.reducer