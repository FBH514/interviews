export interface QuizProps {
    question: string;
    answer: string;
}

export interface NavProps {
    topics: string[] | undefined;
    onTopicClick: (topic: string) => void;
}

export interface HotkeysProps {
    showHotkeys: boolean;
    setShowHotkeys: (value: boolean) => void;
    hotkeys: string[] | undefined;
}