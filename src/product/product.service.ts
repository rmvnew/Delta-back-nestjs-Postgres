import { Utils } from './../helper/utils';
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
} from 'nestjs-typeorm-paginate';
import { FilterProdPaginate } from './dto/filter.products.paginate.dto';
import { SortingType } from './dto/product.enum';



@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly prodRepository: Repository<Product>,
  ) { }

  async create(createProductDto: CreateProductDto) {

    const product = this.prodRepository.create(createProductDto);

    product.name = Utils.getInstance().validName(product.name)

    const isRegistered = await this.findByName(product.name);

    if (isRegistered) {
      throw new BadRequestException('Produto já esta cadastrado');
    }

    return this.prodRepository.save(product);

  }


  async findAll(options: FilterProdPaginate): Promise<Pagination<Product>> {
    const { name, orderBy, barcode,sort } = options
    const queryBuilder = this.prodRepository.createQueryBuilder('inf')

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

    

    if (orderBy == SortingType.ID) {
      console.log('entrou no id')
      queryBuilder.orderBy('inf.id', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)
    } else if (orderBy == SortingType.DATE) {
      console.log('entrou na data')
      queryBuilder.orderBy('inf.dt_create', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)
    } else {
      console.log('entrou no nome')
      queryBuilder.orderBy('inf.name', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)
    }

    return paginate<Product>(queryBuilder, options)
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
