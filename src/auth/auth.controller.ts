import { UserService } from './../user/user.service';
import { AuthResetDTO } from './dtos/auth-reset.dto';
import { AuthForgetDTO } from './dtos/auth-forget.dto';
import { AuthRegisterDTO } from './dtos/auth-register.dto';
import { AuthLoginDTO } from './dtos/auth-login.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private userService: UserService,
        private authService: AuthService,
    ) {}

    @Post('login') // Logar usuário
    async login(@Body() body: AuthLoginDTO) {

    }

    @Post('register') // Registrar usuário
    async register(@Body() body:AuthRegisterDTO) {
        return this.userService.create(body)
    }

    @Post('forget') // Recuperar login
    async forget(@Body() {email}:AuthForgetDTO) {
        return this.authService.forget(email);
    }

    @Post('reset') // Recuperar senha
    async reset(@Body() {password, token}:AuthResetDTO) {
        return this.authService.reset(password, token)
    }
}