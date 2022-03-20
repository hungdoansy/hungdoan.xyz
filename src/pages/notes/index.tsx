import Link from "next/link"
import type { GetStaticProps, NextPage } from "next"

import withPageLayout from "components/PageLayout/withPageLayout"
import { getRecentCollections } from "utils"
import { NoteCollection } from "model"

type Props = {
    collections: NoteCollection[]
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const collections = getRecentCollections()
    return {
        props: {
            collections,
        },
    }
}

const NotePage: NextPage<Props> = ({ collections }) => {
    return (
        <main className="github-theme">
            <h1>Notes</h1>
            {collections.map((collection) => {
                return (
                    <div key={collection.date}>
                        <h2>
                            <Link href={`/notes/${collection.date}`}>{collection.date}</Link>
                        </h2>
                        <ul>
                            {collection.notes.map((note) => {
                                return (
                                    <li key={note.slug}>
                                        <Link href={note.href}>{note.title}</Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )
            })}
        </main>
    )
}

export default withPageLayout(NotePage)
