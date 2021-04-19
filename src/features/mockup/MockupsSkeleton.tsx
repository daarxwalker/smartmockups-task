import Skeleton from 'react-loading-skeleton'

const SKELETON_COLS = 4
const SKELETON_COUNT = 2
const SKELETON_HEIGHT = 60

const MockupsSkeleton = () => {
	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12" data-testid="mockups-skeleton">
			{Array.from(Array(SKELETON_COLS).keys()).map(value => (
				<Skeleton key={value} count={SKELETON_COUNT} height={SKELETON_HEIGHT} className="mb-4" />
			))}
		</div>
	)
}

export default MockupsSkeleton
