import { HTMLProps } from 'react'
import LazyLoad from 'react-lazyload'

const IMG_HEIGHT = 264
const IMG_LAZYLOAD_OFFSET = 100

type Props = {
	title: string
	thumb: string
} & HTMLProps<HTMLDivElement>

const MockupItem = ({ title, thumb, ...rest }: Props) => {
	return (
		<div className="relative rounded overflow-hidden group" data-testid="mockup-item" {...rest}>
			<div className="transition flex items-end absolute inset-0 bg-gradient-to-t from-black text-white p-4 opacity-0 group-hover:opacity-100 text-xs md:text-sm">
				{title}
			</div>
			<LazyLoad height={IMG_HEIGHT} offset={IMG_LAZYLOAD_OFFSET}>
				<img src={thumb} alt={title} />
			</LazyLoad>
		</div>
	)
}

export default MockupItem
