import type { categoryTypes } from '@/types'

export const filterByArray = (categories: categoryTypes.Category[], active: string[]) => {
	return categories
		.reduce<categoryTypes.Category[]>((result, category) => {
			if (active.indexOf(category.slug) > -1) {
				result.push(category)
			}
			if (category.children.length) {
				result.push(...filterByArray(category.children || [], active))
			}
			return result
		}, [])
		.sort((a, b) => {
			if (a.title > b.title) {
				return 1
			}
			if (a.title < b.title) {
				return -1
			}
			return 0
		})
}
