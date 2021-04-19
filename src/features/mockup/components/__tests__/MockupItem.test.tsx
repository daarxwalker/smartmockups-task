import { render, screen } from '@testing-library/react'
import MockupItem from '../MockupItem'

const TEST_ID = 'mockup-item'

describe('<MockupItem />', () => {
	beforeEach(() => {
		render(<MockupItem title="Test" thumb="/test" />)
	})

	test('should render', () => {
		expect(screen.getByTestId(TEST_ID)).toBeInTheDocument()
	})

	test('should title exist', () => {
		expect(screen.getByText('Test')).toBeInTheDocument()
	})
})
