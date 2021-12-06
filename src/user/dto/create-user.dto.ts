import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateUserDto {

    @ApiProperty()
    @IsString()
    name:string

    @ApiProperty()
    @IsNumber()
    register:number

    @ApiProperty()
    @IsString()
    phone:string

    @ApiProperty()
    @IsString()
    email:string

    @ApiProperty()
    @IsString()
    password:string

    @IsOptional()
    @IsString()
    createAt:string

    @IsOptional()
    @IsString()
    updateAt:string

}
