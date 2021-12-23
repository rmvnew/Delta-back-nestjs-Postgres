import { Controller, Get, Post, Body, Param, Delete, Put, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { FilterProductDto } from './dto/filter.product.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Product } from './entities/product.entity';
import { FilterProdPaginate } from './dto/filter.products.paginate.dto';

@ApiTags('Product')
@Controller('api/v1/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('/page')
  async getAllProductPaginate(
    @Query() filter: FilterProdPaginate
  ):Promise<Pagination<Product>>{

    const {limit} = filter

    filter.limit = limit > 10 ? 10 : limit;

    return this.productService.getAllProductsPaginate(filter)
  }

  @Get()
  findAll(
   @Query() filter: FilterProductDto
  ) {

    const prod = new FilterProductDto()
    prod.name = filter.name
    prod.barcode = filter.barcode


    return this.productService.findAll(prod);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
