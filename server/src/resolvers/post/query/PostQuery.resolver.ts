import { Arg, Query, Resolver } from "type-graphql"
import PostEntity from "../../../entities/Post.entity"

@Resolver()
class PostQueryResolver {
    @Query(() => [PostEntity])
    async posts (): Promise<PostEntity[]> {
        const posts = await PostEntity.query(`
            SELECT * FROM posts p
        `)

        return posts
    }

    @Query(() => PostEntity)
    async post(
        @Arg("id",() => String) postId: string
    ): Promise<PostEntity> {
        if(!postId) throw new Error("Id must be provided")
        const post = await PostEntity.query(`
            SELECT * FROM posts p WHERE p.id = '${postId}'
        `)

        return post
    }
}

export default PostQueryResolver