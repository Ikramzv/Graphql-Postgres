import { cacheExchange, CacheExchangeOpts } from '@urql/exchange-graphcache'
import { createClient, dedupExchange, errorExchange, fetchExchange } from 'urql'
import { PostsDocument } from '../generated/graphql'
import { Post } from '../types/types'


const client = createClient({
    url: process.env.NODE_ENV === "development" ? "http://localhost:4000/graphql" : "",
    exchanges: [
      dedupExchange,
      cacheExchange({
        updates: {
          Mutation: {
            createPost(parent , args , cache , info) {
              const posts: Post[] | null = cache.readQuery({ query : PostsDocument })
              console.log("====== POSTS =======")
              
            }
          }
        }
      } as CacheExchangeOpts),
      errorExchange({
        onError(error, operation) {
          console.log("====== ERROR =====", error , operation)
        },
        onOperation(operation) {
          return operation
        },
      }),
      fetchExchange,
    ],
})

export default client