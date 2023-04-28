declare module '*.mp4' {
    // Tell the compiler that modules whose name ends with .mp4 have default exported string
    export default "" 
}

declare namespace NodeJS {
    // This extends environment variables under the NodeJS namespace in the ProcessEnv interface
    interface ProcessEnv {
        NEXT_PUBLIC_SANITY_APP_TOKEN: string
        NEXTAUTH_URL: string
        NEXTAUTH_SECRET: string
        NEXT_AUTH_GOOGLE_CLIENT_SECRET: string
        NEXT_AUTH_GOOGLE_CLIENT_ID: string
        NEXT_AUTH_GITHUB_CLIENT_ID: string
        NEXT_AUTH_GITHUB_CLIENT_SECRET: string
        NODE_ENV: string
    }
}