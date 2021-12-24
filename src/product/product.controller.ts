import { Controller, Get, Post, Body, Param, Delete, Put, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Product } from './entities/product.entity';
import { FilterProdPaginate } from './dto/filter.products.paginate.dto';

@ApiTags('Product')
@Controller('api/v1/product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  async getAllProductPaginate(
    @Query() filter: FilterProdPaginate
  ): Promise<Pagination<Product>> {

    const { limit } = filter

    filter.limit = limit > 10 ? 10 : limit;

    return this.productService.findAll(filter)
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
