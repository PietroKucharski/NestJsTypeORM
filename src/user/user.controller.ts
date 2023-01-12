import { UpdatePatchUserDTO } from './dtos/update-patch-user.dto';
import { UpdatePutUserDTO } from './dtos/update-put-user.dto';
import { CreateUserDTO } from './dtos/create-user.dto';
import { Body, Controller, Post, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Delete, Patch, Put } from '@nestjs/common/decorators';

@Controller('users')
export class UserController {

    @Post()
    async create(@Body() body:CreateUserDTO) {
        return {body};
    }

    @Get()
    async read() {
        return {users: []}
    }

    @Get(':id')
    async readOne(@Param('id', ParseIntPipe) id: number) {
        return {user: {}, id}
    }

    @Put(':id')
    async update(@Body() {email, name, password}: UpdatePutUserDTO, @Param('id', ParseIntPipe) id: number) {
        return {
            method: 'Put',
            email, name, password,
            id
        }
    }

    @Patch(':id')
    async updatePatial(@Body() {email, name, password}: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number) {
        return {
            method: 'Patch',
            email, name, password,
            id
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return {
            id
        }
    }
}