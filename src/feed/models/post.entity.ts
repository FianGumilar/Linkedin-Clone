import { UserEntity } from "src/auth/models/user.entity";
import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, ManyToOne } from "typeorm";

@Entity('feed_post')
export class FeedPostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: ''})
    body: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.posts)
    author: UserEntity;
}