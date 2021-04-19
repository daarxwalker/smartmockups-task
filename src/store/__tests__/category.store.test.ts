import moxios from 'moxios'
import { configureStore } from '@reduxjs/toolkit'

import { categoriesMock } from '@/mocks'
import { actions, reducer, selectors } from '../category.store'

describe('category store', () => {
	beforeEach(() => moxios.install())
	afterEach(() => moxios.uninstall())

	test('get categories', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent()
			request.respondWith({ status: 200, response: categoriesMock })
		})

		const store = configureStore({
			reducer,
		})

		const data = await store.dispatch(actions.getCategories())
		expect(data.payload).toStrictEqual(categoriesMock)
	})

	test('categories selectors', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent()
			request.respondWith({ status: 200, response: categoriesMock })
		})

		const store = configureStore({
			reducer,
		})

		await store.dispatch(actions.getCategories())

		expect(selectors.getPending.resultFunc(store.getState())).toStrictEqual(true)
		expect(selectors.getCategoryList.resultFunc(store.getState(), ['iphone-x'])).toStrictEqual([
			{ title: 'iPhone X', slug: 'iphone-x', children: [] },
		])
	})
})
