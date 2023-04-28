import { Arg, Args, Ctx, Mutation, UseMiddleware } from "type-graphql"
import CommentEntity from "../../../entities/Comment.entity"
import LikesEntity from "../../../entities/Likes.entity"
import PostEntity from "../../../entities/Post.entity"
import { PostArgs, UpdateArgs } from "../../../inputs/inputs"
import auth from "../../../middlewares/auth"
import { MyContext } from "../../../types"



class PostMutationResolver {
    @Mutation(() => PostEntity)
    @UseMiddleware(auth)
    async createPost (
        @Args(() => PostArgs) args: PostArgs,
        @Ctx() { req }: MyContext
    ) {
        const { title , description, image } = args

        const post = await PostEntity.query(`
            INSERT INTO posts (
                id , title, description, image, "userId"
            ) VALUES (
                DEFAULT , '${title}' , '${description}' , '${image}' , '${req.session.userId}'
            ) RETURNING *
        `)
                
        return post[0]
    }

    @Mutation(() => Boolean)
    @UseMiddleware(auth)
    async deletePost(
        @Arg("postId", () => String) postId: string,
        @Ctx() { req }: MyContext
    ) {
        const post: PostEntity[] = await PostEntity.query(`
            SELECT * FROM posts p WHERE p.id = '${postId}'
        `)
        if(!post[0]) throw new Error("Couldn't found such a post with the given id")
        if(post[0].userId !== req.session.userId) throw new Error("Unauthorized")
    
        await post[0].remove()

        return true
    }

    @Mutation(() => PostEntity)
    async updatePost(
        @Arg("options", () => UpdateArgs) options: UpdateArgs,
        @Ctx() { req }: MyContext
    ) {
        const { postId, ...others } = options
        const post = await PostEntity.query(`
            SELECT * FROM posts p WHERE p.id = '${postId}'
        `)
        if(!post[0]) throw new Error("Couldn't found such a post with the given id")
        if(post[0].userId !== req.session.userId) throw new Error("Unauthorized")
        
        const definedArgs = Object.keys(others).reduce((initial , key: any) => {
            if(!(others as any)[key]) return initial ;
            if(initial) initial += "," 
            initial += `${key} = '${(others as any)[key]}'`
            return initial
        } , "")

        const updatedPost = await PostEntity.query(`
            UPDATE posts SET ${definedArgs} WHERE id = '${postId}' RETURNING *
        `)
        return updatedPost[0][0]
    }

    @Mutation(() => String)
    @UseMiddleware(auth)
    async like(
        @Arg("postId" , () => String) postId: string,
        @Ctx() { req }: MyContext
    ) {
        const { userId } = req.session
        const likedPost = await LikesEntity.query(`
            SELECT * FROM likes l WHERE l."postId" = '${postId}' AND l."userId" = '${userId}'
        `)
        let result;
        if(!likedPost[0]) {
            await LikesEntity.query(`
                INSERT INTO likes (id,"postId","userId") 
                VALUES ( DEFAULT, '${postId}', '${userId}' )
            `)
            result = "liked"
        } else {
            await LikesEntity.query(`
                DELETE FROM likes WHERE "postId" = '${postId}' AND "userId" = '${userId}'
            `)
            result = "unliked"
        }
        
        return result
    }

    @Mutation(() => CommentEntity)
    @UseMiddleware(auth)
    async comment(
        @Arg("postId" , () => String) postId: string,
        @Arg("comment", () => String) comment: string ,
        @Ctx() { req }: MyContext
    ) {
        const { userId } = req.session
        const newComment = await CommentEntity.query(`
            INSERT INTO comments (id,"userId","postId",comment)
            VALUES (
                DEFAULT ,
                '${userId}',
                '${postId}',
                '${comment}'
            ) RETURNING *
        `)

        return newComment[0]
    }
}

export default PostMutationResolver