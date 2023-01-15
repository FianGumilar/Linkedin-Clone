import { Controller, Post, Body, Get, Put, Param, Delete , Query, UseGuards, Request} from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { FeedPost } from '../models/post.interface';
import { FeedService } from '../services/feed.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/models/role.enum';
import { RoleGuard } from 'src/auth/guard/role.guard';

@Controller('feed')
export class FeedController {
    constructor(private feedService: FeedService) {}
    
    @Roles(Role.ADMIN, Role.PREMIUM)
    @UseGuards(JwtGuard, RoleGuard)
    @Post()
    create(@Body() feedPost: FeedPost, @Request() req): Observable<FeedPost> {
        return from(this.feedService.createPost(req.user, feedPost));
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
