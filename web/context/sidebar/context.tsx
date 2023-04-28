import { createContext, useContext, useMemo, useReducer } from 'react';
import { ActionType } from "../../types/types";
import reducer, { SidebarState, sidebar_state } from "./reducer";

function basedOnWindowSize() {
    return typeof window === "undefined" ? false : window.innerWidth > 768 ? true : false
}

type ContextReturnType = [SidebarState , React.Dispatch<ActionType<boolean>>]

const SidebarContext = createContext<ContextReturnType>([
    {
        toggleSidebar: basedOnWindowSize()
    },
    () => "default"
])


const Context = ({ children }: { children: React.ReactNode }) => {
    const [state,dispatch] = useReducer(reducer , sidebar_state)

    const memo = useMemo<ContextReturnType>(() => [state,dispatch] , [state.toggleSidebar])

    return (
        <SidebarContext.Provider value={memo} >
            { children }
        </SidebarContext.Provider>
    )
}


export const useSidebarState = () => useContext(SidebarContext)
export default Context