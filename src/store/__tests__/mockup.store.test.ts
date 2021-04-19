import moxios from 'moxios'
import { configureStore } from '@reduxjs/toolkit'

import { mockupsMock } from '@/mocks'
import { actions, reducer, selectors } from '../mockup.store'

describe('mockup store', () => {
	beforeEach(() => moxios.install())
	afterEach(() => moxios.uninstall())

	test('get mockups', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent()
			request.respondWith({ status: 200, response: mockupsMock })
		})

		const store = configureStore({
			reducer,
		})

		const data = await store.dispatch(actions.getMockups())
		expect(data.payload).toStrictEqual(mockupsMock)
	})

	test('mockups selectors', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent()
			request.respondWith({ status: 200, response: mockupsMock })
		})

		const store = configureStore({
			reducer,
		})

		await store.dispatch(actions.getMockups())

		expect(selectors.getPending.resultFunc(store.getState())).toStrictEqual(false)
		expect(selectors.getMockupList.resultFunc(store.getState())).toStrictEqual(mockupsMock)
		expect(selectors.getMockupsBySlug('branding').resultFunc(store.getState())).toStrictEqual([
			{
				id: 'Ao3176YQZE',
				title: 'Branding near the notepad and a duck tape',
				category: ['branding'],
				thumb: 'https://smartmockups-web-assets.imgix.net/mockups/Ao3176YQZE_pr_en.jpg?h=570&w=760&fit=crop',
			},
		])
		expect(selectors.getMockupsCategories.resultFunc(store.getState())).toStrictEqual([
			'branding',
			'desktop',
			'iphone-x',
			'multiple-devices',
		])
	})
})
