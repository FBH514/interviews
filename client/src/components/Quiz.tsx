import { useEffect, useMemo, useRef, useState } from "react";
import { QuizProps } from "../types/Interfaces.tsx";
import { Arrows } from "../constants/Icons.tsx";
import { ButtonStyles, QuizStyles } from "../constants/Classes.tsx";
import useWindowSize from "../hooks/useWindowSize.tsx";

function randomizeContent(data: QuizProps[]): void {
    for (let index = data.length - 1; index > 0; index--) {
        const value = Math.floor(Math.random() * index);
        [data[index], data[value]] = [data[value], data[index]];
    }
}

export default function Quiz(props: { params: QuizProps[] | undefined, topic: string }): JSX.Element {

    const content = useMemo(() => props.params || [], [props.params]);
    const [show, setShow] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);
    const mobile = useWindowSize();
    const leftArrowRef = useRef<HTMLButtonElement>(null);
    const rightArrowRef = useRef<HTMLButtonElement>(null);

    useMemo(() => randomizeContent(content), [content])

    useEffect(() => {
        function handler(e: KeyboardEvent) {
            switch (e.key) {
                case "Enter":
                    handleClick();
                    break;
                case "ArrowLeft":
                    handlePrevious();
                    break;
                case "ArrowRight":
                    handleNext();
                    break;
            }
        }

        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    })

    const handleClick = (): void => setShow(!show);

    const handleNext = (): void => {
        setIndex((index + 1) % content.length);
        setShow(false);
        rightArrowRef.current?.click();
    }

    const handlePrevious = (): void => {
        setIndex(index === 0 ? content.length - 1 : index - 1);
        setShow(false);
        leftArrowRef.current?.click();
    }

    return (
        <main className={!mobile ? QuizStyles.PARENT_DESKTOP : QuizStyles.PARENT_MOBILE}
              style={{gridTemplateRows: "fit-content(100%) fit-content(100%) 1fr"}}>
            <section>
                <h1 className={"text-4xl text-stone-100 font-bold text-center"}>{props.topic} Questions</h1>
            </section>
            <section
                className={"rounded-lg bg-gradient-to-br from-stone-200 to-stone-100 p-4 shadow-md h-fit w-full flex items-center justify-evenly gap-4"}>
                <button className={ButtonStyles.ARROW} onClick={handlePrevious} ref={leftArrowRef}>
                    <img src={Arrows.LEFT_ARROW} alt={"left arrow"}/>
                </button>
                <header className={!mobile ? QuizStyles.PROMPT_DESKTOP : QuizStyles.PROMPT_MOBILE}
                        style={!mobile ? {gridTemplateColumns: "1fr fit-content(100%)"} : {gridTemplateColumns: "1fr"}}>
                    <h2 className={"text-2xl text-stone-700 font-bold"}>{content[index]?.question}</h2>
                    <button className={ButtonStyles.SHOW} onClick={handleClick}>{show ? "Close" : "Show"}</button>
                </header>
                <button className={ButtonStyles.ARROW} onClick={handleNext} ref={rightArrowRef}>
                    <img src={Arrows.RIGHT_ARROW} alt={"right arrow"}/>
                </button>
            </section>
            <section
                className={"flex items-center justify-center text-3xl text-stone-700 font-bold text-center h-fit"}>
                {show ? (
                    <header className={"flex flex-col items-center justify-center gap-4"}>
                        <h3 className={"font-thin"}>{"Solution"}</h3>
                        <h2>{content[index]?.answer}</h2>
                    </header>
                ) : (<></>)}
            </section>
        </main>
    )
}