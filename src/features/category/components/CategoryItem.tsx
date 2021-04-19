import { ReactNode, HTMLProps } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

type Props = {
	active: boolean
	children: ReactNode
	href: string
	hasBorder: boolean
} & HTMLProps<HTMLAnchorElement>

const CategoryItem = ({ active, children, href, hasBorder, ...rest }: Props) => {
	return (
		<div className={clsx('px-8 py-4', hasBorder && 'md:border-l md:border-gray-200')}>
			<Link href={href}>
				<a
					className={clsx('inline-flex hover:underline text-sm cursor-pointer', active && 'font-bold')}
					data-testid="category-item"
					{...rest}
				>
					{children}
				</a>
			</Link>
		</div>
	)
}

export default CategoryItem
