const PageBody: React.FC = ({ children }) => {
    return (
        <div className="pageBody centerContainer">
            {children}
            <style jsx>{`
                .pageBody {
                    min-height: 100%;
                    flex: 1 1 0%;
                    margin-top: 2rem;
                    margin-bottom: 2rem;
                }
            `}</style>
        </div>
    )
}

export default PageBody
