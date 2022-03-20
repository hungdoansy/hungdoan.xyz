const PageHeader: React.FC = () => {
    return (
        <div className="pageHeader">
            <div className="centerContainer">
                <a className="rootLink" href="/">
                    /home/hung
                </a>
                <span className="current">
                    /notes <span className="indicator">❙</span>
                </span>
            </div>
            <style jsx>{`
                .pageHeader {
                    height: 4rem;

                    display: flex;
                    justify-content: center;
                    align-items: center;

                    background: #f3f4f6;
                    font-weight: 700;
                }

                .rootLink {
                    color: #374151;
                    &:hover {
                        text-decoration: none;
                    }
                }

                .current {
                    color: #64748b;
                }

                .indicator {
                    @keyframes blinking {
                        50% {
                            opacity: 0;
                        }
                    }

                    animation: blinking 1s infinite;
                    font-size: 18px;
                }
            `}</style>
        </div>
    )
}

export default PageHeader
