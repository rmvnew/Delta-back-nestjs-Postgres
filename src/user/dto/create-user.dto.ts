import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
export class CreateUserDto {

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(80)
  @MinLength(5)
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(12)
  @MinLength(7)
  @IsString()
  register: string

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsString()
  createAt: string;

  @IsOptional()
  @IsString()
  updateAt: string;
}
