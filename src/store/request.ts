import axios from 'axios'

export const get = <T extends any>(action: string) => {
	return new Promise<T>((res, rej) => {
		axios
			.get<T>(`${process.env.apiEndpoint}/${action}`)
			.then(r => res(r.data))
			.catch(r => rej(r.message))
	})
}
