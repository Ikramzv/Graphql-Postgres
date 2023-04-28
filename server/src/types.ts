import { Request, Response } from 'express'
import { Session } from 'express-session'
import Redis from 'ioredis'
import { DataSource } from 'typeorm'

export interface MyContext {
    req: Request & { session: Session & { [key: string]: any , userId?: any, accessToken?: string , refreshToken?: string } }
    res: Response
    redis: Redis
    dataSource: DataSource
}