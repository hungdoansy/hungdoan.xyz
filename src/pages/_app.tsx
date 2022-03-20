import React from "react"
import { AppProps } from "next/app"

import "@atlaskit/css-reset"
import "theme/globals.scss"
import "theme/github-theme.scss"

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />
}

export default App
