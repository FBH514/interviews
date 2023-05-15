export interface QuizProps {
    question: string;
    answer: string;
}

export interface NavProps {
    topics: string[] | undefined;
    onTopicClick: (topic: string) => void;
}