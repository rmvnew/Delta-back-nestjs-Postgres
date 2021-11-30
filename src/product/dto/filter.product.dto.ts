import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";



export class FilterProductDto{
    
    @IsOptional()
    @IsString()
    @ApiProperty({required:false})
    name?:string

    @IsOptional()
    @IsString()
    @ApiProperty({required:false})
    barcode?:string
}