import { Arg, FieldResolver, Mutation, Resolver, Root } from "type-graphql";
import CommentEntity from "../../entities/Comment.entity";
import UserEntity from "../../entities/User.entity";

@Resolver(() => CommentEntity)
class CommentResolver {
    @FieldResolver(() => UserEntity)
    async user (
        @Root() comment: CommentEntity
    ) {
        const user = await UserEntity.query(`
            SELECT username,image,id FROM users u WHERE u.id = '${comment.userId}'
        `)

        return user[0]
    }

    @Mutation(() => Boolean)
    async deleteComment(
        @Arg("commentId" , () => String) commentId: string
    ) {
        const deletedComment = await CommentEntity.query(`
            DELETE FROM comments c WHERE c.id = '${commentId}'
        `)
        
        if(deletedComment[1] === 0) return false // means that nothing is deleted

        return true
    }

    @Mutation(() => CommentEntity)
    async updateComment(
        @Arg("commentId" , () => String) commentId: string,
        @Arg("comment" , () => String) comment: string
    ) {
        try {
            const updatedComment = await CommentEntity.query(`
                UPDATE comments SET comment = '${comment}' WHERE id = '${commentId}' RETURNING *
            `)
            
            return updatedComment[0][0]
        } catch (error) {
            throw new Error(error as string)
        }
    }
}

export default CommentResolver