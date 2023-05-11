import {QuizProps} from "./components/Interfaces.tsx";
import {Endpoints, QueryKeys} from "./components/Endpoints.tsx";
import {useQuery} from "react-query";
import Quiz from "./components/Quiz.tsx";

async function GET(endpoint: string): Promise<any> {
    const response = await fetch(endpoint);
    return await response.json();
}

export default function App(): JSX.Element {

    const {data: content} = useQuery<QuizProps[]>(QueryKeys.CONTENT, () => GET(Endpoints.CONTENT))

    return (
        <div className={"App flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-300 to-purple-500"}>
            <Quiz params={content}/>
        </div>
    );
}