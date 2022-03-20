import withPageLayout from "components/PageLayout/withPageLayout"
import { NextPage } from "next"

const Page404: NextPage = () => {
    return <main>Not Found</main>
}

export default withPageLayout(Page404)
