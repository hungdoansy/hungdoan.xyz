const PageFooter: React.FC = () => {
    return (
        <footer className="pageFooter">
            <div className="centerContainer">
                <span>☕ buy me a coffee?</span>
                <span>📮 RSS</span>
            </div>
            <style jsx>{`
                .pageFooter {
                    height: 4rem;

                    display: flex;
                    justify-content: center;
                    align-items: center;

                    background: #f3f4f6;
                    color: #9ca3af;
                    font-size: 0.875rem;
                    line-height: 1.25rem;
                }

                .centerContainer {
                    display: flex;
                    justify-content: space-between;
                }
            `}</style>
        </footer>
    )
}

export default PageFooter
