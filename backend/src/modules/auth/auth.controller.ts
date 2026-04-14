import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import {
  Controller,
  Body,
  Post,
  Res,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/models/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';

// import { Request } from 'express';

interface AuthRequest extends Request {
  user: {
    userId: string;
    email: string;
  };
}
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  @Post('signup')
  async signUp(
    @Body() body: { email: string; username: string; password: string },
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, user, message } = await this.authService.signup(
      body.email,
      body.password,
      body.username,
    );

    if (message === 'user already exists') {
      res.status(409).json({
        message: 'user already exists',
      });
    }
    res.cookie('user_token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    res.status(201).json({
      message: 'user created',
      success: true,
      accessToken,
      user: {
        id: user?._id,
        email: user?.email,
        username: user?.username,
      },
    });
  }
  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, user } = await this.authService.login(
      body.email,
      body.password,
    );

    res.cookie('user_token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    res.status(201).json({
      message: 'User Logged in successfully',
      success: true,
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  }

  @Get('/getCookie')
  getCookie(@Req() req: Request) {
    if (!req.cookies) return { message: 'no user_token' };

    return req.cookies;
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('user_token');

    return { message: 'logout' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  async refresh(
    @Req() req: AuthRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    // const accessToken = req.cookies.user_token;

    // if (!accessToken) {
    //   return { Authenticated: false };
    // }
    try {
      // const decoded = this.jwtService.verify(accessToken);
      const userData = await this.userModel
        .findById(req.user.userId)
        .select('-password')
        .lean();

      if (!userData) {
        return { Authenticated: false };
      }
      return {
        Authenticated: true,
        user: {
          id: userData._id,
          email: userData.email,
          username: userData.username,
        },
      };
    } catch (err) {
      console.log('error in refresh', err);
    }
  }
}
