import { render, screen } from '@testing-library/react'
import CategoryItem from '../CategoryItem'

const TEST_ID = 'category-item'

describe('<CategoryItem />', () => {
	beforeEach(() => {
		render(
			<CategoryItem active href="/test" hasBorder>
				Test
			</CategoryItem>,
		)
	})

	test('should render', () => {
		expect(screen.getByTestId(TEST_ID)).toBeInTheDocument()
	})

	test('should have text children', () => {
		expect(screen.getByTestId(TEST_ID).textContent).toStrictEqual('Test')
	})

	test('should have attributes', () => {
		expect(screen.getByTestId(TEST_ID).getAttribute('href')).toStrictEqual('/test')
	})

	test('should parent exist and have border', () => {
		const parent = screen.getByTestId(TEST_ID).parentNode as HTMLElement
		if (!parent) {
			expect(parent).toBeInTheDocument()
			return
		}

		const parentClass = parent.getAttribute('class')
		expect(parentClass).toContain('md:border-l')
		expect(parentClass).toContain('md:border-gray-200')
	})

	test('should be active', () => {
		const el = screen.getByTestId(TEST_ID)
		expect(el.getAttribute('class')).toContain('font-bold')
	})
})
