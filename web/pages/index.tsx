import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import client from "../client/client"
import Posts from "../containers/Posts"
// import Home from "../containers/Home"
import { GetUserDocument, PostsDocument } from "../generated/graphql"
import { Post, User } from "../types/types"
import usePosts from "../utils/usePosts"
import useUser from "../utils/useUser"

interface Props {
  user: User,
  posts: Post[]
}

function Index({ user, posts }: Props) {
  
  useUser(user)
  usePosts(posts)
  
  return (
    <div className="" >
        <div className="px-4 py-2 md:px-6" >
          <Posts />
        </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps  = async ({ req }) => {
  const session = await getSession({ req })
  const { data: user } = await client.query(GetUserDocument , { email: session?.user?.email }).toPromise()
  const { data: posts } = await client.query(PostsDocument , {}).toPromise()

  if(!session?.user) {
    return {
      props: {},
      redirect: {
        destination: '/login'
      }
    }
  }

  return {
    props: {
      user: user.getUser,
      posts: posts.posts
    }
  }
}

export default Index