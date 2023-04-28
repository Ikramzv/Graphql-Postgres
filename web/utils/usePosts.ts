import { useEffect } from 'react';
import { usePostsState } from "../context/posts/context";
import { POSTS_ACTION_TYPES } from "../context/posts/reducer";
import { Post } from "../types/types";

export default function usePosts(posts: Post[]) {
    const [_ , dispatch] = usePostsState()

    useEffect(() => {
        dispatch({
            type: POSTS_ACTION_TYPES.SET_POSTS,
            payload: posts
        })
    }, [])
}