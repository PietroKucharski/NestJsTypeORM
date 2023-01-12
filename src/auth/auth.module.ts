import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [JwtModule.register({
        secret: 'K!)5OR9Z~Lc0-wVZR#<+A]{ON:i,r,5v,'
    }),
   UserModule,
   PrismaModule
]
})

export class AuthModule {}