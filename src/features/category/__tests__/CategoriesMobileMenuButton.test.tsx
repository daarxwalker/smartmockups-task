import { render, screen } from '@testing-library/react'
import CategoriesMobileMenuButton from '../CategoriesMobileMenuButton'

describe('<CategoriesMobileMenuButton />', () => {
	test('should simulate click on mobile menu button', () => {
		const mockClickFn = jest.fn()
		render(<CategoriesMobileMenuButton isActive={false} onClick={mockClickFn} />)
		screen.getByTestId('menu-button').click()
		expect(mockClickFn.mock.calls.length).toStrictEqual(1)
	})
})
