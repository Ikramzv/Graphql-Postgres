/// <reference path="./declarations/declarations.d.ts" />

import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import connectRedis from 'connect-redis'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import session from 'express-session'
import Redis from 'ioredis'
import path from 'path'
import { buildSchema } from 'type-graphql'
import { DataSource } from 'typeorm'
import { MyContext } from './types'

dotenv.config()

const main = async() => {
    const redisServer = new Redis()
    redisServer.on("connect" , () => console.log("======= REDIS CONNECTED ========"))
    const RedisStore = connectRedis(session)
    const app = express()

    const dataSource = new DataSource({
        type: 'postgres',
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        synchronize: true,
        logging: true,
        entities: [path.join(__dirname, '../dist/entities' , '/**/*.js')],
        migrations: [],
    })

    await dataSource.initialize()

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [path.join(__dirname, '../dist/resolvers' , '/**/*.resolver.js')],
        }),
        context: ({ req , res }): MyContext => ({ redis: redisServer , req , res, dataSource }), 
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground({
                settings: {
                    "request.credentials": "include"
                }
            })
        ],
    })

    app.use(session({
        name: "uid",
        secret: process.env.SESSION_SECRET,
        store: new RedisStore({
            client: redisServer,
            disableTouch: true,
        }),
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            secure: false,
            sameSite: 'lax',
        },
        rolling: false,
        resave: false,
        saveUninitialized: false
    }))

    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true,
    }))

    // await dataSource.runMigrations()
    
    await apolloServer.start()
    apolloServer.applyMiddleware({
        app,
        cors: false,
    })
    
    app.get('/' , (req,res) => {
        res.send("App is running succesefully, LET'S GO === ! ")
    })

    app.listen(process.env.PORT || 4000 , () => {
        console.log('App is running')
    })

}

main().then(() => {
    console.log('MAIN FUNCTION')
}).catch((err) => console.log("======= MAIN ERROR ======" , err))