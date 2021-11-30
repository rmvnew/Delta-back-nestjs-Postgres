import { isDecimal, IsNumber, IsString } from "class-validator";

export class CreateProductDto {

    @IsString()
    readonly name: string

    @IsString()
    readonly barcode: string

    @IsString()
    readonly description: string

    @IsNumber()
    readonly quantity: number

    @IsNumber()
    readonly price: number

    @IsString()
    readonly category: string

}