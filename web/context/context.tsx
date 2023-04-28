import React from 'react'
import PostsContext from './posts/context'
import SidebarContext from './sidebar/context'
import UserContext from './user/context'

export default ({ children }: { children: React.ReactNode }) => {

    return (
        <UserContext>
            <SidebarContext>
                <PostsContext>
                    { children }
                </PostsContext>
            </SidebarContext>
        </UserContext>
    )
}