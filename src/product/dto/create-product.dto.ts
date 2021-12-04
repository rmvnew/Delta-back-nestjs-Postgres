import { ApiProperty } from "@nestjs/swagger";
import { IsDate, isDecimal, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {

    @ApiProperty()
    @IsString()
    readonly name: string

    @ApiProperty()
    @IsString()
    readonly barcode: string

    @ApiProperty()
    @IsString()
    readonly description: string

    @ApiProperty()
    @IsNumber()
    readonly quantity: number

    @ApiProperty()
    @IsNumber()
    readonly price: number

    @ApiProperty()
    @IsString()
    readonly category: string

    @IsOptional()
    @IsString()
    dt_create: string
    
    @IsOptional()
    @IsString()
    dt_update: string

}