import { User } from "../../types/types"

export interface UserState {
    user: User | null
}

export const USER_ACTION_TYPES = {
    SET_USER: "set_user"
}

export const initial_state: UserState = {
    user: null,
}

export default function reducer (state = initial_state,  action: { type: string, payload: any }): UserState {
    switch (action.type) {
        case USER_ACTION_TYPES.SET_USER:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}