import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, UpdatePasswordDto } from "./user.dto";
import { compare, hash } from 'bcrypt'
import { PrismaService } from "../prisma.service";
import { User } from '@prisma/client'

interface FormatLogin extends Partial<User> {
  email: string
}

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
  ) {
  }
  async updatePassword(payload: UpdatePasswordDto, id: string):
    Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });
    if (!user) {
      throw new HttpException("invalid_credentials",
        HttpStatus.UNAUTHORIZED);
    }
    const areEqual = await compare(payload.old_password,
      user.password);
    if (!areEqual) {
      throw new HttpException("invalid_credentials",
        HttpStatus.UNAUTHORIZED);
    }
    return await this.prisma.user.update({
      where: { id },
      data: { password: await hash(payload.new_password, 10) }
    });
  }


  async create(userDto: CreateUserDto): Promise<any> {

    const userInDb = await this.prisma.user.findFirst({
      where: { email: userDto.email }
    });
    if (userInDb) {
      throw new HttpException("user_already_exist",
        HttpStatus.CONFLICT);
    }
    return await this.prisma.user.create({

      data: {
        ...(userDto),
        password: await hash(userDto.password, 10)
      }

    });
  }


  async findByEmail({ email, password }: LoginUserDto):
    Promise<FormatLogin> {
    const user = await this.prisma.user.findFirst({
      where: { email }
    });

    if (!user) {
      throw new HttpException("invalid_credentials",
        HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await compare(password, user.password);

    if (!areEqual) {
      throw new HttpException("invalid_credentials",
        HttpStatus.UNAUTHORIZED);
    }

    const { password: p, ...rest } = user;
    return rest;
  }

  //use by auth module to get user in database
  async findByPayload({ email }: any): Promise<any> {
    return await this.prisma.user.findFirst({
      where: { email }
    });
  }

}