import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import { queryConstants, mediaQueryConstants } from '@/constants'
import { environmentHelpers } from '@/helpers'
import { useResize } from '@/shared/hooks'
import { categoryActions, categorySelectors } from '@/store'
import { CategoryItem } from './components'
import CategoriesSkeleton from './CategoriesSkeleton'
import CategoriesMobileMenuButton from './CategoriesMobileMenuButton'

const getMenuInitialState = () => {
	if (environmentHelpers.isServer()) {
		return true
	}
	return window.innerWidth > mediaQueryConstants.md
}

const Categories = () => {
	const dispatch = useDispatch()
	const [activeMenu, setActiveMenu] = useState(getMenuInitialState())
	const router = useRouter()
	const pending = useSelector(categorySelectors.getPending)
	const categories = useSelector(categorySelectors.getCategoryList)

	useEffect(() => {
		dispatch(categoryActions.getCategories())
	}, [dispatch])

	useEffect(() => {
		router.events.on('routeChangeComplete', () => {
			if (environmentHelpers.isServer()) {
				return
			}
			setActiveMenu(window.innerWidth > mediaQueryConstants.md)
		})
	}, [router.events])

	useResize(width => {
		setActiveMenu(width > mediaQueryConstants.md)
	})

	const handleActiveMobileMenu = () => {
		setActiveMenu(!activeMenu)
	}

	if (pending || !categories.length) {
		return <CategoriesSkeleton />
	}
	return (
		<>
			<div className="md:hidden flex justify-end mb-2">
				<CategoriesMobileMenuButton onClick={handleActiveMobileMenu} isActive={activeMenu} />
			</div>
			{activeMenu && (
				<div
					className="grid grid-cols-2 md:grid-cols-4 mb-12 md:p-8 border border-gray-200 rounded"
					data-testid="categories"
				>
					<CategoryItem
						href={`/${queryConstants.defaultSlug}`}
						active={router.query.slug === queryConstants.defaultSlug}
						hasBorder={false}
					>
						Show all
					</CategoryItem>
					{categories.map((c, index) => (
						<CategoryItem
							key={c.slug}
							href={`/${c.slug}`}
							active={router.query.slug === c.slug}
							hasBorder={(index + 1) % 4 !== 0}
						>
							{c.title}
						</CategoryItem>
					))}
				</div>
			)}
		</>
	)
}

export default Categories
