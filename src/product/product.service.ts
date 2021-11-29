import { Product } from './entities/product.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) 
    private readonly prodRepository: Repository<Product>
  ){}

  async create(createProductDto: CreateProductDto) {

    const product = this.prodRepository.create(createProductDto)
    product.name = product.name.toUpperCase()
  

    return this.prodRepository.save(product)

  }

  async findAll() {
    return this.prodRepository.find()
  }

  async findOne(id: number) {
    return this.prodRepository.findOne({id})
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
   const product =  await this.prodRepository.preload({
     id: +id,
     ...updateProductDto
   })

   if(!product){
     throw new NotFoundException(`prodict id: ${id} not found`)
   }

   product.name = product.name.toUpperCase()

   return this.prodRepository.save(product)
  }

  async remove(id: number) {
    
    const product = await this.prodRepository.findOne(id)

    if(!product){
      throw new NotFoundException(`prodict id: ${id} not found`)
    }
 
    return this.prodRepository.remove(product)
  }
}
