import { Controller, Body, Post, Request, UseGuards, UseInterceptors, UploadedFile} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { FeedPost } from 'src/feed/models/post.interface';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from '../guard/jwt.guard';
import { Multer } from 'multer';
import { saveToImageStorage } from '../helpers/image-storage';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', saveToImageStorage))
    uploadImage(@UploadedFile() file: Express.Multer.File, @Request() req): any {
        return
    }

}
