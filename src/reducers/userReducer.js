import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import authService from '../services/auth'

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
    if (user) {
      dispatch(setUser(user))
      blogService.createAuthToken(user)
    }
    dispatch(setUser(initialState))
  }
}

export const loginUser = (loginForm) => {
  return async (dispatch) => {
    const user = await authService.login(loginForm)
    dispatch(setUser(user))
    blogService.createAuthToken(user)
    window.localStorage.setItem('user', JSON.stringify(user))
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch(setUser(initialState))
    window.localStorage.removeItem('user')
    blogService.removeToken()
  }
}

export const { setUser, resetUser } = userSlice.actions
export default userSlice.reducer
