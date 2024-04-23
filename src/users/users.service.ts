import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { compare, hash } from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';

export interface FormatLogin extends Partial<User> {
  email: string;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userDto: CreateUserDto): Promise<any> {
    const userInDb = await this.prisma.user.findFirst({
      where: { email: userDto.email },
    });
    if (userInDb) {
      throw new HttpException('user_already_exist', HttpStatus.CONFLICT);
    }
    return await this.prisma.user.create({
      data: {
        ...userDto,
        password: await hash(userDto.password, 10),
      },
    });
  }

  async findByEmail({ email }: LoginUserDto): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  //use by auth module to get user in database
  async findByPayload({ email }: any): Promise<any> {
    return await this.prisma.user.findFirst({
      where: { email },
    });
  }

  async getAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }
}
