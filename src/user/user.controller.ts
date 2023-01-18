import { AuthGuard } from './../auth/guards/auth.guard';
import { RoleGuard } from './../auth/guards/role.guard';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { Roles } from './../decorators/role.decorator';
import { ParamId } from './../decorators/param-id.decorator';
import { UserService } from './user.service';
import { UpdatePatchUserDTO } from './dtos/update-patch-user.dto';
import { UpdatePutUserDTO } from './dtos/update-put-user.dto';
import { CreateUserDTO } from './dtos/create-user.dto';
import { Body, Controller, Post, Get } from '@nestjs/common';
import { Delete, Patch, Put } from '@nestjs/common/decorators';
import { Role } from '../enums/role.enum';
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // @Roles(Role.ADMIN)
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Roles(Role.ADMIN)
  @Get()
  async read() {
    return this.userService.readAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  async readOne(@ParamId() id: number) {
    return this.userService.readOne(id);
  }

  // @Roles(Role.ADMIN)
  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @ParamId() id: number) {
    return this.userService.update(id, data);
  }

  // @Roles(Role.ADMIN)
  @Patch(':id')
  async updatePatial(@Body() data: UpdatePatchUserDTO, @ParamId() id: number) {
    return this.userService.updatePartial(id, data);
  }

  // @Roles(Role.ADMIN)
  @Delete(':id')
  async delete(@ParamId() id: number) {
    return {
      success: await this.userService.delete(id),
    };
  }
}
