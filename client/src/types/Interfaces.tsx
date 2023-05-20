export interface QuizProps {
    question: string;
    answer: string;
}

export interface NavProps {
    topics: string[] | undefined;
    onTopicClick: (topic: string) => void;
}

export interface HotkeysProps {
    hotkey: string;
    icon?: string;
}