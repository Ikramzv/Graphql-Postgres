import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import PostEntity from "./Post.entity";
import UserEntity from "./User.entity";

@ObjectType()
@Entity("comments")
class CommentEntity extends BaseEntity {
    @PrimaryColumn({ type: "uuid" , generated: 'uuid' })
    @Field(() => String)
    id: string

    @Column("varchar")
    @Field(() => String)
    comment: string

    @Field(() => String)
    userId: string

    @Field(() => String)
    postId: string
    
    @ManyToOne(() => UserEntity , (user) => user.comments)
    @JoinColumn({ name: "userId" })
    user: UserEntity

    @ManyToOne(() => PostEntity , (post) => post.comments)
    @JoinColumn({ name: "postId" })
    post: PostEntity
}

export default CommentEntity