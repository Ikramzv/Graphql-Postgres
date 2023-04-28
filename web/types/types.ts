interface Save {
    posts: Post[]
}

interface Comment {
    user?: User
    postId: string
    userId: string
    comment: string
}

export interface Post {
    id: string
    about: string
    title: string
    destination: string
    category: string
    image: string
    userId: string,
    user: User
    comments: Comment[]
}

export interface User {
    username: string
    image: string
    email: string
    posts?: Post[]
    saves?: Save[]
    id: string
}

export interface DecodedToken {
    name: string
    email: string
    picture: string
    sub: string 
    iat: number 
    exp: number 
    jti: string
}

export interface ActionType<T> {
    type: string
    payload: T
}