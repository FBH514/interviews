import {NavClasses} from "./Classes.tsx";

export default function Navbar(props: {topics: string[] | undefined, onTopicClick: (topic: string) => void}): JSX.Element {

    const topics = props.topics;

    return (
        <nav className={NavClasses.PARENT}>
            <ul className={NavClasses.UL}>
                {topics?.map((item: string, index: number) => (
                    <li key={index} className={NavClasses.LI} onClick={() => props.onTopicClick(item)}>
                        {item}
                    </li>
                ))}
            </ul>
        </nav>
    );
}