import UserEntity from "../entities/User.entity";
import { RegisterUserArgs, UserOrError } from "../inputs/inputs";

export default async function check(options: RegisterUserArgs): Promise<UserOrError | null> {
    const { email,username } = options
    const user = await UserEntity.query(`
        SELECT * FROM users u WHERE u.email LIKE '${email}' OR u.username LIKE '${username}'
    `)
    const u = user[0]

    if(u) {
        const unameEmail = { email: u.email ,username: u.username }
        const title = Object.keys(unameEmail).reduce<string>((initial,key) => {
            if((unameEmail as any)[key] !== (options as any)[key]) return initial
            initial = key
            return initial
        } , '')
        return {
            data: null,
            error: {
                title,
                description: `User already exists with the given '${title}'`
            }
        }
    }

    return null
}