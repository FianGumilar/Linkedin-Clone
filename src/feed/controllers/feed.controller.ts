import { Controller, Post, Body, Get, Put, Param, Delete , Query} from '@nestjs/common';
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

    // @Get()
    // findAll(): Observable<FeedPost[]> {
    //     return from(this.feedService.findAllPost());
    // }

    @Get()
    findSelected(
        @Query('take') take: number = 1, 
        @Query('skip') skip: number =1,
    ): Observable<FeedPost[]> { 
        take = take > 20 ? 20 : take;
        return from(this.feedService.findPost(take, skip));
        
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
