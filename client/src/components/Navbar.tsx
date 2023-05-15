import {NavStyles} from "../constants/Classes.tsx";
import useWindowSize from "../hooks/useWindowSize.tsx";

export default function Navbar(props: {topics: string[] | undefined, onTopicClick: (topic: string) => void}): JSX.Element {

    const topics = props.topics;
    const mobile = useWindowSize();

    function handleClick(item: string): void {
        props.onTopicClick(item);
    }

    return (
        <nav className={!mobile ? NavStyles.PARENT_DESKTOP : NavStyles.PARENT_MOBILE}>
            <ul className={NavStyles.UL}>
                {topics?.map((item: string, index: number) => (
                    <li key={index} className={NavStyles.LI} onClick={() => handleClick(item)}>
                        {item}
                    </li>
                ))}
            </ul>
        </nav>
    );
}