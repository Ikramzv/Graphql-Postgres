import { createContext, useContext, useMemo, useReducer } from 'react';
import { ActionType, Post } from "../../types/types";
import reducer, { PostsState, posts_state } from "./reducer";

type ContextReturnType = [PostsState , React.Dispatch<ActionType<Post[]>>]

const PostsContext = createContext<ContextReturnType>([
    {
        posts: []
    },
    () => "default"
])


const Context = ({ children }: { children: React.ReactNode }) => {
    const [state,dispatch] = useReducer(reducer , posts_state)

    const memo = useMemo<ContextReturnType>(() => [state,dispatch] , [state.posts.length])

    return (
        <PostsContext.Provider value={memo} >
            { children }
        </PostsContext.Provider>
    )
}


export const usePostsState = () => useContext(PostsContext)
export default Context