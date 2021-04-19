import { act, render, RenderResult, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import moxios from 'moxios'

import { store } from '@/store/store'
import { categoriesMock, mockupsMock } from '@/mocks'
import Categories from '@/features/category/Categories'
import Mockups from '@/features/mockup/Mockups'

const MOCK_WIDTH = 500

jest.mock('next/router', () => ({
	useRouter: () => {
		return {
			query: {
				slug: 'all',
			},
			events: {
				on: (name: string, callback: () => void) => jest.fn(),
			},
		}
	},
}))

jest.mock('@/shared/hooks', () => ({
	useResize: jest.fn(),
}))

describe('<Categories />', () => {
	beforeEach(() => moxios.install())
	afterEach(() => moxios.uninstall())

	test('should render skeleton', () => {
		const s = store()
		render(
			<Provider store={s}>
				<Categories />
			</Provider>,
		)
		expect(screen.getByTestId('categories-skeleton')).toBeInTheDocument()
	})

	test('should render available categories', async () => {
		const s = store()
		let result: RenderResult

		moxios.stubRequest(`${process.env.apiEndpoint}/categories`, {
			status: 200,
			response: categoriesMock,
		})
		moxios.stubRequest(`${process.env.apiEndpoint}/mockups`, {
			status: 200,
			response: mockupsMock,
		})

		await act(async () => {
			result = await render(
				<Provider store={s}>
					<Categories />
					<Mockups />
				</Provider>,
			)
		})

		expect(result!.getByTestId('categories').childNodes.length).toStrictEqual(5)
	})

	test('menu button should be visible', async () => {
		const s = store()
		let result: RenderResult
		Object.defineProperty(window, 'innerWidth', {
			writable: true,
			configurable: true,
			value: MOCK_WIDTH,
		})

		moxios.stubRequest(`${process.env.apiEndpoint}/categories`, {
			status: 200,
			response: categoriesMock,
		})
		moxios.stubRequest(`${process.env.apiEndpoint}/mockups`, {
			status: 200,
			response: mockupsMock,
		})

		await act(async () => {
			result = await render(
				<Provider store={s}>
					<Categories />
					<Mockups />
				</Provider>,
			)
		})

		expect(result!.getByTestId('menu-button')).toBeInTheDocument()
		expect(result!.getByTestId('menu-button')).toBeVisible()
	})
})
