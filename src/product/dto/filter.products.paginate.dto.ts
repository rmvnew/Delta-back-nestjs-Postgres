import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"




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


}