import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { Observable, from, map } from 'rxjs';
import { User } from '../models/user.interface';


@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) 
        private readonly userRepository: Repository<UserEntity>,
        private jwtService: JwtService) {}

    findUserById(id: number): Observable<User> {
        return from(
            this.userRepository.findOne({ where: { id: id }, relations: ['feedPostEntity']})
        ).pipe(
            map((user: User) => {
                delete user.password;
                return user;
            })
        )
    }

    updateUserImageById(id: number, imagePath: string): Observable<UpdateResult> { {
        const user: User = new UserEntity();
        user.id = id;
        user.imagePath = imagePath;
        return from(
            this.userRepository.update(id, user)
        )
      }
    }

    findImageNameById(id: number): Observable<string> {
        return from(
            this.userRepository.findOne({ where: { id: id }})
        ).pipe(
            map((user: User) => {
                delete user.password;
                return user.imagePath;
            })
        )
    }
 }
