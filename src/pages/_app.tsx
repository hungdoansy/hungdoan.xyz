import React from "react"
import { AppProps } from "next/app"
import getConfig from "next/config"

import "@atlaskit/css-reset"
import "theme/globals.scss"
import "theme/github-theme.scss"

const { publicRuntimeConfig } = getConfig()
const { builtTimestamp } = publicRuntimeConfig

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
    console.log(`Built time: %c${new Date(Number(builtTimestamp))}`, "color: #bada55")
    return <Component {...pageProps} />
}

export default App
