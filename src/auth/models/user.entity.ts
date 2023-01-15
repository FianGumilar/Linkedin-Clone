import { IsEmail } from "class-validator";
import { FeedPostEntity } from "src/feed/models/post.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Role } from "./role.enum";

@Entity('users_entity')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    @IsEmail()
    email: string;

    @Column({ select: false })
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: Role

    @OneToMany(() => FeedPostEntity, (feedPostEntity) => feedPostEntity.author)
    posts: FeedPostEntity[]
}