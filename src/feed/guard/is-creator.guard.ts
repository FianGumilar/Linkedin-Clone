import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/service/auth.service';
import { FeedService } from '../services/feed.service';
import { FeedPost } from '../models/post.interface';
import { User } from 'src/auth/models/user.interface';
import { switchMap, map } from 'rxjs';

@Injectable()
export class IsCreatorGuard implements CanActivate {
  constructor(private authService: AuthService, private feedService: FeedService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest()
      const { user, params } : { user: User ; params: { id: number }} = request;

      if(!user || !params) return false;

      if(user.role === 'admin') return true;

      const userId = user.id;
      const feedId = params.id;

      return this.authService.findUserbyId(userId).pipe(
        switchMap((user: User) => this.feedService.findPostById(feedId).pipe(
          map((feedPost: FeedPost) => {
            let isAuthor = user.id === feedPost.author.id;
            return isAuthor;
          })
        ))
      )
  }
}
