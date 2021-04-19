import { createAsyncThunk, createReducer, createSelector } from '@reduxjs/toolkit'

import { categoryHelpers } from '@/helpers'
import type { categoryTypes } from '@/types'
import { actions as mockupActions, selectors as mockupSelectors } from './mockup.store'
import * as request from './request'
import type { RootState } from './store'

const prefix = 'category'

/*
 *
 * State
 *
 */
export const initialState: categoryTypes.State = {
	list: [],
	pending: true,
}

/*
 *
 * Actions
 *
 */
export const actions = {
	getCategories: createAsyncThunk(`${prefix}/GET-CATEGORIES`, async () => {
		return request.get<categoryTypes.Category[]>('categories')
	}),
}

/*
 *
 * Reducer
 *
 */
export const reducer = createReducer(initialState, builder => {
	builder.addCase(actions.getCategories.pending, state => {
		state.pending = true
	})
	builder.addCase(actions.getCategories.fulfilled, (state, { payload }) => {
		if (payload) {
			state.list = payload
		}
	})
	builder.addCase(mockupActions.getMockups.fulfilled, state => {
		state.pending = false
	})
	builder.addCase(actions.getCategories.rejected, state => {
		state.pending = false
	})
})

/*
 *
 * Selectors
 *
 */
const getCategory = (state: RootState) => state.category

export const selectors = {
	getCategoryList: createSelector([getCategory, mockupSelectors.getMockupsCategories], (category, activeCategories) => {
		if (!activeCategories.length) {
			return category.list
		}
		return categoryHelpers.filterByArray(category.list, activeCategories)
	}),

	getPending: createSelector(getCategory, category => category.pending),
}
