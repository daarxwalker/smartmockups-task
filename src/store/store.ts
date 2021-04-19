import { configureStore, combineReducers, Store } from '@reduxjs/toolkit'
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper'

import { reducer as categoryReducer } from './category.store'
import { reducer as mockupReducer } from './mockup.store'

export const combinedReducer = combineReducers({
	category: categoryReducer,
	mockup: mockupReducer,
})

export type RootState = ReturnType<typeof combinedReducer>

const reducer = (state: any, action: any) => combinedReducer(state, action)

export const store = () =>
	configureStore({
		reducer,
		devTools: process.env.NODE_ENV !== 'production',
	})

export const createStore: MakeStore = (_: Context) => store()

export const wrapper = createWrapper<Store<RootState>>(createStore, { debug: process.env.NODE_ENV === 'development' })
