import { AppContext, AppInitialProps } from 'next/app'
import Head from 'next/head'

import { wrapper } from '@/store'
import '@/styles/index.css'

type Props = AppContext & AppInitialProps

function App({ Component, pageProps }: Props) {
	return (
		<>
			<Head>
				<title>Smartmockups Task</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Component {...pageProps} />
		</>
	)
}

export default wrapper.withRedux(App)
