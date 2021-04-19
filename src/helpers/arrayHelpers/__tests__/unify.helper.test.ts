import { unify } from '../unify.helper'

const ARRAY = ['luke', 'luke', 'vader', 'palpatine', 'palpatine']
const RESULT_ARRAY = ['luke', 'vader', 'palpatine']

test('unify array items will pass', () => {
	expect(unify(ARRAY)).toStrictEqual(RESULT_ARRAY)
})
