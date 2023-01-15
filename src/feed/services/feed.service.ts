import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateEvent, UpdateResult } from 'typeorm';
import { FeedPostEntity } from '../models/post.entity';
import { FeedPost } from '../models/post.interface';
import { User } from 'src/auth/models/user.interface';

@Injectable()
export class FeedService {
    constructor(
        @InjectRepository(FeedPostEntity)
        private readonly feedPostRepository: Repository<FeedPostEntity>
    ) {}

    createPost(user: User, feedPost: FeedPost): Observable<FeedPost> {
        feedPost.auhtor = user;
        return from (this.feedPostRepository.save(feedPost));
    }

    findAllPost(): Observable<FeedPost[]> {
        return from(this.feedPostRepository.find());
    }

    findPost(take: number = 10, skip: number = 0): Observable<FeedPost[]> {
        return from(
            this.feedPostRepository.findAndCount({ take, skip }).then(([posts]) => {
                return <FeedPost[]>posts;
            }),
        )
    }

    updatePost(id: number, feedPost: FeedPost): Observable<UpdateResult> {
        return from(this.feedPostRepository.update(id, feedPost));
    }

    deletePost(id: number): Observable<DeleteResult> {
        return from(this.feedPostRepository.delete(id));
    }
}
