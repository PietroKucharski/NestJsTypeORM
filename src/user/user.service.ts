import { UpdatePatchUserDTO } from './dtos/update-patch-user.dto';
import { UpdatePutUserDTO } from './dtos/update-put-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create({name, email, password}: CreateUserDTO) {
        return this.prisma.user.create({
            data: {
                name,
                email,
                password,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });
    }

    async readAll() {
        return this.prisma.user.findMany(); 
    }

    async readOne(id: number) {
        await this.exists(id)

        return this.prisma.user.findUnique({
            where: {
                id
            }
        });
    }

    async update(id: number, {name, email, password, birthAt}: UpdatePutUserDTO) {
        await this.exists(id)

        return this.prisma.user.update({
            data: {
                name,
                email,
                password,
                birthAt: birthAt ? new Date(birthAt) : null,
            },
            where: {
                id
            }
        });
    }

    async updatePartial(id: number, {name, email, password, birthAt}: UpdatePatchUserDTO) {
        await this.exists(id)

        const data: any = {}
        
        if(birthAt) {
            data.birthAt = new Date(data.birthAt)
        }

        if(name) {
            data.name = name
        }

        if(email) {
            data.email = email
        }

        if(password) {
            data.password = password
        }

        return this.prisma.user.update({
            data,
            where: {
                id
            }
        });
    }

    async delete(id: number) {
        await this.exists(id)

        return this.prisma.user.delete({
            where: {
                id
            }
        });
    }

    async exists(id: number) {
        if(!(await this.prisma.user.count({
            where: {
                id
            }
        }))) {
            throw new NotFoundException(`O usuário ${id} não existe`);
        }
    }
}