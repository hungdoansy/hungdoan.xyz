const PageBody: React.FC = ({ children }) => {
    return (
        <div className="pageBody centerContainer">
            {children}
            <style jsx>{`
                .pageBody {
                    min-height: 100%;
                }
            `}</style>
        </div>
    )
}

export default PageBody
