import withPageLayout from "components/PageLayout/withPageLayout"
import { NextPage } from "next"

const Page404: NextPage = () => {
    return (
        <main>
            <h1>This URL doesn&apos;t seem to be valid 😟</h1>
        </main>
    )
}

export default withPageLayout(Page404)
