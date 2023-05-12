import {QuizProps} from "./components/Interfaces.tsx";
import {Endpoints, QueryKeys} from "./components/Endpoints.tsx";
import {ContainerClasses, NavClasses} from "./components/Classes.tsx";
import {Nav} from "./components/Icons.tsx";
import {useMutation, useQuery, useQueryClient} from "react-query";
import Quiz from "./components/Quiz.tsx";
import Navbar from "./components/Navbar.tsx";
import {useEffect, useState} from "react";

async function GET(endpoint: string): Promise<any> {
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}
        \nhttps://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${response.status}`);
    }
    return await response.json();
}

export default function App(): JSX.Element {

    const queryCache = useQueryClient();
    const [show, setShow] = useState<boolean>(false);
    const [topic, setTopic] = useState<string>("");
    const [content, setContent] = useState<QuizProps[]>([]);

    async function handleTopicClick(topic: string) {
        const response = await GET(`${Endpoints.TOPICS}/${topic}`);
        await handleChange();
        setTopic(topic);
        setContent(response);
    }

    useEffect(() => {
        function handler(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setShow(!show);
            }
        }

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    });

    const {data: topics} = useQuery<string[]>(QueryKeys.TOPICS, async () => {
        return await GET(Endpoints.TOPICS);
    });

    const {mutate} = useMutation(
        Endpoints.CONTENT,
        async () => {
            return await GET(`${Endpoints.CONTENT}/${topic}`);
        },
        {
            onSuccess: (data) => queryCache.setQueryData(QueryKeys.CONTENT, data),
            onError: (error) => console.log(error),
        }
    );

    function handleClick(): void {
        setShow(!show);
    }

    async function handleChange(): Promise<void> {
        await mutate();
    }

    function Menu(): JSX.Element {
        return (
            show ? (
                <div className={NavClasses.MENU} onClick={handleClick}>
                    <img src={Nav.CLOSE} alt={"close"} className={"p-2 bg-transparent"}/>
                </div>
            ) : (
                <div className={NavClasses.MENU} onClick={handleClick}>
                    <img src={Nav.OPEN} alt={"open"} className={"p-2 bg-stone-100 rounded-md shadow-md"}/>
                </div>
            )
        );
    }

    return (
        <div className={show ? ContainerClasses.PARENT_SHOW : ContainerClasses.PARENT}
             style={show ? {gridTemplateColumns: "fit-content(100%) 1fr"} : {gridTemplateColumns: "1fr"}}
        >
            <Menu/>
            {show ? <Navbar topics={topics} onTopicClick={handleTopicClick}/> : null}
            <Quiz params={content} topic={topic}/>
        </div>
    );
}