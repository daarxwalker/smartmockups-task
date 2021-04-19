import { useEffect } from 'react'
import { debounce } from 'debounce'

import { environmentHelpers } from '@/helpers'

type Callback = (width: number) => void

const DEBOUNCE_DELAY = 600

export const useResize = (callback?: Callback) => {
	useEffect(() => {
		if (environmentHelpers.isServer()) {
			return () => {}
		}

		const resizeCallback = debounce((e: Event) => {
			const target = e.target as Window
			if (callback) {
				callback(target.innerWidth)
			}
		}, DEBOUNCE_DELAY)

		window.addEventListener('resize', resizeCallback)

		return () => {
			window.removeEventListener('resize', resizeCallback)
		}
	}, [callback])
}
