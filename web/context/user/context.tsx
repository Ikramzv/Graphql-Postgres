import React, { createContext, useContext, useMemo, useReducer } from "react";
import { ActionType, User } from "../../types/types";
import reducer, { initial_state, UserState } from "./reducer";

type ContextReturnType = [UserState , React.Dispatch<ActionType<User>>]

const UserContext = createContext<ContextReturnType>([
    {
        user: null
    },
    () => ""
])


const Context = ({ children }: { children: React.ReactNode }) => {
    const [state,dispatch] = useReducer(reducer , initial_state)
    const memo = useMemo<ContextReturnType>(() => [state,dispatch] , [state.user])
    return (
        <UserContext.Provider value={memo} >
            { children }
        </UserContext.Provider>
    )
}

export const useUserState = () => useContext(UserContext)
export default Context