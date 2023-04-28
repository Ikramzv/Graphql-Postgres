import { ActionType, Post } from "../../types/types";

const POSTS_ACTION_TYPES = {
    SET_POSTS: "set_posts"
} 

export interface PostsState {
    posts: Post[]
}

const posts_state : PostsState = {
    posts: []
}

const reducer = (state = posts_state , action: ActionType<Post[]> ): PostsState => {
    switch (action.type) {
        case POSTS_ACTION_TYPES.SET_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        default: 
            return state
    }
}

export {
    posts_state,
    POSTS_ACTION_TYPES,
};
export default reducer