import bcrypt from 'bcrypt'
import UserEntity from '../entities/User.entity'
import { UserOrError } from '../inputs/inputs'

export default async function login_error_check(user: UserEntity ,password: string): Promise<UserOrError | null> {
    if(!user) return {
        error: {
            title: "email",
            description: "User is not found with that email"
        },
        data: null
    } 
    const isValid = await bcrypt.compare(password , user.password)
    if(!isValid) return {
        data: null,
        error: {
            title: "password",
            description: "Password is not correct"
        }
    } 

    return null
}