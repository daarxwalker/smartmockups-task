export type Mockup = {
	id: string
	title: string
	category: string[]
	thumb: string
}

export type State = {
	list: Mockup[]
	pending: boolean
}
