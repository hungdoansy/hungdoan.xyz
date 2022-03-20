import globalConstants from "globalConstants"
import path from "path"
import fs from "fs"

export const readMarkdownFile = (date: string, slug: string): string => {
    // TODO: handle exceptions
    const noteAbsolutePath = path.resolve("public", "notes", date, slug, globalConstants.DefaultMarkdownFile)
    const markdown = fs.readFileSync(noteAbsolutePath, "utf-8")
    return markdown
}

export const allDates = (): string[] => {
    const directoryPath = path.resolve("public", "notes")
    return fs
        .readdirSync(directoryPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name)
}

export const allNoteSlugsAtDate = (date: string): string[] => {
    const directoryPath = path.resolve("public", "notes", date)
    return fs
        .readdirSync(directoryPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name)
}

export const verifyDate = (date: string): boolean => {
    return allDates().includes(date)
}

export const verifySlug = (date: string, slug: string): boolean => {
    return allNoteSlugsAtDate(date).includes(slug)
}
