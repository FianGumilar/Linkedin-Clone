import { Controller, Post, Body, Get, Put, Param, Delete } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { FeedPost } from '../modules/post.interface';
import { FeedService } from '../services/feed.service';

@Controller('feed')
export class FeedController {
    constructor(private feedService: FeedService) {}
    
    @Post()
    create(@Body() body: FeedPost): Observable<FeedPost> {
        return from(this.feedService.createPost(body));
    }

    @Get()
    findAll(): Observable<FeedPost[]> {
        return from(this.feedService.findAllPost());
    }

    @Put(':id') 
    update(
        @Param('id') id: number,
        @Body() body: FeedPost,
    ): Observable<UpdateResult> {
        return from(this.feedService.updatePost(id, body));
    }

    @Delete('id')
    delete(@Param('id') id: number): Observable<DeleteResult> {
        return from(this.feedService.deletePost(id));
    }s
}
