import { serializeSlug } from '../serialize-slug.helper'

const SLUG = 'Qui-Gon Jinn'
const RESULT_SLUG = 'qui-gon-jinn'

test('serialize slug will pass', () => {
	expect(serializeSlug(SLUG)).toStrictEqual(RESULT_SLUG)
})
