import { UserEntity } from './../user/entities/user.entity';
import { FileService } from './../file/file.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthResetDTO } from './dtos/auth-reset.dto';
import { AuthForgetDTO } from './dtos/auth-forget.dto';
import { AuthRegisterDTO } from './dtos/auth-register.dto';
import { AuthLoginDTO } from './dtos/auth-login.dto';
import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  BadRequestException,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { User } from '../decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { UploadedFile } from '@nestjs/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private fileService: FileService,
  ) {}

  @Post('login') // Logar usuário
  async login(@Body() { email, password }: AuthLoginDTO) {
    return this.authService.login(email, password);
  }

  @Post('register') // Registrar usuário
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @Post('forget') // Recuperar login
  async forget(@Body() { email }: AuthForgetDTO) {
    return this.authService.forget(email);
  }

  @Post('reset') // Recuperar senha
  async reset(@Body() { password, token }: AuthResetDTO) {
    return this.authService.reset(password, token);
  }

  @UseGuards(AuthGuard)
  @Post('me') // Checa se está logado
  async me(@User() user: UserEntity) {
    return user;
  }

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @Post('photo') // Envia apenas um arquivo
  async uploadPhoto(
    @User() user: UserEntity,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/jpeg' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 3000 }),
        ],
      }),
    )
    photo: Express.Multer.File,
  ) {
    const filename = `photo-${user.id}.jpeg`;

    try {
      await this.fileService.upload(photo, filename);
    } catch (e) {
      throw new BadRequestException(e);
    }

    return photo;
  }
}
