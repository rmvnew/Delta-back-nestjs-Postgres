import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNumberString, IsOptional, IsString} from "class-validator"
import { SortingType } from "./product.enum"




export class FilterProdPaginate {


    @IsOptional()
    @IsString()
    @ApiProperty({ required: true, default: 1 })
    page: number

    @IsOptional()
    @IsString()
    @ApiProperty({ required: true, default: 10 })
    limit: number

    @IsOptional()
    @IsString()
    @ApiProperty({ required: true, default: 'DESC',enum:['ASC','DESC'] })
    sort: string

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    name: string

    @IsOptional()
    @IsNumberString()
    @ApiProperty({ required: false })
    barcode: string

    @IsOptional()
    @ApiProperty({required:true,default:'NAME',enum:['ID','NAME','DATE']})
    orderBy:string


}