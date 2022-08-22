import type { GetStaticProps, NextPage, GetStaticPaths } from "next"
import Link from "next/link"

import { getNotesAtDate, verifyDate } from "utils"
import withPageLayout from "components/PageLayout/withPageLayout"
import { Note } from "model"
import { Page404WithoutPageLayout } from "pages/404"

type Props = {
    isWrongPath: boolean
    notes?: Note[]
    date?: string
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking",
    }
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    let ok = false
    const date = context.params?.date as string

    ok = verifyDate(date)
    if (!ok) {
        return {
            props: {
                isWrongPath: true,
            },
        }
    }

    const notes = getNotesAtDate(date)
    return {
        props: {
            isWrongPath: false,
            notes,
            date,
        },
    }
}

const NotePage: NextPage<Props> = ({ date, notes, isWrongPath }) => {
    if (isWrongPath) {
        return <Page404WithoutPageLayout />
    }

    return (
        <main className="github-theme">
            <h1>{date}</h1>
            <ul>
                {notes.map((note) => {
                    return (
                        <li key={note.slug}>
                            <Link href={note.href}>{note.title}</Link>
                        </li>
                    )
                })}
            </ul>
        </main>
    )
}

export default withPageLayout(NotePage)
