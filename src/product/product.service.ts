import { Utils } from './../helper/utils';
import { FilterProductDto } from './dto/filter.product.dto';
import { Product } from './entities/product.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Like, Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { FilterProdPaginate } from './dto/filter.products.paginate.dto';



@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly prodRepository: Repository<Product>,
  ) { }

  async create(createProductDto: CreateProductDto) {

    const product = this.prodRepository.create(createProductDto);
    
    product.name  = new Utils().validName(product.name)
    
    const isRegistered = await this.findByName(product.name);

    if (isRegistered) {
      throw new BadRequestException('Produto já esta cadastrado');
    }

    return this.prodRepository.save(product);

  }


  async getAllProductsPaginate(options: FilterProdPaginate): Promise<Pagination<Product>> {
    const { name, sort, barcode } = options
    const queryBuilder = this.prodRepository.createQueryBuilder('inf')

    queryBuilder.orderBy('inf.name', `${options.sort === 'DESC' ? 'DESC' : 'ASC'}`)

    if (name) {
      return paginate<Product>(
        queryBuilder.where('inf.name like :name', { name: `%${name.toUpperCase()}%` }), options
      )
    }

    if (barcode) {
      return paginate<Product>(
        queryBuilder.where('inf.barcode like :barcode', { barcode: `%${barcode}%` }), options
      )
    }


    return paginate<Product>(queryBuilder, options)
  }

  async findAll(filter: FilterProductDto) {
    const { name, barcode } = filter;

    if (name && !barcode) {
      if (name === '' || name === undefined || name === null) {
        throw new BadRequestException('O nome não pode estar em branco');
      }

      return this.prodRepository.find({
        where: {
          name: Like(`%${name.toUpperCase()}%`),
        },
      });
    }

    if (barcode && !name) {
      if (barcode === '' || barcode === undefined || barcode === null) {
        throw new BadRequestException('O barcode não pode estar em branco');
      }

      return this.prodRepository.find({
        where: {
          barcode: Like(`%${barcode}%`),
        },
      });
    }

    return this.prodRepository.find();
  }

  async findOne(id: number) {
    return this.prodRepository.findOne({ id });
  }

  async findByName(name: string): Promise<Product> {
    return this.prodRepository.findOne({ name: name });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    const product = await this.prodRepository.preload({
      id: id,
      ...updateProductDto,
    });

    if (!product) {
      throw new NotFoundException(`product id: ${id} not found`);
    }

    product.name = product.name.toUpperCase();

    return this.prodRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.prodRepository.findOne(id);

    if (!product) {
      throw new NotFoundException(`prodict id: ${id} not found`);
    }

    return this.prodRepository.remove(product);
  }

  
}
