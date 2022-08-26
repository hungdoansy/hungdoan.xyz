import { createContext, useCallback, useState } from "react"
import { useEffectOnce } from "react-use"
import { Theme } from "globalConstants"

export type ThemeContextValue = [Theme, (t: Theme) => void]
const ThemeContext = createContext<ThemeContextValue>(null)

type Props = {
    children: React.ReactNode
}
export const ThemeContextProvider: React.FC<Props> = ({ children }) => {
    const [localTheme, setLocalTheme] = useState(() => {
        if (typeof window === "undefined") {
            return Theme.Light
        }

        const savedTheme = localStorage.getItem("theme")
        if (savedTheme === "dark") {
            return Theme.Dark
        }

        return Theme.Light
    })

    const changeTheme = useCallback((t: Theme) => {
        localStorage.setItem("theme", t)
        document.documentElement.setAttribute("data-theme", t)
        setLocalTheme(t)
    }, [])

    useEffectOnce(() => {
        const savedTheme = localStorage.getItem("theme")
        if (savedTheme === "dark") {
            changeTheme(savedTheme as Theme)
        }
    })

    return <ThemeContext.Provider value={[localTheme, changeTheme]}>{children}</ThemeContext.Provider>
}

export default ThemeContext
