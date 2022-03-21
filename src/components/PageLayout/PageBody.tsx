const PageBody: React.FC = ({ children }) => {
    return (
        <main className="pageBody centerContainer">
            {children}
            <style jsx>{`
                .pageBody {
                    min-height: 100%;
                    flex: 1 1 0%;
                    margin-top: 2rem;
                    margin-bottom: 2rem;
                }
            `}</style>
        </main>
    )
}

export default PageBody
