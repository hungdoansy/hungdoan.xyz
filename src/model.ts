export type Note = {
    date: string
    title: string
    slug: string
    href: string
}

export type NoteCollection = {
    date: string
    notes: Note[]
}
