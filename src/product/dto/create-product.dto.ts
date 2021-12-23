import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateProductDto {

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(80)
    @MinLength(5)
    @IsString()
    readonly name: string

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(10)
    @MinLength(8)
    @IsString()
    readonly barcode: string

    @ApiProperty()
    @IsString()
    readonly description: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly quantity: number

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly price: number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly category: string

    @IsOptional()
    @IsString()
    dt_create: string

    @IsOptional()
    @IsString()
    dt_update: string

}