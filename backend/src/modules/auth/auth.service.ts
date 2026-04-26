import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './models/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(email: string, password: string, username: string) {
    const existingEmail = await this.userModel.findOne({ email }).lean();
    if (existingEmail) return { message: 'email already exists' };

    const existingUsername = await this.userModel.findOne({ username }).lean();
    if (existingUsername) return { message: 'username already exists' };

    const user = await this.userModel.create({ email, username, password });
    console.log(user ?? 'no user ');
    return {
      accessToken: this.jwtService.sign({
        sub: user._id,
        email: user.email,
      }),
      user,
    };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email }).lean();
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) throw new UnauthorizedException('Invalid credentials');

    return {
      accessToken: this.jwtService.sign({
        sub: user._id,
        email: user.email,
      }),
      user,
    };
  }

  // async refresh(token: string, res: Response) {
  //   if (!token) {
  //     return { Authentication: false };

  //     try {
  //       const userData.
  //     }
  //   }
  // }
}
