import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import { mockupActions, mockupSelectors } from '@/store'
import { MockupItem } from './components'
import MockupsSkeleton from './MockupsSkeleton'

const Mockups = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	const pending = useSelector(mockupSelectors.getPending)
	const mockups = useSelector(mockupSelectors.getMockupsBySlug(router.query.slug))

	useEffect(() => {
		dispatch(mockupActions.getMockups())
	}, [dispatch])

	if (pending) {
		return <MockupsSkeleton />
	}
	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8" data-testid="mockups">
			{mockups.map(mockup => (
				<MockupItem key={mockup.id} title={mockup.title} thumb={mockup.thumb} />
			))}
		</div>
	)
}

export default Mockups
