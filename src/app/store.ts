import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/auth-slice'
import productsReducer from '../features/products/products-slice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useTypedSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector
export default store