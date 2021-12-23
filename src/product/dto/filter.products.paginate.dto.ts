import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumberString, IsOptional, IsString, MaxLength, MinLength } from "class-validator"




export class FilterProdPaginate {


    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, default: 1 })
    page: number

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, default: 10 })
    limit: number

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, default: 'DESC' })
    sort: string

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    name: string

    @IsOptional()
    @IsNumberString()
    @ApiProperty({ required: false })
    barcode: string


}