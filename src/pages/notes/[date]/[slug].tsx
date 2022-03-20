import type { GetStaticProps, NextPage, GetStaticPaths } from "next"
import { marked } from "marked"
import hljs from "highlight.js"
import { LineFocusPlugin } from "highlightjs-focus"
import "highlight.js/styles/base16/equilibrium-light.css"

import Page404 from "pages/404"
import { readMarkdownFile, verifyDate, verifySlug } from "utils"
import withPageLayout from "components/PageLayout/withPageLayout"
import globalConstants from "globalConstants"

type PageProps = {
    isWrongPath: boolean
    markdown?: string
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
            date,
            slug,
            isWrongPath: false,
        },
    }
}

const NotePage: NextPage<PageProps> = ({ markdown, date, slug, isWrongPath }) => {
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
            heading(text: string, level: 1 | 2 | 3 | 4 | 5 | 6) {
                const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-")
                if (level === 1) {
                    const tag = "h1"
                    return `
                        <${tag}>
                            <a class="font-bold" name="${escapedText}" href="#">
                                ${date} - ${text}
                            </a>
                        </${tag}>
                    `
                }

                const tag = `h${level}`
                return `
                    <${tag}>
                        <a class="font-bold" name="${escapedText}" href="#${escapedText}">
                            ${text}
                        </a>
                    </${tag}>
                `
            },
            image: (href: string, title: string, text: string): string => {
                return `<img src="/notes/${date}/${slug}/${href}" alt="${text}">`
            },
            link(href: string, title: string, text: string): string | false {
                if (href.startsWith("http") && href.indexOf(globalConstants.SiteURL) === -1) {
                    return `<a class="external-link" href='${href}' target="_blank" rel="noopener">${text} ↗</a>`
                }

                return false
            },
        }
        marked.use({ renderer: customRenderer })
        content = marked.parse(markdown)
    }

    if (isWrongPath) {
        return <Page404 />
    }
    return <main className="github-theme noteContent" dangerouslySetInnerHTML={{ __html: content }} />
}

export default withPageLayout(NotePage)
