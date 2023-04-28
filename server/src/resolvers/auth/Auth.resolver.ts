import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import UserEntity from "../../entities/User.entity";
import { LoginUserArgs, RegisterUserArgs, UserOrError } from "../../inputs/inputs";
import { MyContext } from "../../types";
import check from '../../utils/check';
import login_error_check from '../../utils/login_check';

@Resolver()
class AuthResolver {
    @Mutation(() => UserOrError)
    async login (
        @Arg('options' , () => LoginUserArgs) options: LoginUserArgs,
        @Ctx() { req }: MyContext
    ): Promise<UserOrError | null> {
        const { email , password } = options

        const user: UserEntity[] = await UserEntity.query(`
            SELECT * FROM users u WHERE u.email = '${email}'
        `)
        
        const u = user[0]

        const error = login_error_check(u,password) 
        
        if(error) return error
        
        const payload = {
            id: u.id,
            email: u.email,
            username: u.username
        }
        const accessToken = generateAccessToken(payload)
        const refreshToken = generateRefreshToken(payload)
        
        req.session.userId = u.id
        req.session.accessToken = accessToken
        req.session.refreshToken = refreshToken
        
        return {
            data: u,
            error: null
        }
    }

    @Mutation(() => UserOrError)
    async register (
        @Arg("options" , () => RegisterUserArgs) options: RegisterUserArgs
    ): Promise<UserOrError | null> {
        const checkIfAnErrorExists = check(options)
        if(checkIfAnErrorExists) return checkIfAnErrorExists
        const password = await bcrypt.hash(options.password , 12)
        const user = await UserEntity.query(`
            INSERT INTO users (
                id , username , email , password , image
            ) VALUES (
                DEFAULT , '${options.username}' , '${options.email}' , '${password}' , '${options.image}'
            ) ON CONFLICT DO NOTHING RETURNING *
        `)
    
        return {
            data: user[0],
            error: null
        }
    }

    @Mutation(() => String)
    async refreshAccessToken(
        @Ctx() { req }: MyContext
    ) {
        const { refreshToken, accessToken } = req.session
        const decodedAccessToken = jwt_decode(accessToken as string)
        if(Date.now() > (decodedAccessToken as any).exp) {
            jwt.verify(refreshToken as string,process.env.JWT_REFRESH_SECRET, (err,data) => {
                if(err) return err
                delete (data as any).iat
                const payload = {
                    ...data as any,
                }
                const newRefreshToken = generateRefreshToken(payload)
                const newAccessToken = generateAccessToken(payload)
                
                req.session.accessToken = newAccessToken
                req.session.refreshToken = newRefreshToken 
            })
        }

        return ""
    }

    @Mutation(() => Boolean)
    async logout (
        @Ctx() { req , res } : MyContext
    ) {
        const { session } = req
        try {
            session.destroy((err) => {
                if(err) return err
            })
            res.clearCookie("uid")
            return true
        } catch (error) {
            return false
        }
    }
}

const generateAccessToken = (payload: any) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: 60 * 5 })
}

const generateRefreshToken = (payload: any) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET)
}


export default AuthResolver