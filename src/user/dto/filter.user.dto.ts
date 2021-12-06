import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class FilterUserDto{

    @IsOptional()
    @IsString()
    @ApiProperty({required:false})
    name:string
}