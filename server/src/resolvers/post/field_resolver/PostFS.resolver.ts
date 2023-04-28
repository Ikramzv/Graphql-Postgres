import { FieldResolver, Resolver, Root } from "type-graphql";
import CommentEntity from "../../../entities/Comment.entity";
import LikesEntity from "../../../entities/Likes.entity";
import PostEntity from "../../../entities/Post.entity";
import UserEntity from "../../../entities/User.entity";

@Resolver(() => PostEntity)
class PostResolver {
    @FieldResolver(() => UserEntity)
    async user (
        @Root() post: PostEntity
    ) {
        const user = await UserEntity.query(`
            SELECT * FROM users u WHERE u.id = '${post.userId}'
        `)

        return user[0]
    }

    @FieldResolver(() => [String])
    async likes(
        @Root() post: PostEntity
    ) {
        const likes: {userId: string}[] = await LikesEntity.query(`
            SELECT "userId" FROM likes l WHERE l."postId" = '${post.id}'
        `)
        
        return likes.map((item) => item.userId)
    }

    @FieldResolver(() => [CommentEntity])
    async comments(
        @Root() post: PostEntity
    ) {
        const comment = await CommentEntity.query(`
            SELECT c.* FROM comments c WHERE c."postId" = '${post.id}'
        `)

        return comment
    }
}

export default PostResolver