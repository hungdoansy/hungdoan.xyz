import { useContext } from "react"
import ThemeContext, { ThemeContextValue } from "."

const useThemeContext = (): ThemeContextValue => useContext(ThemeContext)
export default useThemeContext
