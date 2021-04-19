import clsx from 'clsx'

type Props = {
	isActive: boolean
	onClick: () => void
}

const CategoriesMobileMenuButton = ({ isActive, onClick }: Props) => {
	return (
		<button onClick={onClick} className="focus:outline-none w-6 h-6" type="button" data-testid="menu-button">
			<svg
				className={clsx('fill-current w-full h-full transition transform', isActive && 'rotate-90')}
				viewBox="0 0 24 24"
			>
				<path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
			</svg>
		</button>
	)
}

export default CategoriesMobileMenuButton
