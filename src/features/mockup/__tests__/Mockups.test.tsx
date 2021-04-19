import { act, render, RenderResult, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import moxios from 'moxios'

import { store } from '@/store/store'
import { mockupsMock } from '@/mocks'
import Mockups from '@/features/mockup/Mockups'

jest.mock('next/router', () => ({
	useRouter: () => {
		return {
			query: {
				slug: 'desktop',
			},
		}
	},
}))

describe('<Mockups />', () => {
	beforeEach(() => {
		moxios.install()
		jest.clearAllMocks()
	})
	afterEach(() => moxios.uninstall())

	test('should render skeleton', () => {
		const s = store()
		render(
			<Provider store={s}>
				<Mockups />
			</Provider>,
		)
		expect(screen.getByTestId('mockups-skeleton')).toBeInTheDocument()
	})

	test('should render desktop mockups', async () => {
		const s = store()
		let result: RenderResult

		moxios.stubRequest(`${process.env.apiEndpoint}/mockups`, {
			status: 200,
			response: mockupsMock,
		})

		await act(async () => {
			result = await render(
				<Provider store={s}>
					<Mockups />
				</Provider>,
			)
		})

		expect(result!.getByTestId('mockups').childNodes.length).toStrictEqual(2)
	})
})
