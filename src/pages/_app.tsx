import React, { useEffect, useState } from "react"
import { AppProps } from "next/app"
import getConfig from "next/config"

import ThemeContext from "contexts/theme"
import { Theme } from "globalConstants"

import "@atlaskit/css-reset"
import "theme/globals.scss"
import "theme/github-theme.scss"

const { publicRuntimeConfig } = getConfig()
const { builtTimestamp } = publicRuntimeConfig

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
    console.log(`Built time: %c${new Date(Number(builtTimestamp))}`, "color: #bada55")

    const values = useState(Theme.Light)
    const [theme] = values

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={values}>
            <Component {...pageProps} />
        </ThemeContext.Provider>
    )
}

export default App
