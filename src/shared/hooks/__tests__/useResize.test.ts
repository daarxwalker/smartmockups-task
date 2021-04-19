import { renderHook } from '@testing-library/react-hooks'
import { useResize } from '@/shared/hooks'

const MOCK_WIDTH = 500
const RESIZE_DELAY = 700

describe('useResize', () => {
	test('should return new window size', done => {
		Object.defineProperty(window, 'innerWidth', {
			writable: true,
			configurable: true,
			value: MOCK_WIDTH,
		})

		let width = 0
		renderHook(() =>
			useResize(w => {
				width = w
			}),
		)

		window.dispatchEvent(new Event('resize'))
		setTimeout(() => {
			expect(width).toStrictEqual(MOCK_WIDTH)
			done()
		}, RESIZE_DELAY)
	})
})
