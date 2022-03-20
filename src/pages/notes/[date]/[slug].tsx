import type { GetStaticProps, NextPage, GetStaticPaths } from "next"
import { marked } from "marked"
import hljs from "highlight.js"
import { LineFocusPlugin } from "highlightjs-focus"
import "highlight.js/styles/base16/equilibrium-light.css"

import { readMarkdownFile, verifyDate, verifySlug } from "utils"
import withPageLayout from "components/PageLayout/withPageLayout"

type PageProps = {
    isWrongPath: boolean
    markdown?: string
    noteTitle?: string
    date?: string
    slug?: string
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking",
    }
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
    let ok = false
    const date = context.params?.date as string
    const slug = context.params?.slug as string

    ok = verifyDate(date)
    if (!ok) {
        return {
            props: {
                isWrongPath: true,
            },
        }
    }

    ok = verifySlug(date, slug)
    if (!ok) {
        return {
            props: {
                isWrongPath: true,
            },
        }
    }

    const markdown = readMarkdownFile(date, slug)
    return {
        props: {
            markdown,
            noteTitle: "heeh",
            date,
            slug,
            isWrongPath: false,
        },
    }
}

const NotePage: NextPage<PageProps> = ({ markdown, noteTitle, date, slug, isWrongPath }) => {
    let content = ""
    if (!isWrongPath) {
        hljs.addPlugin(
            new LineFocusPlugin({
                unfocusedStyle: {
                    opacity: "0.45",
                    filter: "grayscale(1)",
                },
            })
        )

        marked.setOptions({
            gfm: true,
            breaks: true,
            smartypants: true,
            highlight(code, lang) {
                const language = lang || "plaintext"
                return hljs.highlight(code, { language }).value
            },
        })

        const customRenderer = {
            image: (href: string, title: string, text: string): string => {
                console.log({ href, title, text })
                return `<img src="/notes/${date}/${slug}/${href}" alt="${text}">`
            },
        }
        marked.use({ renderer: customRenderer })
        content = marked.parse(markdown)
    }

    console.log("render")

    if (isWrongPath) {
        return <div>Wrong path</div>
    }
    return (
        <div>
            <div className="github-theme my-10" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    )
}

export default withPageLayout(NotePage)
