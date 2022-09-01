import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = { name: '', token: '', username: '' }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },

    resetUser() {
      return initialState
    },
  },
})

export const setInitUser = () => {
  return async (dispatch) => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    dispatch(setUser(user))
    blogService.createAuthToken(user)
  }
}

export const { setUser, resetUser } = userSlice.actions
export default userSlice.reducer
