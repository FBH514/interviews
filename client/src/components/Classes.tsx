export enum ButtonClasses {
    ARROW = "rounded-lg h-10 w-10 flex items-center justify-center hover:bg-stone-700 hover:bg-opacity-25 active:bg-stone-700 active:bg-opacity-25 active:scale-90",
    SHOW = "rounded-lg bg-gradient-to-br from-amber-300 to-amber-500 p-2 text-xl font-bold shadow-md text-stone-700 hover:bg-gradient-to-tl"
}

export enum ContainerClasses {
    PARENT_SHOW = "App grid grid-cols-2 items-center justify-items-center min-h-screen bg-gradient-to-br from-sky-300 to-purple-500 relative",
    PARENT = "App grid grid-cols-1 items-center justify-items-center min-h-screen bg-gradient-to-br from-sky-300 to-purple-500",
}

export enum NavClasses {
    PARENT = "w-60 h-screen bg-gradient-to-br from-stone-200 to-stone-100 flex flex-cols justify-center items-center p-8 shadow-lg",
    UL = "gap-4 flex flex-col",
    LI = "text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-stone-700 to-stone-700 hover:from-sky-300 hover:to-purple-500 cursor-pointer",
    MENU = "absolute top-0 left-0 p-4 cursor-pointer hover:scale-90",
}