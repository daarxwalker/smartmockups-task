export type Category = {
	title: string
	slug: string
	children: Category[]
}

export type State = {
	list: Category[]
	pending: boolean
}
