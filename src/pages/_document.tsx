import { Html, Head, Main, NextScript } from "next/document"
import { NextPage } from "next/types"

// inspired from: https://sreetamdas.com/blog/the-perfect-dark-mode
function setInitialColorMode() {
    function getInitialColorMode() {
        const rawLocalTheme = window.localStorage.getItem("theme")
        if (rawLocalTheme === "dark" || rawLocalTheme === "light") {
            return rawLocalTheme
        }

        // If there is no saved preference, use a media query
        const mediaQuery = "(prefers-color-scheme: dark)"
        const mql = window.matchMedia(mediaQuery)
        const hasImplicitPreference = typeof mql.matches === "boolean"
        if (hasImplicitPreference) {
            return mql.matches ? "dark" : "light"
        }

        // default to 'light'.
        return "light"
    }

    const colorMode = getInitialColorMode()
    localStorage.setItem("theme", colorMode)
    document.documentElement.setAttribute("data-theme", colorMode)
}

const syncSetInitialColorMode = `;(() => {
    ${setInitialColorMode.toString()}
    setInitialColorMode();
})()
`

const Document: NextPage = () => {
    return (
        <Html lang="en">
            <Head>
                <title>/home/hung</title>
            </Head>
            <body>
                <Main />
                <NextScript />
                <script
                    dangerouslySetInnerHTML={{
                        __html: syncSetInitialColorMode,
                    }}
                />
            </body>
        </Html>
    )
}

export default Document
