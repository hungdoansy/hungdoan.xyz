import type { GetStaticProps, NextPage, GetStaticPaths } from "next"
import { useEffect } from "react"
import { marked } from "marked"
import hljs from "highlight.js"
import { LineFocusPlugin } from "highlightjs-focus"

import { Page404WithoutPageLayout } from "pages/404"
import { readMarkdownFile, verifyDate, verifySlug } from "utils"
import withPageLayout from "components/PageLayout/withPageLayout"
import globalConstants, { Theme } from "globalConstants"
import useThemeContext from "contexts/theme/useThemeContext"

const env = process.env.NODE_ENV || "development"
const isProd = env === "production"

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
    const [theme] = useThemeContext()

    useEffect(() => {
        const isDarkMode = theme === Theme.Dark
        const checker = async () => {
            // @ts-ignore
            if (isDarkMode) import("highlight.js/styles/base16/solarized-dark.css")
            // @ts-ignore
            else import("highlight.js/styles/base16/solarized-light.css")
        }
        checker()
    }, [theme])

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
                            <a class="font-bold" href="#">
                                ${date} - ${text}
                            </a>
                        </${tag}>
                    `
                }

                const tag = `h${level}`
                return `
                    <${tag}>
                        <a class="font-bold" href="#${escapedText}">
                            ${text}
                        </a>
                    </${tag}>
                `
            },
            image: (href: string, title: string, text: string): string => {
                const prefix = "https://raw.githubusercontent.com/hungdoansy/portfolio/main/public"
                const src = (() => {
                    if (href.startsWith("http")) {
                        return href
                    }

                    return (isProd ? prefix : "") + `/notes/${date}/${slug}/${href}`
                })()
                return `<img src="${src}" alt="${text}">`
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
        return <Page404WithoutPageLayout />
    }
    return <div className="github-theme noteContent" dangerouslySetInnerHTML={{ __html: content }} />
}

export default withPageLayout(NotePage)
