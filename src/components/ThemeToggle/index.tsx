import { useState } from "react"

const ThemeToggle: React.FC = () => {
    const [isDarkMode, setDarkMode] = useState(false)
    const theme = isDarkMode ? "dark" : "light"

    return (
        <div
            className="toggle css-mqs36f"
            role="button"
            tabIndex={0}
            data-theme={theme}
            onClick={() => setDarkMode((is) => !is)}
        >
            <div className="content css-76fjlr">
                <div className="stars css-16xvjce">
                    <div data-index={1} className="sprinkle" />
                    <div data-index={2} className="sprinkle smallSprinkle" />
                    <div data-index={3} className="sprinkle smallSprinkle" />
                    <div data-index={4} className="sprinkle smallSprinkle" />
                    <div data-index={5} className="sprinkle smallSprinkle" />
                    <div data-index={6} className="sprinkle" />
                </div>
                <div className="planet css-1gsrdh">
                    <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="32"
                        viewBox="0 0 30 32"
                        className="moon css-1tbfyl8"
                    >
                        <title>Moon</title>
                        <path d="M22.592 21.504q3.36 0 6.56-1.792-1.344 4.64-5.184 7.616t-8.8 2.976q-6.016 0-10.304-4.288t-4.288-10.336q0-4.928 2.976-8.768t7.584-5.216q-1.792 3.2-1.792 6.56 0 5.504 3.904 9.376t9.344 3.872z" />
                    </svg>
                </div>
            </div>

            <style jsx>{`
                .container {
                    width: 500px;
                    height: 200px;
                    border: 1px solid purple;

                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .toggle {
                    display: inline-block;
                    border-radius: 13px;
                    overflow: hidden;
                    will-change: transform;
                    cursor: pointer;
                }

                .content {
                    display: flex;
                    align-items: center;
                    position: relative;
                    width: 56px;
                    height: 26px;
                    border-radius: 13px;
                    transition: all 125ms linear 0s;
                    background-color: rgb(128, 178, 237);

                    &:hover {
                        background-color: rgb(123, 171, 230);
                        transform: scale(1.05);
                    }
                }

                .planet {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    border-radius: 100%;
                    width: 20px;
                    height: 20px;
                    overflow: hidden;
                    transition: all 125ms ease-in 0s;
                    transform: translateX(4px);

                    background-color: rgb(253, 223, 117);
                    border: 3px solid rgba(214, 176, 94, 0.71);
                }

                .moon {
                    position: absolute;
                    transition: all 125ms ease-in 0s;
                    width: 13px;
                    height: 13px;
                    fill: white;
                    transform: translateY(30px);
                    opacity: 0;
                }

                .sprinkle {
                    border-radius: 100%;
                    background-color: white;
                    position: absolute;
                    transition-property: opacity, transform;
                    transition-timing-function: linear;
                    transition-delay: 0s;

                    width: 2px;
                    height: 2px;

                    opacity: 0;
                    transform: translateY(10px);

                    &[data-index="1"] {
                        transition-duration: 50ms;
                        top: 5px;
                        left: 14px;
                    }

                    &[data-index="2"] {
                        transition-duration: 100ms;
                        top: 9px;
                        left: 7px;
                    }

                    &[data-index="3"] {
                        transition-duration: 150ms;
                        top: 20px;
                        left: 16px;
                    }

                    &[data-index="4"] {
                        transition-duration: 200ms;
                        top: 12px;
                        left: 19px;
                    }

                    &[data-index="5"] {
                        transition-duration: 250ms;
                        top: 6px;
                        left: 23px;
                    }

                    &[data-index="6"] {
                        transition-duration: 300ms;
                        top: 16px;
                        left: 26px;
                    }
                }

                .smallSprinkle {
                    width: 1px;
                    height: 1px;
                }

                [data-theme="dark"] {
                    .content {
                        background-color: rgb(89, 93, 222);
                        &:hover {
                            background-color: rgb(85, 89, 204);
                        }
                    }

                    .planet {
                        background-color: rgba(255, 255, 255, 0.4);
                        border: 2px solid rgba(255, 255, 255, 0.9);
                        transform: translateX(32px);
                    }

                    .moon {
                        opacity: 1;
                        transform: none;
                    }

                    .sprinkle {
                        opacity: 1;
                        transform: none;
                    }
                }
            `}</style>
        </div>
    )
}

export default ThemeToggle
