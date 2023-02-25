import {
    Body,
    Controller,
    HttpStatus,
    Logger,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { User } from '../model/user.schema';
import { UserService } from '../service/user.service';
import { Response } from 'express';
import { AuthService } from '../service/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/v1/user')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) { }

    @UseGuards(AuthGuard('local'))
    @Post('/signup')
    async Signup(@Res() response: Response, @Body() user: User) {
        const newUser = await this.userService.signup(user);
        return response.status(HttpStatus.CREATED).json({
            newUser,
        });
    }

    @Post('/signin')
    async login(@Req() req) {
        return this.authService.signin(req.body);
    }
}
