import { ActionType } from "../../types/types";

const SIDEBAR_ACTION_TYPES = {
    TOGGLE_SIDEBAR: "toggle_sidebar"
} 

export interface SidebarState {
    toggleSidebar: boolean
}

const sidebar_state = {
    toggleSidebar: false
}

const reducer = (state: SidebarState = sidebar_state , action: ActionType<boolean> ): SidebarState => {
    switch (action.type) {
        case SIDEBAR_ACTION_TYPES.TOGGLE_SIDEBAR:
            return {
                ...state,
                toggleSidebar: action.payload
            }
        default: 
            return state
    }
}

export {
    sidebar_state,
    SIDEBAR_ACTION_TYPES,
};
export default reducer