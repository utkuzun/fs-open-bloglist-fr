import { configureStore } from '@reduxjs/toolkit'
import infoReducer from './reducers/infoReducer'

const store = configureStore({
  reducer: {
    info: infoReducer,
  },
})

export default store
