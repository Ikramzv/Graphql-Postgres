import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import PostEntity from "./Post.entity";
import UserEntity from "./User.entity";

@Entity("likes")
class LikesEntity extends BaseEntity {
    @PrimaryColumn({ type: "uuid" , generated: 'uuid' })
    id: string

    @ManyToOne(() => UserEntity , (user) => user.likes)
    @JoinColumn({ name: "userId" })
    user: UserEntity

    @ManyToOne(() => PostEntity , (post) => post.likes)
    @JoinColumn({ name: "postId" })
    post: PostEntity
}

export default LikesEntity