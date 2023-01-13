import { AuthGuard } from './guards/auth.guard';
import { AuthResetDTO } from './dtos/auth-reset.dto';
import { AuthForgetDTO } from './dtos/auth-forget.dto';
import { AuthRegisterDTO } from './dtos/auth-register.dto';
import { AuthLoginDTO } from './dtos/auth-login.dto';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { User } from 'src/decorators/user.decorator';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ) {}

    @Post('login') // Logar usuário
    async login(@Body() {email, password}: AuthLoginDTO) {
        return this.authService.login(email, password);
    }

    @Post('register') // Registrar usuário
    async register(@Body() body: AuthRegisterDTO) {
        return this.authService.register(body);
    }

    @Post('forget') // Recuperar login
    async forget(@Body() {email}:AuthForgetDTO) {
        return this.authService.forget(email);
    }

    @Post('reset') // Recuperar senha
    async reset(@Body() {password, token}:AuthResetDTO) {
        return this.authService.reset(password, token);
    }

    @UseGuards(AuthGuard)
    @Post('me') // Recuperar senha
    async me(@User() user) {
        return {user};
    }
}