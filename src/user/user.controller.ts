import { ParamId } from './../decorators/param-id.decorator';
import { UserService } from './user.service';
import { UpdatePatchUserDTO } from './dtos/update-patch-user.dto';
import { UpdatePutUserDTO } from './dtos/update-put-user.dto';
import { CreateUserDTO } from './dtos/create-user.dto';
import { Body, Controller, Post, Get } from '@nestjs/common';
import { Delete, Patch, Put } from '@nestjs/common/decorators';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    @Post()
    async create(@Body() data: CreateUserDTO) {
        return this.userService.create(data);
    }

    @Get()
    async read() {
        return this.userService.readAll();
    }

    @Get(':id')
    async readOne(@ParamId() id: number) {
        return this.userService.readOne(id)
    }

    @Put(':id')
    async update(@Body() data: UpdatePutUserDTO, @ParamId() id: number) {
        return this.userService.update(id, data)
    }

    @Patch(':id')
    async updatePatial(@Body() data: UpdatePatchUserDTO, @ParamId() id: number) {
        return this.userService.updatePartial(id, data)
    }

    @Delete(':id')
    async delete(@ParamId() id: number) {
        return this.userService.delete(id)
    }
}