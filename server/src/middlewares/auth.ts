import jwt from 'jsonwebtoken';
import { NextFn, ResolverData } from "type-graphql";
import { MyContext } from "../types";

const auth = async ({ info , root, context }: ResolverData<MyContext> , next: NextFn) => {
    const { req } = context
    
    if(!req.session.userId) return new Error("not authenticated")

    jwt.verify(req.session.accessToken as string , process.env.JWT_ACCESS_SECRET , (err: any ,data) => {
        if(err) throw new Error("Couldn't be verify access token : " , err.message)
    })

    return await next()
}

export default auth