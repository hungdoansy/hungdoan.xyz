import withPageLayout from "components/PageLayout/withPageLayout"
import { NextPage } from "next"

export const Page404WithoutPageLayout: NextPage = () => {
    return (
        <div>
            <h1>This URL doesn&apos;t seem to be valid 😟</h1>
        </div>
    )
}

export default withPageLayout(Page404WithoutPageLayout)
