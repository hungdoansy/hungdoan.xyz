import { createContext } from "react"

import { Theme } from "globalConstants"

export type ThemeContextValue = [Theme, (t: Theme) => void]

const ThemeContext = createContext<ThemeContextValue>(null)
export default ThemeContext
