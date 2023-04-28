import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import PostEntity from "./Post.entity";
import UserEntity from "./User.entity";

@Unique("saves_unique_constraint_post" , ["post"])

@Entity({ name: "saves" })
class SaveEntity extends BaseEntity {
    @PrimaryColumn({ generated: 'uuid' })
    id: string

    @ManyToOne(() => UserEntity , (user) => user.saves)
    @JoinColumn({ name: "userId" })
    user: UserEntity

    @ManyToOne(() => PostEntity , (post) => post.saves)
    @JoinColumn({ name: "postId" })
    post: PostEntity
}

export default SaveEntity