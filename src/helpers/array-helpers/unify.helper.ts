export const unify = (array: any[]) => {
	return array.filter((value, index, current) => current.indexOf(value) === index)
}
