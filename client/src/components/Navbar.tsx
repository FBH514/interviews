import {NavClasses} from "./Classes.tsx";

export default function Navbar(props: {topics: string[] | undefined}): JSX.Element {

    const topics = props.topics || []

    return (
        <nav className={NavClasses.PARENT}>
            <ul className={NavClasses.UL}>
                {topics.map((item, index) => (
                    <li key={index} className={NavClasses.LI}>{item}</li>
                ))}
            </ul>
        </nav>
    );
}