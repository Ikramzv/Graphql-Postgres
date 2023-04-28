import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Check, Column, Entity, OneToMany, PrimaryColumn, Unique } from "typeorm";
import CommentEntity from "./Comment.entity";
import LikesEntity from "./Likes.entity";
import PostEntity from "./Post.entity";
import SaveEntity from "./Save.entity";

@Check(`"email" LIKE '%@%.%'`)
@Unique("user_unique_constraint" , ["email" , "username"])

@Entity({ name: "users" })
@ObjectType()
class UserEntity extends BaseEntity {
    @PrimaryColumn({ generated: "uuid" , type: "uuid" })
    @Field(() => String)
    id: string

    @Column("varchar")
    @Field(() => String)
    username: string

    @Column("varchar")
    @Field(() => String)
    email: string

    @Column("varchar")
    @Field(() => String)
    password: string

    @Column("varchar")
    @Field(() => String)
    image: string

    @OneToMany(() => PostEntity , (post) => post.userId , { cascade: ["remove"] })
    posts: PostEntity[]

    @OneToMany(() => SaveEntity , (saves) => saves.user)
    saves: SaveEntity[]

    @OneToMany(() => CommentEntity , (comment) => comment.user)
    comments: CommentEntity[]

    @OneToMany(() => LikesEntity , (comment) => comment.user)
    likes: LikesEntity[]
}

export default UserEntity