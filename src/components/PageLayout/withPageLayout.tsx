import React from "react"

import PageBody from "./PageBody"
import PageHeader from "./PageHeader"
import PageFooter from "./PageFooter"

const withPageLayout = <P extends object>(Component: React.ComponentType<P>) => (props: P): React.ReactElement => {
    return (
        <React.Fragment>
            <PageHeader />
            <PageBody>
                <Component {...(props as P)} />
            </PageBody>
            <PageFooter />
        </React.Fragment>
    )
}

export default withPageLayout
