import { createReducer, createAsyncThunk, createSelector } from '@reduxjs/toolkit'

import { queryConstants } from '@/constants'
import { arrayHelpers, categoryHelpers } from '@/helpers'
import type { mockupTypes } from '@/types'
import * as request from './request'
import type { RootState } from './store'

const prefix = 'mockup'

/*
 *
 * State
 *
 */
const initialState: mockupTypes.State = {
	list: [],
	pending: true,
}

/*
 *
 * Actions
 *
 */
export const actions = {
	getMockups: createAsyncThunk(`${prefix}/GET-MOCKUPS`, async () => {
		return request.get<mockupTypes.Mockup[]>('mockups')
	}),
}

/*
 *
 * Reducer
 *
 */
export const reducer = createReducer(initialState, builder => {
	builder.addCase(actions.getMockups.pending, state => {
		state.pending = true
	})
	builder.addCase(actions.getMockups.fulfilled, (state, { payload }) => {
		if (payload) {
			state.list = payload
		}
		state.pending = false
	})
	builder.addCase(actions.getMockups.rejected, state => {
		state.pending = false
	})
})

/*
 *
 * Selectors
 *
 */
const getMockup = (state: RootState) => state.mockup

export const selectors = {
	getPending: createSelector(getMockup, mockup => {
		return mockup.pending
	}),

	getMockupList: createSelector(getMockup, mockup => {
		return mockup.list
	}),

	getMockupsBySlug: (slug: string | string[] | undefined) => {
		return createSelector(getMockup, mockup => {
			if (!slug || (slug && typeof slug !== 'string') || slug === queryConstants.defaultSlug) {
				return mockup.list
			}
			return mockup.list.filter(item => item.category.indexOf(slug) > -1)
		})
	},

	getMockupsCategories: createSelector(getMockup, mockup => {
		return arrayHelpers.unify(
			mockup.list.map(item => arrayHelpers.unify(item.category.map(c => categoryHelpers.serializeSlug(c)))).flat(),
		)
	}),
}
