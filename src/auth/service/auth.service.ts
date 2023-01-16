import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import * as bcrypt from 'bcrypt';
import { Observable, from, switchMap, map } from 'rxjs';
import { User } from '../models/user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity) 
        private readonly userRepository: Repository<UserEntity>,
        private jwtService: JwtService
        ) {}

    hashPassword(password: string): Observable<string> {
        return from(bcrypt.hash(password, 10))
    }

    registerAccount(user: User): Observable<User> {
        const { firstName, lastName, email, password } = user;
    
          return this.hashPassword(password).pipe(
          switchMap(() => {
            return this.hashPassword(password).pipe(
              switchMap((hashedPassword: string) => {
                return from(
                  this.userRepository.save({
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                  }),
                ).pipe(
                  map((user: User) => {
                    delete user.password;
                    return user;
                  }),
                );
              }),
            );
          }),
        );
      }

      validateUser(email: string, password: string): Observable<User> {
        return from(this.userRepository.findOne(
          { where: {email: email}, 
          select: ['id', 'firstName', 'lastName', 'password', 'role'] 
          },)).pipe(
          switchMap((user: User) => 
          from(bcrypt.compare(password, user.password)).pipe(
            map((isValidPassword: boolean) => {
              if(isValidPassword) {
                delete user.password;
                return user;
              }
            }),
            ),       
          ),
        );
      }

      loginAccount(user: User): Observable<string> {
        const { email, password } = user;
        return from(this.validateUser(email, password).pipe(
          switchMap((user: User) => {
            if(user) {
              // JWT Credentials
              return from(this.jwtService.signAsync({ user }))
            }
          })
        )
      )}

      findUserbyId(id: number): Observable<User> {
        return from(
          this.userRepository.findOne({ where: { id: id }, relations: ['feedPostEntity']})
        ).pipe(
          map((user: User) => {
            delete user.password;
            return user;
          })
        )
      }
}
