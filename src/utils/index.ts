import { marked } from "marked"
import path from "path"
import fs from "fs"

import globalConstants from "globalConstants"
import { Note, NoteCollection } from "model"

export const constructHref = (date: string, slug?: string): string => {
    if (!slug) {
        return `/notes/${date}`
    }

    return `/notes/${date}/${slug}`
}

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
        .filter((entity) => entity.isDirectory())
        .map((entity) => entity.name)
}

export const getNotesAtDate = (date: string): Note[] => {
    const notes: Note[] = []
    const directoryPath = path.resolve("public", "notes", date)
    fs.readdirSync(directoryPath, { withFileTypes: true })
        .filter((entity) => entity.isDirectory())
        .map((entity) => entity.name)
        .forEach((slug) => {
            const content = readMarkdownFile(date, slug)
            const tokens = marked.lexer(content)
            const token = tokens.find((token) => token.type === "heading" && token.depth === 1)
            if (token) {
                notes.push({
                    slug,
                    title: (token as marked.Tokens.Heading).text,
                    href: constructHref(date, slug),
                    date,
                })
            }
        })

    return notes
}

export const verifyDate = (date: string): boolean => {
    return allDates().includes(date)
}

export const verifySlug = (date: string, slug: string): boolean => {
    return allNoteSlugsAtDate(date).includes(slug)
}

export const getRecentCollections = (): NoteCollection[] => {
    const recentDates = allDates().reverse().slice(0, 5)
    return recentDates.map((date) => {
        const notes: Note[] = []

        allNoteSlugsAtDate(date).forEach((slug) => {
            const content = readMarkdownFile(date, slug)
            const tokens = marked.lexer(content)
            const token = tokens.find((token) => token.type === "heading" && token.depth === 1)
            if (token) {
                notes.push({
                    slug,
                    title: (token as marked.Tokens.Heading).text,
                    href: constructHref(date, slug),
                    date,
                })
            }
        })

        return {
            date,
            notes,
        }
    })
}
