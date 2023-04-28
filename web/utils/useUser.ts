import { useRouter } from "next/router";
import { useEffect } from 'react';
import { useUserState } from "../context/user/context";
import { USER_ACTION_TYPES } from "../context/user/reducer";
import { User } from "../types/types";

export default function useUser(user: User) {
    const [_,dispatch] = useUserState()
    const router = useRouter()

    useEffect(() => {
        if(user) {
            dispatch({
                type: USER_ACTION_TYPES.SET_USER,
                payload: user
            })
        } else {
            router.push("/login")
        }
    } , [])
}