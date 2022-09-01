import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', status: '' }

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setInfo(state, action) {
      const { message, status } = action.payload
      return { message, status }
    },
  },
})

export const { setInfo } = infoSlice.actions

export const displayInfo = (message, status) => {
  return (dispatch) => {
    dispatch(setInfo({ message, status }))

    setTimeout(() => {
      dispatch(setInfo({ message: '', status: '' }))
    }, 5000)
  }
}

export default infoSlice.reducer
