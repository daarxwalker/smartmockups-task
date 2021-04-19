import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import { useResize } from '@/shared/hooks'
import { mediaQueryConstants } from '@/constants'

const SKELETON_HEIGHT = 60

const CategoriesSkeleton = () => {
	const [skeletonCount, setSkeletonCount] = useState(4)

	const setMobileSkeletonCount = (width = window.innerWidth) => {
		if (width <= mediaQueryConstants.md) {
			setSkeletonCount(2)
		}
	}

	useEffect(() => {
		setMobileSkeletonCount()
	}, [])

	useResize(width => {
		setMobileSkeletonCount(width)
	})

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12" data-testid="categories-skeleton">
			{Array.from(Array(skeletonCount).keys()).map(value => (
				<Skeleton key={value} count={skeletonCount} height={SKELETON_HEIGHT} />
			))}
		</div>
	)
}

export default CategoriesSkeleton
