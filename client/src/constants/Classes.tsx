export enum QuizStyles {
    PARENT_DESKTOP = "grid grid-rows-3 gap-8 w-9/12 h-5/6 justify-items-center items-center p-4",
    PARENT_MOBILE = "grid grid-rows-3 gap-4 w-screen h-screen justify-items-center items-center px-4 py-16",
    PROMPT_DESKTOP = "grid grid-cols-2 items-center gap-4 text-center w-full",
    PROMPT_MOBILE = "grid grid-cols-1 items-center gap-4 text-center w-full"
}

export enum ButtonStyles {
    ARROW = "rounded-lg h-10 w-10 flex items-center justify-center hover:bg-stone-700 hover:bg-opacity-25 active:bg-stone-700 active:bg-opacity-25 active:scale-90",
    SHOW = "rounded-lg bg-gradient-to-br from-amber-300 to-amber-500 p-2 text-xl font-bold shadow-md text-stone-700 hover:bg-gradient-to-tl"
}

export enum AppStyles {
    PARENT_SHOW_DESKTOP = "App grid grid-cols-2 items-center justify-items-center min-h-screen bg-gradient-to-br from-sky-300 to-purple-500 relative overflow-x-hidden",
    PARENT_DESKTOP = "App grid grid-cols-1 items-center justify-items-center min-h-screen bg-gradient-to-br from-sky-300 to-purple-500 overflow-x-hidden",
    PARENT_SHOW_MOBILE = "App grid grid-rows-2 items-center justify-items-center min-h-screen bg-gradient-to-br from-sky-300 to-purple-500 relative overflow-x-hidden"
}

export enum NavStyles {
    PARENT_DESKTOP = "w-60 h-screen bg-gradient-to-br from-stone-200 to-stone-100 flex flex-cols justify-center items-center p-8 shadow-lg",
    PARENT_MOBILE = "w-screen h-screen bg-gradient-to-br from-stone-200 to-stone-100 flex flex-cols justify-center items-center p-8 shadow-lg",
    UL = "gap-4 flex flex-col",
    LI = "text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-stone-700 to-stone-700 hover:from-sky-300 hover:to-purple-500 cursor-pointer",
    MENU = "absolute top-0 left-0 p-4 cursor-pointer hover:scale-90",
}
