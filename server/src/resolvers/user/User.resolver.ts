import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import PostEntity from "../../entities/Post.entity";
import SaveEntity from '../../entities/Save.entity';
import UserEntity from "../../entities/User.entity";
import Auth from "../../middlewares/auth";
import { MyContext } from '../../types';


@Resolver(() => UserEntity)
class UserResolver {
    @Query(() => UserEntity , { nullable: true })
    async getUser (
        @Arg("id" , () => String , { nullable: true }) id: string,
        @Arg("email" , () => String , { nullable: true }) email: string,
        @Arg("username" , () => String , { nullable: true }) username: string,
    ) {
        const defined = [{id},{email},{username}].reduce<string[]>((initial , arg) => {
            if(initial.length) return initial
            const value: any = Object.values(arg)[0]
            if(typeof value === "undefined") return initial
            const key = Object.keys(arg)[0]
            return [key,value]
        } , [])

        let user = await UserEntity.query(`
            SELECT * FROM users u WHERE u."${defined[0]}" ILIKE '${defined[1]}'
        `)
    

        return user[0] ?? null
    }

    @Query(() => UserEntity , { nullable: true })
    async callMe (
        @Ctx() { req } : MyContext
    ) {
        const { session } = req
        console.log(session.id)
        if(!session.userId) return null
        const user = await UserEntity.query(`
            SELECT * FROM users u WHERE u.id = '${session.userId}'
        `)
        return user[0]
    }

    @Query(() => [PostEntity])
    @UseMiddleware(Auth)
    async savedPosts (
        @Ctx() { req } : MyContext
    ) {
        const { userId } = req.session
        const posts = await SaveEntity.query(`
            SELECT "postId" , p.* FROM saves s 
            LEFT JOIN posts p ON p.id = s."postId" 
            WHERE s."userId" = $1
        ` , [userId])

        return posts
    }

    @Mutation(() => Boolean)
    async savePost(
        @Arg("postId" , () => String) postId: string,
        @Ctx() { req }: MyContext
    ): Promise<Boolean> {
        const { session: { userId } } = req
        if(!userId) return false
        try {
            await SaveEntity.query(`
                INSERT INTO saves (id,"postId","userId") VALUES ( DEFAULT , $1 , $2 )
            ` , [postId ,  userId])
            return true
        } catch (error) {
            return false
        }
    }

    @Mutation(() => Boolean)
    async unsavePost(
        @Arg("postId" , () => String) postId: string,
        @Arg("userId" , () => String) userId: string
    ) {
        try {
            const deleted = await SaveEntity.query(`
                DELETE FROM saves s WHERE s."postId" = '${postId}' AND s."userId" = '${userId}'
            `)
            if(deleted[1] === 0) return false // Nothing deleted
            return true
        } catch (error) {
            return false
        }
    }
    

}

export default UserResolver