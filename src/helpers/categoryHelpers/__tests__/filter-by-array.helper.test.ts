import { filterByArray } from '../filter-by-array.helper'

const DEEP_ARRAY = [
	{ title: 'Blaster', slug: 'blaster', children: [] },
	{
		title: 'Lightsaber',
		slug: 'lightsaber',
		children: [{ title: 'Emitter', slug: 'emitter', children: [{ title: 'Blade', slug: 'blade', children: [] }] }],
	},
]
const ARRAY = ['emitter', 'blade']
const RESULT_ARRAY = [
	{ title: 'Blade', slug: 'blade', children: [] },
	{ title: 'Emitter', slug: 'emitter', children: [{ title: 'Blade', slug: 'blade', children: [] }] },
]

test('filter deep arrays of objects by array', () => {
	expect(filterByArray(DEEP_ARRAY, ARRAY)).toStrictEqual(RESULT_ARRAY)
})
