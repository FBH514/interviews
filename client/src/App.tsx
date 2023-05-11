import {QuizProps} from "./components/Interfaces.tsx";
import {Endpoints, QueryKeys} from "./components/Endpoints.tsx";
import {useQuery} from "react-query";
import Quiz from "./components/Quiz.tsx";
import Navbar from "./components/Navbar.tsx";
import {useEffect, useState} from "react";
import {ContainerClasses, NavClasses} from "./components/Classes.tsx";
import {Nav} from "./components/Icons.tsx";

async function GET(endpoint: string): Promise<any> {
    const response = await fetch(endpoint);
    return await response.json();
}

export default function App(): JSX.Element {

    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        function handler(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setShow(!show);
            }
        }

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    });

    const {data: content} = useQuery<QuizProps[]>(QueryKeys.CONTENT, () => GET(Endpoints.CONTENT));
    const {data: topics} = useQuery<string[]>(QueryKeys.TOPICS, () => GET(Endpoints.TOPICS));

    function handleClick(): void {
        setShow(!show);
    }

    function Menu(): JSX.Element {
        return (
            show ?
                (
                    <div className={NavClasses.MENU} onClick={handleClick}>
                        <img src={Nav.CLOSE} alt={"close"} className={"p-2 bg-transparent"}/>
                    </div>
                ) : (
                    <div className={NavClasses.MENU} onClick={handleClick}>
                        <img src={Nav.OPEN} alt={"open"} className={"p-2 bg-stone-100 rounded-md shadow-lg"}/>
                    </div>
                )

        );
    }

    return (
        <div className={show ? ContainerClasses.PARENT_SHOW : ContainerClasses.PARENT}
             style={show ? {gridTemplateColumns: "fit-content(100%) 1fr"} : {gridTemplateColumns: "1fr"}}
        >
            <Menu/>
            {show ? <Navbar topics={topics}/> : <></>}
            <Quiz params={content}/>
        </div>
    );
}