import { usePostsState } from "../context/posts/context"

function Posts() {
  const [{ posts } , dispatch] = usePostsState()

  return (
    <div className="overflow-y-auto">
      {posts.map((post) => (
        <div key={post.id} >
          {post.user.email}
        </div>
      ))}
    </div>
  )
}

export default Posts