const REPLACE_REGEX = /[_\s]/g

export const serializeSlug = (value: string) => {
	return value.replace(REPLACE_REGEX, '-').toLowerCase()
}
